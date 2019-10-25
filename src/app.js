import express from 'express';

import routes from './routes';

import './database/index';

class App {
  constructor() {
    this.server();

    this.middlewares();
    this.routes();
  }

  middlewares() {}

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
