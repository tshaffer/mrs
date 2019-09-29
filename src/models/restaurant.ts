import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema(
  {
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
  },
);

export default mongoose.model('Restaurant', RestaurantSchema);

