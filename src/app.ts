import * as bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import * as path from 'path';

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

    console.log('end of constructor');
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

    this.app.post('*', (req, res) => {
      switch (req.path) {
        case '/addRestaurant':
          console.log('addRestaurant:');
          console.log(req.body);
          // addRestaurant(req.body);
          break;
      }
    });
    
    // support application/json type post data
    this.app.use(bodyParser.json());

    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
    // app.use(bodyParser.urlencoded({
    //   extended: true
    // }))

    this.app.set('port', process.env.PORT || 8000);
  }
}

export default new App().app;
