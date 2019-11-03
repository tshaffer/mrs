"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restaurantVisit_1 = __importDefault(require("../models/restaurantVisit"));
const lodash_1 = require("lodash");
function getAllRestaurantVisits(request, response) {
    console.log('getAllRestaurantVisits');
    const query = restaurantVisit_1.default.find({});
    return query.exec()
        .then((docs) => {
        response.json(docs);
    }).catch((err) => {
        console.log('getAllRestaurantVisits: ', err);
    });
}
exports.getAllRestaurantVisits = getAllRestaurantVisits;
function setRestaurantVisit(request, response) {
    console.log('setRestaurantVisit:');
    const restaurantVisit = request.body;
    getRestaurantVisitByRestaurantVisitId(restaurantVisit.restaurantVisitId)
        .then((docs) => {
        if (!lodash_1.isNil(docs) && docs.length > 0) {
            console.log('restaurant already exists in db, perform overwrite');
            // only take first result for now
            const dbRestaurantVisit = docs[0];
            // update values of existing restaurant with specified restaurant
            const updatedRestaurantVisit = Object.assign(dbRestaurantVisit, Object.assign({}, restaurantVisit));
            updatedRestaurantVisit.save()
                .then(() => {
                console.log('restaurant visit successfully updated');
            }).catch((updateErr) => {
                console.log('restaurant visit update failed');
                console.log(updateErr);
            });
        }
        else {
            console.log('restaurant does not exist in db, perform insert');
            addRestaurantVisit(restaurantVisit)
                .then((doc) => {
                console.log('addRestaurantVisit returned:');
                console.log(doc);
                response.end('ok');
            }).catch((err) => {
                console.log('err returned from addRestaurantVisit');
                console.log(err);
            });
        }
    });
    // respond immediately or wait for the result of db operation?
    response.sendStatus(200);
}
exports.setRestaurantVisit = setRestaurantVisit;
function getRestaurantVisitByRestaurantVisitId(restaurantVisitId) {
    const query = restaurantVisit_1.default.find({ restaurantId: restaurantVisitId });
    return query.exec();
}
function addRestaurantVisit(restaurantVisit) {
    const restaurant = new restaurantVisit_1.default(restaurantVisit);
    return restaurant.save();
}
//# sourceMappingURL=restaurantVisit.js.map