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
const RestaurantVisitSchema = new Schema({
    restaurantVisitId: { type: String, required: true },
    restaurantId: { type: String, required: true },
    visitDate: { type: Date, required: true },
    comments: { type: String, required: true, max: 100 },
});
exports.default = mongoose.model('RestaurantVisit', RestaurantVisitSchema);
//# sourceMappingURL=restaurantVisit.js.map