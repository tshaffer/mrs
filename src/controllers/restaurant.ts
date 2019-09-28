import { Request, Response } from 'express';

import Restaurant from '../models/restaurant';
import { RestaurantDescription, DbRestaurant } from 'RestaurantType';
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
  const query = Restaurant.find({ restaurantId });
  return query.exec();

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

      if (!isNil(docs) && docs.length > 0) {

        console.log('restaurant already exists in db, perform overwrite');

        // only take first result for now
        const dbRestaurant: DbRestaurant = docs[0] as DbRestaurant;

        // docs[0]._doc
        // or individual properties including _id
        // what if I take the individual properties and not the db id?

        // restaurant already exists - just overwrite it
        // const updatedRestaurant = Object.assign(
        //   {}, dbRestaurant, restaurant);
        // console.log(updatedRestaurant);

        // const updatedRestaurant: DbRestaurant = {
        //  _id: dbRestaurant._id,
        //  restaurantId: dbRestaurant.restaurantId,
        //  name: dbRestaurant.name,
        //  category: dbRestaurant.category,
        //  overallRating: dbRestaurant.overallRating,
        //  foodRating: dbRestaurant.foodRating,
        //  serviceRating: dbRestaurant.serviceRating,
        //  ambienceRating: dbRestaurant.ambienceRating,
        //  outdoorSeating: dbRestaurant.outdoorSeating,
        //  comments: dbRestaurant.comments,
        //  wouldVisitAgain: dbRestaurant.wouldVisitAgain,       
        // };

        const baseRestaurant: DbRestaurant = {
          _id: dbRestaurant._id,
          restaurantId: dbRestaurant.restaurantId,
          name: dbRestaurant.name,
          category: dbRestaurant.category,
          overallRating: dbRestaurant.overallRating,
          foodRating: dbRestaurant.foodRating,
          serviceRating: dbRestaurant.serviceRating,
          ambienceRating: dbRestaurant.ambienceRating,
          outdoorSeating: dbRestaurant.outdoorSeating,
          comments: dbRestaurant.comments,
          wouldVisitAgain: dbRestaurant.wouldVisitAgain,
        };

        // const updatedRestaurant: DbRestaurant = Object.assign(
        //   {},
        //   { ...dbRestaurant },
        //   { ...restaurant },
        // );
        const updatedRestaurant: DbRestaurant = Object.assign(
          baseRestaurant,
          { ...restaurant },
        );
        console.log(updatedRestaurant);

      } else {
        console.log('restaurant does not exist in db, perform insert');

        // restaurant doesn't exist - add it.
      }

      // console.log('getRestaurantById resolved promise');
      // console.log(isNil(docs));
      // if (!isNil(docs)) {
      //   console.log(docs.length);
      //   if (docs.length > 0) {
      //     console.log(docs[0]);
      //   }
      // }
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

