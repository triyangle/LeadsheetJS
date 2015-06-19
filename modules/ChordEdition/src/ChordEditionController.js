define([
	'mustache',
	'modules/core/src/SongModel',
	'modules/Cursor/src/CursorModel',
	'utils/UserLog',
	'jquery',
	'pubsub',
], function(Mustache, CursorModel, SongModel, UserLog, $, pubsub) {

	function ChordEditionController(songModel, cursor, chordSpaceMng) {
		if (!songModel || !cursor || !chordSpaceMng) {
			throw "ChordEditionController params are wrong";
		}
		this.songModel = songModel;
		this.cursor = cursor;
		this.chordSpaceMng = chordSpaceMng;
		this.initSubscribe();
	}

	/**
	 * Subscribe to view events
	 */
	ChordEditionController.prototype.initSubscribe = function() {
		var self = this;

		$.subscribe('ChordEditionView', function(el, fn, param) {
			if (self.chordSpaceMng.isEnabled()) {
				self[fn].call(self, param);
				$.publish('ToViewer-draw', self.songModel);
			}
		});
	};

	ChordEditionController.prototype.deleteChords = function() {
		// console.log('deleteChords');
		/**
		 * @param  {positon} argument
		 * @return {Object}          position as {numBar: valBar, numBeat: valBeat}
		 */

		var chordMng = this.songModel.getComponent('chords');
		var self = this;

		function removeChordIfExists(cursorIndex) {
			var chordSpace = self.chordSpaceMng.chordSpace[cursorIndex];
			var pos = {
				numBeat: chordSpace.beatNumber,
				numBar: chordSpace.barNumber
			};
			var r = chordMng.getChordIndexByPosition(pos);
			if (r.exact) {
				chordMng.removeChordByIndex(r.index);
			}
		}
		for (var i = this.cursor.getStart(); i <= this.cursor.getEnd(); i++) {
			removeChordIfExists(i);
		}
		$.publish('ToHistory-add', 'Remove chord');
	};

	/*ChordEditionController.prototype.addChord = function() {
		console.log('addChord');
		// editor.addChord();
	};*/
	ChordEditionController.prototype.toggleEditChord = function() {
		console.log('toggleEditChord');
	};

	ChordEditionController.prototype.copyChords = function() {
		var indexes = this.getSelectedChordsIndexes();
		var chordManager = this.songModel.getComponent('chords');
		this.buffer = chordManager.cloneElems(indexes[0], indexes[indexes.length - 1] + 1);
	};

	ChordEditionController.prototype.pasteChords = function() {
		if (typeof this.buffer === "undefined" || this.buffer.length === 0) {
			return;
		}
		var chordManager = this.songModel.getComponent('chords');

		var firstChordSpace = this.chordSpaceMng.chordSpace[this.cursor.getStart()];
		var decalBarNumber = firstChordSpace.barNumber - this.buffer[0].getBarNumber();
		var decalBeat = firstChordSpace.beatNumber - this.buffer[0].getBeat();

		var lastChord = this.buffer[this.buffer.length - 1];

		chordManager.removeChordsBetweenPositions(firstChordSpace.barNumber, firstChordSpace.beatNumber, lastChord.getBarNumber() + decalBarNumber, lastChord.getBeat() + decalBeat);
		for (var i = 0, c = this.buffer.length; i < c; i++) {
			this.buffer[i].setBarNumber(this.buffer[i].getBarNumber() + decalBarNumber);
			this.buffer[i].setBeat(this.buffer[i].getBeat() + decalBeat);
			chordManager.addChord(this.buffer[i]);
		}
		$.publish('ToHistory-add', 'Paste chord');
	};

	/*ChordEditionController.prototype.chordTabEvent = function(way) {
		console.log('chordTabEvent', way);
	};*/

	ChordEditionController.prototype.getSelectedChordsIndexes = function() {
		var chordManager = this.songModel.getComponent('chords');
		var selectedChords = [];
		for (var cursorIndex = this.cursor.getStart(); cursorIndex <= this.cursor.getEnd(); cursorIndex++) {
			var chordSpace = this.chordSpaceMng.chordSpace[cursorIndex];
			var pos = {
				numBeat: chordSpace.beatNumber,
				numBar: chordSpace.barNumber
			};
			var r = chordManager.getChordIndexByPosition(pos);
			if (r.exact) {
				selectedChords.push(r.index);
			}
		}
		return selectedChords;
	};

	return ChordEditionController;
});