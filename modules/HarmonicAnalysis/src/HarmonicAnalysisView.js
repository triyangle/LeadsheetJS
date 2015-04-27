define([
	'mustache',
	'modules/core/src/SongModel',
	'utils/UserLog',
	'pubsub',
	'text!modules/HarmonicAnalysis/src/HarmonicAnalysisTemplate.html'
], function(Mustache, SongModel, UserLog, pubsub, HarmonicAnalysisTemplate) {

	function HarmonicAnalysisView(parentHTML) {
		this.el = undefined;
		var self = this;
		/*this.initView(parentHTML, function() {
			self.initController();
			$.publish('HarmonicAnalysisView-render', self);
		});*/
	}

	HarmonicAnalysisView.prototype.render = function(parentHTML, force, callback) {
		force = force || false;
		// case el has never been rendered
		var self = this;
		if (typeof this.el === "undefined" || (typeof this.el !== "undefined" && force === true)) {
			this.initView(parentHTML, function() {
				self.initController();
				$.publish('HarmonicAnalysisView-render');
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

	HarmonicAnalysisView.prototype.initView = function(parentHTML, callback) {
		var self = this;
		//$.get('/modules/HarmonicAnalysis/src/HarmonicAnalysisTemplate.html', function(template) {
			var rendered = Mustache.render(HarmonicAnalysisTemplate);
			if (typeof parentHTML !== "undefined") {
				parentHTML.innerHTML = rendered;
			}
			self.el = rendered;
			if (typeof callback === "function") {
				callback();
			}
		//});
	};

	HarmonicAnalysisView.prototype.initController = function() {
		var self = this;
		$('#harmonic_analysis').click(function() {
			$.publish('HarmonicAnalysisView-compute');
			$('#remove_harmonic_analysis').show();
			return false;
		});
		$('#remove_harmonic_analysis').click(function() {
			$.publish('HarmonicAnalysisView-remove');
			$('#remove_harmonic_analysis').hide();
			return false;
		});
	};

	return HarmonicAnalysisView;
});