"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const Schema = mongoose.Schema;
const RestaurantSchema = new Schema({
    restaurantId: { type: String, required: true },
    name: { type: String, required: true, max: 100 },
    category: { type: String, required: true, max: 100 },
    overallRating: { type: Number, required: true },
    foodRating: { type: Number, required: true },
    serviceRating: { type: Number, required: true },
    ambienceRating: { type: Number, required: true },
    outdoorSeating: { type: Boolean },
    comments: { type: String, required: true, max: 100 },
    wouldVisitAgain: { type: Boolean },
});
exports.default = mongoose.model('Restaurant', RestaurantSchema);
//# sourceMappingURL=restaurant.js.map