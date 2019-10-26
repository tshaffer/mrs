/** @internal */
/** @private */
export interface RestaurantsState { // BaPeUiLiveTextDataFeedsState
  [id: string]: RestaurantDataState;
}

/** @internal */
/** @private */
export interface RestaurantDataState { // BaPeUiLiveTextDataFeedsDataState
  restaurant: RestaurantSummary | {};
  visits: RestaurantVisitMap;
  menuItems: RestaurantMenuItemMap;
}

export interface DbRestaurant extends RestaurantSummary {
  _id: number;
}

export interface DbRestaurantVisit extends RestaurantVisitState {
  _id: number;
}

/** @internal */
/** @private */
export interface RestaurantSummary {
  restaurantId: string;
  name: string;
  category: number; // change to string?
  overallRating: number;
  foodRating: number;
  serviceRating: number;
  ambienceRating: number;
  outdoorSeating: boolean;
  comments: string;
  wouldVisitAgain: boolean;
}

/** @internal */
/** @private */
export interface RestaurantVisitState {
  restaurantVisitId: string;
  restaurantId: string;
  visitDate: Date;
  comments: string;
}

export interface RestaurantVisitMap {
  [restaurantVisitId: string]: RestaurantVisitState;
}

/** @internal */
/** @private */
export interface RestaurantMenuItem {
  id: string;
  rating: number;
}

export interface RestaurantMenuItemMap {
  [id: string]: RestaurantMenuItem;
}

