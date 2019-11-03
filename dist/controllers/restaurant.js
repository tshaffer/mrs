"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restaurant_1 = __importDefault(require("../models/restaurant"));
const lodash_1 = require("lodash");
function getAllRestaurants(request, response) {
    console.log('getAllRestaurants');
    const query = restaurant_1.default.find({});
    return query.exec()
        .then((docs) => {
        response.json(docs);
    }).catch((err) => {
        console.log('getAllRestaurants: ', err);
    });
}
exports.getAllRestaurants = getAllRestaurants;
function setRestaurant(request, response) {
    console.log('setRestaurant:');
    const restaurant = request.body;
    getRestaurantByRestaurantId(restaurant.restaurantId)
        .then((docs) => {
        if (!lodash_1.isNil(docs) && docs.length > 0) {
            console.log('restaurant already exists in db, perform overwrite');
            // only take first result for now
            const dbRestaurant = docs[0];
            // update values of existing restaurant with specified restaurant
            const updatedRestaurant = Object.assign(dbRestaurant, Object.assign({}, restaurant));
            updatedRestaurant.save()
                .then(() => {
                console.log('restaurant successfully updated');
            }).catch((updateErr) => {
                console.log('restaurant update failed');
                console.log(updateErr);
            });
        }
        else {
            console.log('restaurant does not exist in db, perform insert');
            addRestaurant(restaurant)
                .then((doc) => {
                console.log('addRestaurant returned:');
                console.log(doc);
                response.end('ok');
            }).catch((err) => {
                console.log('err returned from addRestaurant');
                console.log(err);
            });
        }
    });
    // respond immediately or wait for the result of db operation?
    response.sendStatus(200);
}
exports.setRestaurant = setRestaurant;
function getRestaurantByRestaurantId(restaurantId) {
    const query = restaurant_1.default.find({ restaurantId });
    return query.exec();
}
function addRestaurant(restaurantDescription) {
    const restaurant = new restaurant_1.default(restaurantDescription);
    return restaurant.save();
}
//# sourceMappingURL=restaurant.js.map