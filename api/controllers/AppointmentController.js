/**
 * AppointmentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


var startTime;
var endTime;
var openStart;
var numRooms;


module.exports = {

    list: function(req, res){

      Appointment.find({}).exec(function(err, appointments) {
        if (err) {
          res.send(500, {error: 'Database Error'});
        }
        res.send(appointments);
      });


    },

    init: function(req, res) {

        if (req.body.isAdmin == 'true') {
            Appointment.destroy({}).exec(function(err) {
              if (err) {
                res.send(500, {error:'Database Error'});
              }
            });
            numRooms = +(req.body.numRooms);
            startTime = +(req.body.startTime);
            endTime = +(req.body.endTime);

            if (startTime >= endTime) {
              res.send(500, {error: 'Initialization Error'});
            }
            if (numRooms <=0) {
              res.send(500, {error: 'Initialization Error'});
            }
            openStart = new Map();
            for (var idx=0; idx < numRooms; idx++) {
                var lst = [];
                for (var t=startTime; t <=endTime; t++) {
                   lst.push(t);
                }
                openStart.set(idx, lst);
            }
            res.send("Initialization succeeded.");
        }
        else {
          res.send("Incorrect access priviledges.");
        }

    },


    create:async function(req, res) {

      var host = req.body.host;
      var room_num = +(req.body.room_num);
      var time = +(req.body.time);
      var duration = +(req.body.duration);

      if (room_num >= numRooms || room_num < 0) {
        res.send("Input error.");
      }
      var lst = openStart.get(room_num);
      var available = true;
      for (var t = time; t < time + duration; t++) {
        if (lst.includes(t) == false) {available = false; break;}
      }
      if (available) {

        lst = arrayRemove(lst, time, time + duration);

        openStart.set(room_num, lst);
        Appointment.create({host:host, room_num:room_num, time:time, duration:duration}).exec(
          function(err) {
            if (error) {
              res.send(500, {error: 'Database Error'});
            }
          }
        )
        console.log(lst);
        res.send("Appointment successfully booked.");
      }

      else {
        res.send("Unable to book appointment due to time conflicts.");

      }
    },

    delete: function(req, res) {

      var host = req.body.host;
      var room_num = +(req.body.room_num);
      var time = +(req.body.time);
      var duration = +(req.body.duration);

      Appointment.destroy({host:host, room_num:room_num, time:time, duration:duration}).exec(
        function(err) {
          if (err) {
            res.send(500, {error: 'Database Error'});
          }
        }
      );

      var lst = openStart.get(room_num);
      var endpoint = time+duration;
      while (time < endpoint) {
          lst.push(time); time++;
      }
      //lst.sort(function(x, y) {return x > y;});
      openStart.set(room_num, lst);
      console.log(openStart.get(room_num));
      res.send("Successfully Deleted Appointment.");
    },

    edit: function(req, res) {

      var host = req.body.host;
      var room_num = +(req.body.room_num);
      var time = +(req.body.time);
      var duration = +(req.body.duration);

      var newTime = +(req.body.newTime);
      var newDuration = +(req.body.newDuration);
      var newRoom = +(req.body.newRoom);

      /* Check if new time, duration, and room number are available  */
      if (newRoom >= numRooms || newRoom < 0) {
        res.send("Input error.");
      }
      var lst = openStart.get(newRoom);
      var lstCopy = lst.slice();
      if (newRoom == room_num) {
        for (var t = time; t < time + duration; t++) {
          lstCopy.push(t);
        }
      }

      var available = true;
      for (var t = newTime; t < newTime + newDuration; t++) {
        if (lstCopy.includes(t) == false) {available = false; break;}
      }

      if (available) {
        lstCopy = arrayRemove(lstCopy, newTime, newTime + newDuration);
        openStart.set(room_num, lstCopy);
        Appointment.create({host:host, room_num:newRoom, time:newTime, duration:newDuration}).exec(
          function(err) {
            if (err) {
              res.send(500, {error: 'Database Error'});
            }
          }
        )
        Appointment.destroy({host:host, room_num:room_num, time:time, duration:duration}).exec(
          function(err) {
            if (err) {
              res.send(500, {error: 'Database Error'});
            }
          }
        )

        if (room_num != newRoom) {
            var oldLst = openStart.get(room_num);
            for (var t = time; t < time + duration; t++) {
              oldLst.push(t);
            }
            openStart.set(room_num, oldLst);
        }

        res.send("Appointment edited.");

      }

      else {
        res.send("Unable to edit appointment.");

      }




    }


};



function arrayRemove(arr, value1, value2) {
    return arr.filter(function(ele){ return !(ele >= value1 && ele < value2); });
}
