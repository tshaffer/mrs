import { Request, Response } from 'express';
import { Document } from 'mongoose';

import { RestaurantVisitState, DbRestaurantVisit } from 'RestaurantType';
import RestaurantVisit from '../models/restaurantVisit';
import { isNil } from 'lodash';

export function getAllRestaurantVisits(request: Request, response: Response) {
  console.log('getAllRestaurantVisits');
  const query = RestaurantVisit.find({});
  return query.exec()
    .then((docs: Document[]) => {
      response.json(docs);
    }).catch((err: Error) => {
      console.log('getAllRestaurantVisits: ', err);
    });
}


export function setRestaurantVisit(request: Request, response: Response) {

  console.log('setRestaurantVisit:');

  const restaurantVisit = request.body as RestaurantVisitState;

  getRestaurantVisitByRestaurantVisitId(restaurantVisit.restaurantVisitId)
    .then((docs: any[]) => {

      if (!isNil(docs) && docs.length > 0) {

        console.log('restaurant already exists in db, perform overwrite');

        // only take first result for now
        const dbRestaurantVisit: DbRestaurantVisit = docs[0] as DbRestaurantVisit;

        // update values of existing restaurant with specified restaurant
        const updatedRestaurantVisit: any = Object.assign(
          dbRestaurantVisit,
          { ...restaurantVisit },
        );
        updatedRestaurantVisit.save()
          .then(() => {
            console.log('restaurant visit successfully updated');
          }).catch((updateErr: any) => {
            console.log('restaurant visit update failed');
            console.log(updateErr);
          });
      } else {

        console.log('restaurant does not exist in db, perform insert');

        addRestaurantVisit(restaurantVisit)
          .then((doc: any) => {
            console.log('addRestaurantVisit returned:');
            console.log(doc);
            response.end('ok');
          }).catch((err: any) => {
            console.log('err returned from addRestaurantVisit');
            console.log(err);
          });
      }
    });

  // respond immediately or wait for the result of db operation?
  response.sendStatus(200);
}

function getRestaurantVisitByRestaurantVisitId(restaurantVisitId: string): Promise<Document[]> {
  const query = RestaurantVisit.find({ restaurantId: restaurantVisitId });
  return query.exec();
}

function addRestaurantVisit(restaurantVisit: RestaurantVisitState): Promise<Document> {
  const restaurant = new RestaurantVisit(restaurantVisit);
  return restaurant.save();
}


