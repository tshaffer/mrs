import { Request, Response } from 'express';
import { Document } from 'mongoose';
import Restaurant from '../models/restaurant';
import { RestaurantDescription, DbRestaurant } from 'RestaurantType';
import { isNil } from 'lodash';

export function getAllRestaurants(request: Request, response: Response) {
  console.log('getAllRestaurants');
  const query = Restaurant.find({});
  return query.exec()
    .then((docs: Document[]) => {
      response.json(docs);
    }).catch((err: Error) => {
      console.log('getAllRestaurants: ', err);
    });
}

export function setRestaurant(request: Request, response: Response) {

  console.log('setRestaurant:');

  const restaurant = request.body as RestaurantDescription;

  getRestaurantByRestaurantId(restaurant.restaurantId)
    .then((docs: any[]) => {

      if (!isNil(docs) && docs.length > 0) {

        console.log('restaurant already exists in db, perform overwrite');

        // only take first result for now
        const dbRestaurant: DbRestaurant = docs[0] as DbRestaurant;

        // update values of existing restaurant with specified restaurant
        const updatedRestaurant: any = Object.assign(
          dbRestaurant,
          { ...restaurant },
        );
        updatedRestaurant.save()
          .then(() => {
            console.log('restaurant successfully updated');
          }).catch((updateErr: any) => {
            console.log('restaurant update failed');
            console.log(updateErr);
          });
      } else {

        console.log('restaurant does not exist in db, perform insert');

        addRestaurant(restaurant)
          .then((doc: any) => {
            console.log('addRestaurant returned:');
            console.log(doc);
            response.end('ok');
          }).catch((err: any) => {
            console.log('err returned from addRestaurant');
            console.log(err);
          });
      }
    });

  // respond immediately or wait for the result of db operation?
  response.sendStatus(200);
}

function getRestaurantByRestaurantId(restaurantId: string): Promise<Document[]> {
  const query = Restaurant.find({ restaurantId });
  return query.exec();
}

function addRestaurant(restaurantDescription: RestaurantDescription): Promise<Document> {
  const restaurant = new Restaurant(restaurantDescription);
  return restaurant.save();
}

// Obsolete??
// export function getRestaurant(request: Request, response: Response) {

//   const restaurantId = request.query.restaurantId;
//   console.log(request.query);
//   console.log(Object.keys(request.query));
//   console.log('restaurantId: ', restaurantId);

//   const query = Restaurant.find({ restaurantId });
//   // const query = Restaurant.find({});
//   query.exec((err: any, docs: any) => {
//     if (err) {
//       console.log('err: ', err);
//     }
//     console.log('docs');
//     console.log('length: ', docs.length);
//     console.log(docs[0]);

//     const existingRestaurant: any = docs[0] as any;
//     existingRestaurant.overallRating = 6.9;
//     existingRestaurant.save()
//       .then(() => {
//         console.log('restaurant updated');
//       }).catch((updateErr: any) => {
//         console.log(updateErr);
//       });
//   });

//   response.sendStatus(200);
// }

// Obsolete??
// export function addRestaurantHandler(request: Request, response: Response) {
//   console.log('request:');
//   console.log(request);
//   console.log('addRestaurant:');
//   console.log(request.body);
//   addRestaurant(request.body)
//     .then((doc: any) => {
//       console.log('addRestaurant returned:');
//       console.log(doc);
//       response.end('ok');
//     }).catch((err: any) => {
//       console.log('err returned from addRestaurant');
//       console.log(err);
//     });
// }

