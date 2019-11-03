"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __importStar(require("body-parser"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = require("./routes/routes");
const mongoDB = 'mongodb://ted:memoRappTed0524@ds243607.mlab.com:43607/memorapp';
class App {
    constructor() {
        this.route = new routes_1.Routes();
        this.app = express_1.default();
        this.config();
        this.route.routes(this.app);
        // Workaround to allow empty strings
        // https://github.com/Automattic/mongoose/issues/7150
        const Str = mongoose_1.default.Schema.Types.String;
        Str.checkRequired((v) => v != null);
        mongoose_1.default.connect(mongoDB);
        mongoose_1.default.Promise = global.Promise;
        const db = mongoose_1.default.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.once('open', function callback() {
            console.log('memoRapp db open successful');
        });
        console.log('end of constructor');
    }
    config() {
        this.app.use(bodyParser.urlencoded({
            extended: true,
        }));
        this.app.use(bodyParser.json());
        let port = process.env.PORT;
        console.log(port);
        if (port === undefined || port === null || port === '') {
            port = 8000;
        }
        console.log(typeof port);
        console.log(port);
        this.app.set('port', port);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map