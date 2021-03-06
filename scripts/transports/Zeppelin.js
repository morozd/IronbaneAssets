
actorScripts["Zeppelin"] = State.extend({
	Init: function() {

		this.waypoints = worldHandler.BuildWaypointListFromUnitIds(
			[1030,1031,1032,1033,1034,1035,1036,1037,1038,1039,1040,1041,1042,1043,1044,1045,1046]
			//[1,2,3]
		);

	},
	Enter: function(unit) {

		unit.mass = 5;

		if ( !this.waypoints.length ) return;

		unit.position.copy(this.waypoints[0].pos);

		unit.stateMachine.ChangeState(new Patrol(this.waypoints));

	},
	Execute: function(unit, dTime) {



	},
	Exit: function(unit) {


	},
    HandleMessage: function(unit, message, data) {
		switch(message) {
			case "changeWaypoint":
				var seek = true;
				var pause = 0;

				if ( data.id === 1030 ) {
					seek = false;
					pause = 20000;
				}
				if ( data.id === 1039 ) {
					seek = false;
					pause = 20000;
				}
				if ( data.id === 1038 ) {
					unit.maxSpeed = 2.0;
				}
				if ( data.id === 1040 ) {
					unit.maxSpeed = 4.0;
				}

				if ( data.id === 1046 ) {
					unit.maxSpeed = 2.0;
				}
				if ( data.id === 1031 ) {
					unit.maxSpeed = 4.0;
				}

				unit.stateMachine.ChangeState(new Patrol(this.waypoints, {
					seek: seek,
					pause: pause,
					firstWaypoint: data.id
				}));

				console.log("Going to waypoint "+data.id);
				break;
		}

    }
});

actorScripts["ZeppelinB"] = actorScripts["Zeppelin"].extend({
	Init: function() {
		this._super();
	},
	Enter: function(unit) {

		unit.mass = 5;

		if ( !this.waypoints.length ) return;

		unit.position.copy(this.waypoints[9].pos);

		unit.stateMachine.ChangeState(new Patrol(this.waypoints, {
			firstWaypoint: 1040
		}));

	}
});
