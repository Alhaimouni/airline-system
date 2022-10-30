'use strict';

const event = require('./events');

function newFlightCreated(details,eventname) {
  console.log(
    {
      event: eventname,
      time: new Date(),
      Details: {
        airLine: 'Royal Jordanian Airlines',
        flightID: details.id,
        pilot: details.pilot,
        destination: details.destination,
      }
    }
  )
}









module.exports = { newFlightCreated };