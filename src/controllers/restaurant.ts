import { Request, Response } from 'express';

import Restaurant from '../models/restaurant';

export function addRestaurantHandler(request: Request, response: Response) {
  console.log('request:');
  console.log(request);
  switch (request.path) {
    case '/addRestaurant':
      console.log('addRestaurant:');
      console.log(request.body);
      addRestaurant(request.body)
        .then((doc: any) => {
          console.log('addRestaurant returned:');
          console.log(doc);
          response.end('ok');
        }).catch((err: any) => {
          console.log('err returned from addRestaurant');
          console.log(err);
        });
      break;
  }
}

function addRestaurant(restaurantDescription: any) {
  const restaurant = new Restaurant(restaurantDescription);
  return restaurant.save();
  // return restaurant.save((err: any) => {
  //   if (err) {
  //     console.log('err: ', err);
  //     return;
  //   }
  // });
}

export function getRestaurant(request: Request, response: Response) {

  const restaurantId = request.query.restaurantId;
  console.log(request.query);
  console.log(Object.keys(request.query));
  console.log('restaurantId: ', restaurantId);

  const query = Restaurant.find({ id: restaurantId });
  // const query = Restaurant.find({});
  query.exec((err: any, docs: any) => {
    if (err) {
      console.log('err: ', err);
    }
    console.log('docs');
    console.log('length: ', docs.length);
    console.log(docs);
  });

  response.sendStatus(200);
}
