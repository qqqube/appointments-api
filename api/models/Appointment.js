/**
 * Appointment.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
       host: {
         type:'string'
       },
       room_num: {
         type:'number'
       },
       time: {
         type:'number'
       },
       /* duration of appointment in hours */
       duration: {
         type: 'number'
       },
       isAdmin: {
         type: 'boolean'
       },
       numRooms: {
         type:'number'
       },
       startTime: {
         type:'number'
       },
       endTime: {
         type:'number'
       },
       newTime: {
         type: 'number'
       },
       newDuration: {
         type: 'number'
       },
       newRoom: {
         type:'number'
       }
  }

};
