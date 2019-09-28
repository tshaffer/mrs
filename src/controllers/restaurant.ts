import { Request, Response } from 'express';

import Restaurant from '../models/restaurant';
import { RestaurantDescription } from 'RestaurantType';
import { isNil } from 'lodash';

export function addRestaurantHandler(request: Request, response: Response) {
  console.log('request:');
  console.log(request);
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

  const query = Restaurant.find({ restaurantId });
  // const query = Restaurant.find({});
  query.exec((err: any, docs: any) => {
    if (err) {
      console.log('err: ', err);
    }
    console.log('docs');
    console.log('length: ', docs.length);
    console.log(docs[0]);

    const existingRestaurant: any = docs[0] as any;
    existingRestaurant.overallRating = 6.9;
    existingRestaurant.save()
      .then(() => {
        console.log('restaurant updated');
      }).catch((updateErr: any) => {
        console.log(updateErr);
      });
  });

  response.sendStatus(200);
}

export function getAllRestaurants() {
  console.log('getAllRestaurants');
}

export function getRestaurantByRestaurantId(restaurantId: string): Promise<any[]> {

  console.log('getRestaurantByRestaurantId');
  console.log('restaurantId: ', restaurantId);
  console.log('invoke query');
  const query = Restaurant.find({ restaurantId });
  console.log('return query');
  return query.exec();
  // .then((docs: any) => {
  //   console.log('docs');
  //   console.log(docs);
  //   console.log('length of docs: ', docs.length);
  //   console.log('docs[0]');
  //   console.log(docs[0]);
  //   if (!(docs) || (docs as any[]).length === 0) {
  //     console.log('reject with 404');
  //     Promise.reject(404);
  //   }
  //   console.log('resolve with: ');
  //   console.log(docs[0]);
  //   Promise.resolve(docs[0] as RestaurantDescription);
  // }).catch((err: any) => {
  //   Promise.reject(err);
  // });

  // const existingRestaurant: any = docs[0] as any;
  // existingRestaurant.overallRating = 6.9;
  // existingRestaurant.save()
  //   .then(() => {
  //     console.log('restaurant updated');
  //   }).catch((updateErr: any) => {
  //     console.log(updateErr);
  //   });
  // });
}

export function setRestaurant(request: Request, response: Response) {
  console.log('setRestaurant:');
  console.log(request.body);

  const restaurant = request.body as RestaurantDescription;

  getRestaurantByRestaurantId(restaurant.restaurantId)
    .then((docs: any[]) => {
      console.log('getRestaurantById resolved promise');
      console.log(isNil(docs));
      if (!isNil(docs)) {
        console.log(docs.length);
        if (docs.length > 0) {
          console.log(docs[0]);
        }
      }
    });
  // .then((dbRestaurant: RestaurantDescription) => {
  //   console.log('getRestaurantById returned');
  //   console.log(dbRestaurant);
  // }).catch((err: any) => {
  //   console.log('err', err);
  // });
  response.sendStatus(200);
  // addRestaurant(request.body)
  //   .then((doc: any) => {
  //     console.log('addRestaurant returned:');
  //     console.log(doc);
  //     response.end('ok');
  //   }).catch((err: any) => {
  //     console.log('err returned from addRestaurant');
  //     console.log(err);
  //   });
}

