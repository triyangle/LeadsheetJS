define([
	'mustache',
	'modules/core/src/SongModel',
	'utils/UserLog',
	'pubsub'
], function(Mustache, SongModel, UserLog, pubsub) {

	function HarmonizerView(parentHTML) {
		this.el = undefined;
		var self = this;
		/*this.initView(parentHTML, function() {
			self.initController();
			$.publish('HarmonizerView-render', self);
		});*/
	}

	HarmonizerView.prototype.render = function(parentHTML, force, callback) {
		force = force || false;
		// case el has never been rendered
		var self = this;
		if (typeof this.el === "undefined" || (typeof this.el !== "undefined" && force === true)) {
			this.initView(parentHTML, function() {
				self.initController();
				$.publish('HarmonizerView-render');
				if (typeof callback === "function") {
					callback();
				}
				return;
			});
		} else {
			if (typeof callback === "function") {
				callback();
			}
			return;
		}
	};

	HarmonizerView.prototype.initView = function(parentHTML, callback) {
		var self = this;
		$.get('/modules/Harmonizer/src/HarmonizerTemplate.html', function(template) {
			var rendered = Mustache.render(template);
			if (typeof parentHTML !== "undefined") {
				parentHTML.innerHTML = rendered;
			}
			self.el = rendered;
			if (typeof callback === "function") {
				callback();
			}
		});
	};

	HarmonizerView.prototype.initController = function() {
		var self = this;
		$('#harmonize').click(function() {
			var idSong = $(this).attr('data');
			var style = $('#harmonization_style_select').val();
			$.publish('HarmonizerView-compute', idSong, style);
			return false;
		});
	};

	HarmonizerView.prototype.updateHarmonizeView = function(leadsheet) {
		if (typeof leadsheet !== "undefined") {
			var songModel = new SongModel(leadsheet);
			// TODO editor is not defined here
			editor.songModel = songModel;
			editor.viewer.draw(editor);
			playerModel.initFromSongModel(songModel);
			$.publish('SongModel-reinit');
		}
	};

	return HarmonizerView;
});