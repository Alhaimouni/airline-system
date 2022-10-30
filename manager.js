'use strict';

const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');
const { gotAflight } = require('./pilot');
const event = require('./events');
const { newFlightCreated } = require('./system');


setInterval(() => {
  let newFlightDetails = {
    id: uuidv4(),
    pilot: faker.name.fullName(),
    destination: faker.address.country(),
    time: faker.date.future(),
  }
  event.emit('new-flight', newFlightDetails);
  newFlightCreated(newFlightDetails, 'new-flight');
  gotAflight(newFlightDetails);
  event.once('arrived', (newFlightDetails) => {
    
    console.log(`Manager: we are greatly thankful for the amazing flight,${newFlightDetails.pilot}`);
  })
}, 10000);


