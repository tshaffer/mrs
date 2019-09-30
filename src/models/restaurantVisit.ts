import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RestaurantVisitSchema = new Schema(
  {
    restaurantVisitId: { type: String, required: true },
    restaurantId: { type: String, required: true },
    visitDate: { type: Date, required: true }, // https://mongoosejs.com/docs/schematypes.html#dates
    comments: { type: String, required: true, max: 100 },
  },
);

export default mongoose.model('RestaurantVisit', RestaurantVisitSchema);

