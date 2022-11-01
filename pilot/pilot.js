'use strict';

require('dotenv').config();

console.log(`Pilot is working`);

const socket = require('socket.io-client');

const pilot_airline = socket.connect(process.env.AIRLINE_HUB_URL);
const pilot_hub = socket.connect(process.env.GLOBAL_HUB_URL);



pilot_hub.on('sendToAirLine', (payload) => {
  pilot_airline.emit('tookOff-details', payload);
});


pilot_airline.on('took-off', (payload) => {
  setTimeout(() => {
    console.log(`Pilot: flight with ID '${payload.id}' took-off at : ${new Date()}`);
    payload.event = 'took-off';
    payload.time = new Date();
    pilot_airline.emit('flightDetails', payload);
  }, 4000);
});


pilot_airline.on('arrived', (payload) => {
  setTimeout(() => {
    console.log(`Pilot: flight with ID '${payload.id}' arrived at : ${new Date()}`);
    payload.event = 'arrived';
    payload.time = new Date();
    pilot_airline.emit('flightDetails', payload);
  }, 7000);
});