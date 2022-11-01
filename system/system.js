'use strict';

const socket_io = require('socket.io');
require('dotenv').config();


console.log(`System is working`);

const hub = socket_io(process.env.HUB);    /*  http://localhost:4000  */
const airline = hub.of('/airline');        /*  http://localhost:4000/airline  */


hub.on('connection', (clientSocket) => {
  console.log(`New client connected to Global HUB at ${process.env.HUB} with id : ${clientSocket.id}  at : ${new Date()}`);
  clientSocket.on('createFlight', (payload) => {
    hub.emit('new-flight', payload);
    hub.emit('sendToAirLine', payload);
  });
  clientSocket.on('flightDetails', (payload) => {
    console.log(payload);
  });
});

airline.on('connection', (clientSocket) => {
  console.log(`New client connected to  Airline HUB at ${process.env.HUB}/airline with id : ${clientSocket.id}`);
  clientSocket.on('tookOff-details', (payload) => {
    airline.emit('took-off', payload);
    airline.emit('arrived', payload);
  });
  clientSocket.on('flightDetails', (payload) => {
    console.log(payload);
  });
});
