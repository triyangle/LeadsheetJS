define(['vexflow_helper',
	'vexflow',
	'modules/LSViewer/src/LSViewer',
	'modules/core/src/SongModel',
	'modules/converters/MusicCSLJson/src/SongModel_CSLJson',
	'tests/songs/allRhythmicFigures'
], function(VexFlowTest, Vex, LSViewer, SongModel, SongModel_CSLJson, allRhythmicFigures) {
	return {
		run: function() {

			VexFlowTest.runTest("ViewerDraw", function(options, contextBuilder) {
				var ctx = new contextBuilder(options.canvas_sel, 1100, 1150);
				var song = SongModel_CSLJson.importFromMusicCSLJSON(allRhythmicFigures, new SongModel());

				var viewer = new LSViewer(ctx);
				viewer.draw(song);
				ok(true, "all pass");

			});

		}
	};
});