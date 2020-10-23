"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var connect_1 = __importDefault(require("./connect"));
var mongoose_1 = require("./mongoose");
var app = express_1.default();
connect_1.default();
var customerModel = new mongoose_1.Customer();
app.use(express_1.default.json());
app.use(function (err, req, res, next) {
    res.status(500).json({
        success: false,
        message: err.message
    });
});
app.post("/customers", function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var customers, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                if (!(req.body instanceof Array)) return [3 /*break*/, 2];
                return [4 /*yield*/, customerModel.createMany(req.body)];
            case 1:
                customers = _a.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, customerModel.create(req.body)];
            case 3:
                customers = _a.sent();
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                return [2 /*return*/, next(err_1)];
            case 6:
                res.json(customers);
                return [2 /*return*/];
        }
    });
}); });
app.get("/customers", function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var limit, customers, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                limit = Number(req.body.limit) || 10;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, customerModel.getAll(limit)];
            case 2:
                customers = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                return [2 /*return*/, next(err_2)];
            case 4:
                res.json(customers);
                return [2 /*return*/];
        }
    });
}); });
app.get('/customers/search', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var customers, name, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.query.name ? {
                    first_name: {
                        $regex: req.query.name,
                        $options: 'i'
                    }
                } : {};
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, customerModel.getByName(name)];
            case 2:
                customers = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                return [2 /*return*/, next(err_3)];
            case 4:
                res.json(customers);
                return [2 /*return*/];
        }
    });
}); });
app.get('/customers/type/:type', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var customers, type, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                type = req.params.type;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, customerModel.getByType(type)];
            case 2:
                customers = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                return [2 /*return*/, next(err_4)];
            case 4:
                res.json(customers);
                return [2 /*return*/];
        }
    });
}); });
app.get("/customers/age/:age", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var customers, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, customerModel.getByAge(parseInt(req.params.age))];
                case 1:
                    customers = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, next(error_1)];
                case 3: return [2 /*return*/, res.send(customers)];
            }
        });
    });
});
app.listen(process.env.PORT || 8000, function () {
    console.log("App listen on port " + (process.env.PORT || 8000));
});
