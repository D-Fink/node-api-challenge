const express = require('express');

const server = express();

server.use(express.json());

const projectsRouter = require('./projects/projectsRouter.js');
const actionsRouter = require('./actions/actionsRouter.js');

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

module.exports = server;