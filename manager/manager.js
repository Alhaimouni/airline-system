'use strict';

const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');

require('dotenv').config();

console.log(`Manager is working`);

const socket = require('socket.io-client');

const manager = socket.connect(process.env.GLOBAL_HUB_URL);

setInterval(() => {
  const newFlight = {
    id: uuidv4(),
    pilot: faker.name.fullName(),
    destination: faker.address.country(),
    time: new Date(),
  };
  manager.emit('createFlight', newFlight);
}, 10000);

manager.on('new-flight', (payload) => {
  console.log(`Manager: new flight with ID '${payload.id}' have been scheduled ${new Date()}`);
  payload.event = 'new-flight';
  payload.time = new Date();
  manager.emit('flightDetails', payload);
});

