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
        }).catch( (err: any) => {
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
