define(function(){
	return {
		composer:"Random Composer",
		title: "All notes",
		time: "4/4",
		changes:[
			{
				id:0,
				name:"A",
				bars:
				[
					{
						chords:[{p:"A",ch:"M7",beat:1}],
						melody:
						[
								{ keys: ["g/4"], duration: "q"},
								{ keys: ["f/4"], duration: "q"},
								{ keys: ["e/4"], duration: "q"},
								{ keys: ["d/4"], duration: "q"}
						]
					},
					{
						melody:
						[
								{ keys: ["g/4"], duration: "w"}
								
						]
					},
					{
						melody:
						[
								{ keys: ["g/4"], duration: "q"},
								{ keys: ["f/4"], duration: "q"},
								{ keys: ["e/4"], duration: "q"},
								{ keys: ["d/4"], duration: "q"}
						]
					},
					{
						chords:[{p:"A",ch:"M7",beat:1}],
						melody:
						[
								{ keys: ["g/4"], duration: "64" },
								{ keys: ["a/4"], duration: "32", dot:1 ,tie:'start'},
								{ keys: ["b/4"], duration: "32", tie: 'stop'},
								{ keys: ["c/4"], duration: "16", dot:1, tie:'start' },
								{ keys: ["d/4"], duration: "16", tie:'stop_start'},
								{ keys: ["e/4"], duration: "8", dot:1,tie:'stop' },
								{ keys: ["f/4"], duration: "16" },
								{ keys: ["g/4"], duration: "q", dot:1 },
								{ keys: ["a/4"], duration: "8"}
						]
					},
					{
						melody:
						[
								{ keys: ["g/4"], duration: "w"}
								
						]
					},
					{
						melody:
						[
								//bar2
								{ keys: ["g/4"], duration: "16" },{ keys: ["a/4"], duration: "16" },{ keys: ["b/4"], duration: "16",  },{ keys: ["b/4"], duration: "16" },
								{ keys: ["g/4"], duration: "16" },{ keys: ["a/4"], duration: "16" },{ keys: ["b/4"], duration: "16",  },{ keys: ["b/4"], duration: "16" },
								{ keys: ["g/4"], duration: "16" },{ keys: ["a/4"], duration: "16" },{ keys: ["b/4"], duration: "16",  },{ keys: ["b/4"], duration: "16" },
								{ keys: ["g/4"], duration: "16" },{ keys: ["a/4"], duration: "16" },{ keys: ["b/4"], duration: "16",  },{ keys: ["b/4"], duration: "16" }
								
						]
					},
					{
						melody:
						[
								//bar2
								{ keys: ["g/4"], duration: "h" },
								{ keys: ["g/4"], duration: "h" },
								
								
						]
					},
					{
						melody:
						[
								//bar2
								{ keys: ["g/4"], duration: "q" },
								{ keys: ["g/4"], duration: "q" },
								{ keys: ["g/4"], duration: "q" },
								{ keys: ["g/4"], duration: "q", tie: 'start'},
						]
					}
					,
					{
						melody:
						[
								//bar3
								{ keys: ["g/4"], duration: "32", tie:'stop' },{ keys: ["a/4"], duration: "32" },{ keys: ["b/4"], duration: "32",  },{ keys: ["b/4"], duration: "32" },
								{ keys: ["g/4"], duration: "32" },{ keys: ["a/4"], duration: "32" },{ keys: ["b/4"], duration: "32",  },{ keys: ["b/4"], duration: "32" },
								{ keys: ["g/4"], duration: "32" },{ keys: ["a/4"], duration: "32" },{ keys: ["b/4"], duration: "32",  },{ keys: ["b/4"], duration: "32" },
								{ keys: ["g/4"], duration: "32" },{ keys: ["a/4"], duration: "32" },{ keys: ["b/4"], duration: "32",  },{ keys: ["b/4"], duration: "32" },
								{ keys: ["g/4"], duration: "32" },{ keys: ["a/4"], duration: "32" },{ keys: ["b/4"], duration: "32",  },{ keys: ["b/4"], duration: "32" },
								{ keys: ["g/4"], duration: "32" },{ keys: ["a/4"], duration: "32" },{ keys: ["b/4"], duration: "32",  },{ keys: ["b/4"], duration: "32" },
								{ keys: ["g/4"], duration: "32" },{ keys: ["a/4"], duration: "32" },{ keys: ["b/4"], duration: "32",  },{ keys: ["b/4"], duration: "32" },
								{ keys: ["g/4"], duration: "32" },{ keys: ["a/4"], duration: "32" },{ keys: ["b/4"], duration: "32",  },{ keys: ["b/4"], duration: "32" }
							
						]

					},
					{
						melody:
						[
							//bar5
								{ keys: ["a/4"], duration: "8", tuplet:'start', time_modification:'3/2' },
								{ keys: ["b/4"], duration: "8" , time_modification:'3/2'},
								{ keys: ["b/4"], duration: "8", tuplet:'stop', time_modification:'3/2' },
								{ keys: ["a/4"], duration: "8", tuplet:'start', time_modification:'3/2' },
								{ keys: ["b/4"], duration: "8" , time_modification:'3/2'},
								{ keys: ["b/4"], duration: "8", tuplet:'stop', time_modification:'3/2' },
								{ keys: ["a/4"], duration: "8", tuplet:'start', time_modification:'3/2' },
								{ keys: ["b/4"], duration: "8" , time_modification:'3/2'},
								{ keys: ["b/4"], duration: "8", tuplet:'stop', time_modification:'3/2' },
								{ keys: ["a/4"], duration: "8", tuplet:'start', time_modification:'3/2' },
								{ keys: ["b/4"], duration: "8" , time_modification:'3/2'},
								{ keys: ["b/4"], duration: "8", tuplet:'stop', time_modification:'3/2' }

						]
					},
					{
						melody:
						[
						//bar4
								{ keys: ["g/4"], duration: "64" },{ keys: ["a/4"], duration: "64" },{ keys: ["b/4"], duration: "64",  },{ keys: ["b/4"], duration: "64" },
								{ keys: ["g/4"], duration: "64" },{ keys: ["a/4"], duration: "64" },{ keys: ["b/4"], duration: "64",  },{ keys: ["b/4"], duration: "64" },
								{ keys: ["g/4"], duration: "64" },{ keys: ["a/4"], duration: "64" },{ keys: ["b/4"], duration: "64",  },{ keys: ["b/4"], duration: "64" },
								{ keys: ["g/4"], duration: "64" },{ keys: ["a/4"], duration: "64" },{ keys: ["b/4"], duration: "64",  },{ keys: ["b/4"], duration: "64" },
								{ keys: ["g/4"], duration: "64" },{ keys: ["a/4"], duration: "64" },{ keys: ["b/4"], duration: "64",  },{ keys: ["b/4"], duration: "64" },
								{ keys: ["g/4"], duration: "64" },{ keys: ["a/4"], duration: "64" },{ keys: ["b/4"], duration: "64",  },{ keys: ["b/4"], duration: "64" },
								{ keys: ["g/4"], duration: "64" },{ keys: ["a/4"], duration: "64" },{ keys: ["b/4"], duration: "64",  },{ keys: ["b/4"], duration: "64" },
								{ keys: ["g/4"], duration: "64" },{ keys: ["a/4"], duration: "64" },{ keys: ["b/4"], duration: "64",  },{ keys: ["b/4"], duration: "64" },
								{ keys: ["g/4"], duration: "64" },{ keys: ["a/4"], duration: "64" },{ keys: ["b/4"], duration: "64",  },{ keys: ["b/4"], duration: "64" },
								{ keys: ["g/4"], duration: "64" },{ keys: ["a/4"], duration: "64" },{ keys: ["b/4"], duration: "64",  },{ keys: ["b/4"], duration: "64" },
								{ keys: ["g/4"], duration: "64" },{ keys: ["a/4"], duration: "64" },{ keys: ["b/4"], duration: "64",  },{ keys: ["b/4"], duration: "64" },
								{ keys: ["g/4"], duration: "64" },{ keys: ["a/4"], duration: "64" },{ keys: ["b/4"], duration: "64",  },{ keys: ["b/4"], duration: "64" },
								{ keys: ["g/4"], duration: "64" },{ keys: ["a/4"], duration: "64" },{ keys: ["b/4"], duration: "64",  },{ keys: ["b/4"], duration: "64" },
								{ keys: ["g/4"], duration: "64" },{ keys: ["a/4"], duration: "64" },{ keys: ["b/4"], duration: "64",  },{ keys: ["b/4"], duration: "64" },
								{ keys: ["g/4"], duration: "64" },{ keys: ["a/4"], duration: "64" },{ keys: ["b/4"], duration: "64",  },{ keys: ["b/4"], duration: "64" },
								{ keys: ["g/4"], duration: "64" },{ keys: ["a/4"], duration: "64" },{ keys: ["b/4"], duration: "64",  },{ keys: ["b/4"], duration: "64" }

						]
					}
				]
			}
		]
	};
});