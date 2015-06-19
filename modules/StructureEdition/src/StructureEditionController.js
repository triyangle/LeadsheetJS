define([
	'jquery',
	'mustache',
	'modules/Cursor/src/CursorModel',
	'modules/core/src/SongModel',
	'modules/core/src/SectionModel',
	'modules/core/src/NoteManager',
	'modules/core/src/NoteModel',
	'utils/UserLog',
	'pubsub',
], function($, Mustache, CursorModel, SongModel, SectionModel, NoteManager, NoteModel, UserLog, pubsub) {

	function StructureEditionController(songModel, cursor, view, structEditionModel) {
		this.songModel = songModel || new SongModel();
		this.cursor = cursor || new CursorModel();
		this.initSubscribe();
		this.structEditionModel = structEditionModel;
	}

	/**
	 * Subscribe to view events
	 */
	StructureEditionController.prototype.initSubscribe = function() {
		var self = this;
		var fn;
		// All functions related with note edition go here
		$.subscribe('StructureEditionView', function(el, fn, param) {
			//if (self.noteSpaceMng.isEnabled()) {
			self[fn].call(self, param);
			$.publish('ToViewer-draw', self.songModel);
			//}
		});

	};


	StructureEditionController.prototype.addSection = function() {
		/*var selBars = this._getSelectedBars();
		if (selBars.length !== 0) {
			return;
		}*/

		// TODO add section after current section position
		var numberOfBarsToCreate = 2;
		var barManager = this.songModel.getComponent('bars');

		// clone last bar
		var indexLastBar = barManager.getTotal() - 1;
		var newBar = barManager.getBar(indexLastBar).clone();

		// now we add bar to this section and fill them with silence
		var noteManager = this.songModel.getComponent('notes');
		var indexLastNote = noteManager.getTotal() - 1;
		var initBeat = noteManager.getNoteBeat(indexLastNote);
		var beatDuration = this.songModel.getTimeSignatureAt(indexLastBar).getQuarterBeats();

		for (var i = 0; i < numberOfBarsToCreate; i++) {
			barManager.addBar(newBar);
			noteManager.fillGapWithRests(beatDuration, initBeat);
			initBeat += beatDuration;
		}
		var section = new SectionModel({
			'numberOfBars': numberOfBarsToCreate
		});
		this.songModel.addSection(section);
		UserLog.logAutoFade('info', "Section have been added successfully");
		$.publish('ToViewer-draw', this.songModel);
		$.publish('ToHistory-add', 'Add Section');
	};

	StructureEditionController.prototype.removeSection = function() {
		if (this.songModel.getSections().length === 1) {
			UserLog.logAutoFade('error', "You can't delete last section");
			return;
		}
		var selBars = this._getSelectedBars();
		if (selBars.length === 0) {
			return;
		}
		var sectionNumber = this.songModel.getSectionNumberFromBarNumber(selBars[0]);

		var startBar = this.songModel.getStartBarNumberFromSectionNumber(sectionNumber);
		var numberOfBars = this.songModel.getSection(sectionNumber).getNumberOfBars();

		//var barManager = this.songModel.getComponent('bars');
		var noteManager = this.songModel.getComponent('notes');
		//var notes;
		// console.log(sectionNumber, startBar, numberOfBars);
		for (var i = 0; i < numberOfBars; i++) {
			//notes = noteManager.getNotesAtBarNumber(startBar, this.songModel);
			//for (var j = notes.length - 1; j >= 0; j--) {
			//	noteManager.deleteNote(noteManager.getNoteIndex(notes[j]));
			//}
			this._removeBar(startBar);
			//barManager.removeBar(startBar); // each time we remove index move so we don't need to sum startBar with i

		}
		// check if cursor not outside
		var indexLastNote = noteManager.getTotal() - 1;
		if (this.cursor.getEnd() > indexLastNote) {
			this.cursor.setPos(indexLastNote);
		}
		// Remove section in songmodel is not needed because it's done when we remove last sections bar
		//this.songModel.removeSection(sectionNumber);
		UserLog.logAutoFade('info', "Section have been removed successfully");
		$.publish('ToViewer-draw', this.songModel);
		$.publish('ToHistory-add', 'Remove Section');
	};

	StructureEditionController.prototype.setSectionName = function(name) {
		if (typeof name === "undefined") {
			return;
		}
		var selBars = this._getSelectedBars();
		if (selBars.length === 0) {
			return;
		}
		var sectionNumber = this.songModel.getSectionNumberFromBarNumber(selBars[0]);
		this.songModel.getSection(sectionNumber).setName(name);
		$.publish('ToViewer-draw', this.songModel);
		$.publish('ToHistory-add', 'Rename Section ' + name);
	};

	// Carefull, if a section is played 2 times, repeatTimes = 1
	StructureEditionController.prototype.setRepeatTimes = function(repeatTimes) {
		if (typeof repeatTimes === "undefined") {
			return;
		}
		var selBars = this._getSelectedBars();
		if (selBars.length === 0) {
			return;
		}
		var sectionNumber = this.songModel.getSectionNumberFromBarNumber(selBars[0]);
		this.songModel.getSection(sectionNumber).setRepeatTimes(repeatTimes);
		$.publish('ToViewer-draw', this.songModel);
		$.publish('ToHistory-add', 'Change Section repeat' + repeatTimes);
	};

	StructureEditionController.prototype.addBar = function() {
		var selBars = this._getSelectedBars();
		var numBar = 0;
		if (selBars.length !== 0) {
			numBar = selBars[0];
		}

		var nm = this.songModel.getComponent('notes');
		//get the duration of the bar, and create a new bar with silences
		var beatDuration = this.songModel.getTimeSignatureAt(numBar).getQuarterBeats();
		var newBarNm = new NoteManager(); //Create new Bar NoteManager
		//if is first bar we add a note, otherwise there are inconsistencies with duration of a bar
		var startBeat = 0;
		if (numBar === 0) {
			newBarNm.addNote(new NoteModel("E/4-q"));
			beatDuration = beatDuration - 1;
			startBeat = 1;
		}
		//insert those silences
		newBarNm.fillGapWithRests(beatDuration, startBeat);

		//get numBeat from first note of current bar
		var numBeat = this.songModel.getStartBeatFromBarNumber(numBar);
		// get the index of that note
		var index = nm.getNextIndexNoteByBeat(numBeat);

		// remove a possibly tied notes
		if (nm.getNote(index).isTie('stop')) {
			var tieType = nm.getNote(index).getTie();
			if (tieType === "stop") {
				nm.getNote(index).removeTie();
				var tieTypePrevious = nm.getNote(index - 1).getTie();
				if (tieTypePrevious === 'start') {
					nm.getNote(index - 1).removeTie();
				} else if (tieTypePrevious === 'start_stop') {
					nm.getNote(index - 1).setTie("stop");
				}
			} else {
				// case it's start or stop_start
				nm.getNote(index).setTie("start");
			}
		}

		nm.notesSplice([index, index - 1], newBarNm.getNotes());

		//add bar to barManager
		var barManager = this.songModel.getComponent('bars');
		var newBar = barManager.getBar(numBar).clone();
		barManager.addBar(newBar);

		//increment the number of bars of current section
		var section = this.songModel.getSection(this.songModel.getSectionNumberFromBarNumber(numBar));
		section.setNumberOfBars(section.getNumberOfBars() + 1);

		// decal chords
		this.songModel.getComponent('chords').incrementChordsBarNumberFromBarNumber(1, numBar);


		$.publish('ToViewer-draw', this.songModel);
		$.publish('ToHistory-add', 'Add Bar');
	};

	/**
	 * Function deletes selected bars
	 */
	StructureEditionController.prototype.removeBar = function() {
		var selBars = this._getSelectedBars();
		if (selBars.length === 0) {
			return;
		}
		for (var i = selBars.length - 1; i >= 0; i--) {
			this._removeBar(selBars[i]);
		}
		$.publish('ToViewer-draw', this.songModel);
		$.publish('ToHistory-add', 'Remove Bar');
	};

	/**
	 * Function deletes bar and all it's components with index, it also delete section if it was the last bar of the section
	 */
	StructureEditionController.prototype._removeBar = function(barNumber) {
		var bm = this.songModel.getComponent('bars');
		var nm = this.songModel.getComponent('notes');
		var cm = this.songModel.getComponent('chords');


		var sectionNumber = this.songModel.getSectionNumberFromBarNumber(barNumber);
		var section = this.songModel.getSection(sectionNumber);
		var sectionNumberOfBars = section.getNumberOfBars();
		if (sectionNumberOfBars === 1 && this.songModel.getSections().length === 1) {
			UserLog.logAutoFade('warn', "Can't delete the last bar of the last section.");
			return;
		}

		// adjust section number of bars
		section.setNumberOfBars(sectionNumberOfBars - 1);

		// remove notes in bar
		var beatDuration = this.songModel.getTimeSignatureAt(barNumber).getQuarterBeats() - 1; // I am not sure why we remove 1 here
		var numBeat = this.songModel.getStartBeatFromBarNumber(barNumber);
		var index = nm.getNextIndexNoteByBeat(numBeat);
		var index2 = nm.getNextIndexNoteByBeat(numBeat + beatDuration);
		nm.notesSplice([index, index2], []);

		// remove chords in bar
		cm.removeChordsByBarNumber(barNumber);

		// adjust all chords bar number
		cm.incrementChordsBarNumberFromBarNumber(-1, barNumber);

		bm.removeBar(barNumber);

		// We remove the section in songModel if it was the last bar of the section
		if (sectionNumberOfBars === 1) {
			this.songModel.removeSection(sectionNumber);
		}
		this.cursor.setPos(index - 1);
	};


	StructureEditionController.prototype.setTimeSignature = function(timeSignature) {
		var selBars = this._getSelectedBars();
		if (selBars.length === 0) {
			return;
		}
		var durationBefore = this.songModel.getSongTotalBeats();
		for (var i = 0, c = selBars.length; i < c; i++) {
			if (timeSignature === "none") {
				timeSignature = undefined;
			}
			this.songModel.getComponent("bars").getBar(selBars[i]).setTimeSignature(timeSignature);
		}
		var durationAfter = this.songModel.getSongTotalBeats();
		this._checkDuration(durationBefore, durationAfter);
		$.publish('ToViewer-draw', this.songModel);
		$.publish('ToHistory-add', 'Time signature set to ' + timeSignature);
	};

	StructureEditionController.prototype._checkDuration = function(durBefore, durAfter) {
		function checkIfBreaksTuplet(initBeat, endBeat, nm) {
			/**
			 * means that is a 0.33333 or something like that
			 * @return {Boolean}
			 */
			function isTupletBeat(beat) {
				beat = beat * 16;
				return Math.round(beat) != beat;
			}
			var iPrevNote = nm.getNextIndexNoteByBeat(initBeat);
			var iNextNote = nm.getNextIndexNoteByBeat(endBeat);
			return isTupletBeat(nm.getNoteBeat(iPrevNote)) || isTupletBeat(nm.getNoteBeat(iNextNote));
		}
		var nm = this.songModel.getComponent('notes');
		var initBeat = 1;
		var endBeat = durAfter + 1;

		if (durBefore < durAfter) {
			nm.fillGapWithRests(durAfter - durBefore, initBeat);
		} else if (durBefore > durAfter) {
			if (checkIfBreaksTuplet(initBeat, durAfter, nm)) {
				UserLog.logAutoFade('error', "Can't break tuplet");
				return;
			}
			var endIndex = nm.getNextIndexNoteByBeat(endBeat);
			var beatEndNote = nm.getNoteBeat(endIndex);

			if (endBeat < beatEndNote) {
				nm.fillGapWithRests(beatEndNote - endBeat, initBeat);
			}
		}
		//nm.notesSplice(this.cursor.getPos(), tmpNm.getNotes());
		nm.reviseNotes();
	};

	StructureEditionController.prototype.tonality = function(tonality) {
		var selBars = this._getSelectedBars();
		if (selBars.length === 0) {
			return;
		}
		for (var i = 0, c = selBars.length; i < c; i++) {
			this.songModel.getComponent("bars").getBar(selBars[i]).setTonality(tonality);
		}
		$.publish('ToViewer-draw', this.songModel);
		$.publish('ToHistory-add', 'Tonality set to ' + tonality);
	};

	StructureEditionController.prototype.ending = function(ending) {
		var selBars = this._getSelectedBars();
		if (selBars.length === 0) {
			return;
		}
		for (var i = 0, c = selBars.length; i < c; i++) {
			if (ending === "none") {
				ending = undefined;
			}
			this.songModel.getComponent("bars").getBar(selBars[i]).setEnding(ending);
		}
		$.publish('ToViewer-draw', this.songModel);
		$.publish('ToHistory-add', 'Ending set to ' + ending);
	};

	StructureEditionController.prototype.style = function(style) {
		var selBars = this._getSelectedBars();
		if (selBars.length === 0) {
			return;
		}
		for (var i = 0, c = selBars.length; i < c; i++) {
			if (style === "none") {
				style = undefined;
			}
			this.songModel.getComponent("bars").getBar(selBars[i]).setStyle(style);
		}
		$.publish('ToViewer-draw', this.songModel);
		$.publish('ToHistory-add', 'Style set to ' + style);
	};

	StructureEditionController.prototype.label = function(label) {
		var selBars = this._getSelectedBars();
		if (selBars.length === 0) {
			return;
		}
		for (var i = 0, c = selBars.length; i < c; i++) {
			if (label === "none") {
				label = '';
			}
			this.songModel.getComponent("bars").getBar(selBars[i]).setLabel(label);
		}
		$.publish('ToViewer-draw', this.songModel);
		$.publish('ToHistory-add', 'Label set to ' + label);
	};

	StructureEditionController.prototype.subLabel = function(sublabel) {
		var selBars = this._getSelectedBars();
		if (selBars.length === 0) {
			return;
		}
		for (var i = 0, c = selBars.length; i < c; i++) {
			if (sublabel === "none") {
				sublabel = undefined;
			}
			this.songModel.getComponent("bars").getBar(selBars[i]).setSublabel(sublabel);
		}
		$.publish('ToViewer-draw', this.songModel);
		$.publish('ToHistory-add', 'Sublabel set to ' + sublabel);
	};

	StructureEditionController.prototype._getSelectedBars = function() {
		var selectedBars = [];
		selectedBars[0] = this.songModel.getComponent('notes').getNoteBarNumber(this.cursor.getStart(), this.songModel);
		selectedBars[1] = this.songModel.getComponent('notes').getNoteBarNumber(this.cursor.getEnd(), this.songModel);
		return selectedBars;
	};

	StructureEditionController.prototype.unfold = function(force) {
		var unfold = true;
		if (typeof force === "undefined" || force === false) {
			unfold = !this.structEditionModel.unfolded;
		}
		if (unfold) {
			this.oldSong = this.songModel;
			var newSongModel = this.songModel.unfold();
			this.songModel = newSongModel;
			$.publish('ToViewer-draw', this.songModel);
		} else {
			$.publish('ToViewer-draw', this.oldSong);
		}
		this.structEditionModel.toggleUnfolded();

	};

	return StructureEditionController;
});