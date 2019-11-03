"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mainController_1 = require("../controllers/mainController");
const restaurant_1 = require("../controllers/restaurant");
const restaurantVisit_1 = require("../controllers/restaurantVisit");
class Routes {
    routes(app) {
        this.createRoutes(app);
    }
    createRoutes(app) {
        app.get('/', mainController_1.getIndex);
        app.get('/index.html', mainController_1.getIndex);
        app.get('/css/app.css', mainController_1.getCSS);
        app.get('/build/bundle.js', mainController_1.getBundle);
        app.get('/getAllRestaurants', restaurant_1.getAllRestaurants);
        app.post('/restaurant', restaurant_1.setRestaurant);
        app.post('/restaurantVisit', restaurantVisit_1.setRestaurantVisit);
        app.get('/getAllRestaurantVisits', restaurantVisit_1.getAllRestaurantVisits);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map