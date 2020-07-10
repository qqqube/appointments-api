# appointment-app

#### Documentation
---

`/appointment/list`

> Parameters: None

> Description: Outputs list of current appointments

`/appointment/init`

> Parameters: `isAdmin` [type: `boolean`], `numRooms` [type: `number`], `startTime` [type: `number`], `endTime` [type: `number`]

> Description: Clears all the entries in the current database, configures
start/end times for booking appointments, and sets the number of rooms to
track

`/appointment/create`

> Parameters: `host` [type: `string`], `room_num` [type: `number`],
`time` [type: `number`], `duration` [type: `number`]

> Description: Creates a new appointment in the system if it doesn't conflict
with existing ones

`/appointment/delete`

> Parameters: `host` [type: `string`], `room_num` [type: `number`],
`time` [type: `number`], `duration` [type: `number`]

> Description: Deletes the appointment in the system

`/appointment/edit`

> Parameters: `host` [type: `string`], `room_num` [type: `number`],
`time` [type: `number`], `duration` [type: `number`], `newTime` [type: `number`], `newDuration` [type: `number`], `newRoom` [type: `number`]

> Description: Replaces the specified appointment with a new appointment


Note: `startTime` and `endTime` must be integers from 0 to 24
