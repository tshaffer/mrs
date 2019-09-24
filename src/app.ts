import * as bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import * as path from 'path';


import { Routes } from './routes/routes';

const mongoDB = 'mongodb://ted:memoRappTed0524@ds243607.mlab.com:43607/memorapp';

class App {

  public app: express.Application;
  public route: Routes = new Routes();

  constructor() {

    this.app = express();
    this.config();
    this.route.routes(this.app);

    mongoose.connect(mongoDB);
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', function callback() {
      console.log('memoRapp db open successful');
    });

    console.log('end of constructor');
  }

  private config(): void {

    this.app.use(bodyParser.urlencoded({
      extended: true,
    }));

    this.app.use(bodyParser.json());

    // this.app.post('*', (req, res) => {
    //   console.log('req:');
    //   console.log(req);
    //   switch (req.path) {
    //     case '/addRestaurant':
    //       console.log('addRestaurant:');
    //       console.log(req.body);
    //       this.addRestaurant(req.body);
    //       break;
    //   }
    // });

    this.app.set('port', process.env.PORT || 8000);
  }
}

export default new App().app;
