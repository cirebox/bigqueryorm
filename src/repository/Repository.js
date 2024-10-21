"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
var query_builder_1 = require("../query-builder");
var result_1 = require("../query-builder/result");
var Repository = /** @class */ (function () {
    function Repository(_connection, _entity) {
        var _a, _b;
        this.connection = _connection;
        this.tableMetadata = Reflect.getMetadata('table', _entity);
        if (!this.connection.config.datasetName && !((_a = this.tableMetadata) === null || _a === void 0 ? void 0 : _a.datasetName))
            throw new Error("Missing dataset metadata for entity: ".concat(_entity));
        if (!((_b = this.tableMetadata) === null || _b === void 0 ? void 0 : _b.name))
            throw new Error("Missing tableName metadata for entity: ".concat(_entity));
    }
    Repository.prototype.loadFromCsv = function (csvFilePath) {
        throw new Error("Method not implemented.");
    };
    Repository.prototype.query = function (query) {
        throw new Error("Method not implemented.");
    };
    Repository.prototype.insert = function (dto) {
        throw new Error("Method not implemented.");
    };
    /**
     * Finds multiple entities based on provided options.
     */
    Repository.prototype.find = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var datasetName, queryBuilder, query, rows, result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        datasetName = (_a = this.connection.config.datasetName) !== null && _a !== void 0 ? _a : this.tableMetadata.datasetName;
                        queryBuilder = new query_builder_1.SelectBuilder("".concat(datasetName, ".").concat(this.tableMetadata.name));
                        if (options === null || options === void 0 ? void 0 : options.where) {
                            Object.keys(options.where).forEach(function (key) {
                                queryBuilder.where("".concat(key, " = ").concat(JSON.stringify(options.where[key])));
                            });
                        }
                        if (options === null || options === void 0 ? void 0 : options.order) {
                            Object.keys(options.order).forEach(function (key) {
                                queryBuilder.orderBy(key, 'DESC'); //options.order[key]
                            });
                        }
                        if (options === null || options === void 0 ? void 0 : options.take) {
                            queryBuilder.limit(options.take);
                        }
                        query = queryBuilder.build();
                        return [4 /*yield*/, this.connection.query({ query: query })];
                    case 1:
                        rows = (_b.sent())[0];
                        result = new result_1.FindResult(rows, rows.length);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Finds a single entity based on provided options.
     */
    Repository.prototype.findOne = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var query, rows;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = "SELECT * FROM ".concat(this.tableMetadata.name, ".").concat(this.tableMetadata.name, " ").concat((0, query_builder_1.WhereBuilder)(options.where), " LIMIT 1");
                        return [4 /*yield*/, this.connection.query({ query: query })];
                    case 1:
                        rows = (_b.sent())[0];
                        return [2 /*return*/, (_a = rows[0]) !== null && _a !== void 0 ? _a : null];
                }
            });
        });
    };
    return Repository;
}());
exports.Repository = Repository;
