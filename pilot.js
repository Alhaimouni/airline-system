'use strict';

const event = require('./events');
const { newFlightCreated } = require('./system');



function gotAflight(newFlightDetails) {
  setTimeout(() => {
    event.emit('took-off', newFlightDetails);
    newFlightCreated(newFlightDetails, 'took-off');
  }, 4000);
  arrived(newFlightDetails);
}

function arrived(flight) {
  setTimeout(() => {
    event.emit('arrived', flight);
  }, 7000);
}


module.exports = { gotAflight };