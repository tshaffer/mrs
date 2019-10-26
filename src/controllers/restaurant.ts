import { Request, Response } from 'express';
import { Document } from 'mongoose';
import Restaurant from '../models/restaurant';
import { RestaurantSummary, DbRestaurant } from 'RestaurantType';
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

  const restaurant = request.body as RestaurantSummary;

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

function addRestaurant(restaurantDescription: RestaurantSummary): Promise<Document> {
  const restaurant = new Restaurant(restaurantDescription);
  return restaurant.save();
}

