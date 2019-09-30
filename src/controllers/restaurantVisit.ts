import { Request, Response } from 'express';
import { Document } from 'mongoose';

import { RestaurantVisitSummary } from 'RestaurantType';
import RestaurantVisit from '../models/restaurantVisit';

export function addRestaurantVisit(request: Request, response: Response) {

  const restaurantVisit = new RestaurantVisit(request.body as RestaurantVisitSummary);
  restaurantVisit.save()
    .then((doc: any) => {
      console.log('add restaurantVisit returned:');
      console.log(doc);
      response.end('ok');
    }).catch((err: any) => {
      console.log('err returned from addRestaurant');
      console.log(err);
    });

  response.sendStatus(200);
}
