import * as bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import * as path from 'path';

import Restaurant from './models/restaurant';

// import { Routes } from './routes/routes';

const mongoDB = 'mongodb://ted:memoRappTed0524@ds243607.mlab.com:43607/memorapp';

class App {

  public app: express.Application;
  // public route: Routes = new Routes();

  constructor() {

    this.app = express();
    this.config();
    // this.route.routes(this.app);

    mongoose.connect(mongoDB);
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', function callback() {
      console.log('memoRapp db open successful');
    });

    console.log('end of constructor');
  }

  addRestaurant(restaurantDescription: any) {
    const restaurant = new Restaurant(restaurantDescription);
    restaurant.save((err) => {
      if (err) {
        console.log('err: ', err);
        return;
      }
    });
  }

  private config(): void {

    const pathToIndex = path.join(__dirname, '../public', 'index.html');
    const pathToCSS = path.join(__dirname, '../public', 'css', 'app.css');
    const pathToBundle = path.join(__dirname, '../public', 'build', 'bundle.js');

    this.app.get('*', (req, res) => {
      switch (req.url) {
        case '/':
        case '/index.html':
          res.sendFile(pathToIndex);
          break;
        case '/css/app.css':
          res.sendFile(pathToCSS);
          break;
        case '/build/bundle.js':
          res.sendFile(pathToBundle);
          break;
      }
    });

    this.app.use(bodyParser.urlencoded({
      extended: true,
    }));

    this.app.use(bodyParser.json());

    this.app.post('*', (req, res) => {
      console.log('req:');
      console.log(req);
      switch (req.path) {
        case '/addRestaurant':
          console.log('addRestaurant:');
          console.log(req.body);
          this.addRestaurant(req.body);
          break;
      }
    });

    this.app.set('port', process.env.PORT || 8000);
  }
}

export default new App().app;
