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
exports.ConnectionOrm = void 0;
var bigquery_1 = require("@google-cloud/bigquery");
var ConnectionOrm = /** @class */ (function () {
    function ConnectionOrm(_config) {
        this._config = _config;
        this.client = new bigquery_1.BigQuery({
            projectId: _config.projectId,
            keyFilename: _config.keyFilename,
        });
        this.config = _config;
    }
    ConnectionOrm.getInstance = function (config) {
        if (!ConnectionOrm.instance) {
            ConnectionOrm.instance = new ConnectionOrm(config);
        }
        return ConnectionOrm.instance;
    };
    ConnectionOrm.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rows, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.query('SELECT 1')];
                    case 1:
                        rows = (_a.sent())[0];
                        console.log('Connected to BigQuery');
                        return [2 /*return*/, rows.length > 0];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConnectionOrm.prototype.getTable = function (tableMetadata) {
        return __awaiter(this, void 0, void 0, function () {
            var datasetName, db, datasetExists, Dataset_1, error_1, table, tableExists;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        datasetName = (_a = this.config.datasetName) !== null && _a !== void 0 ? _a : tableMetadata.datasetName;
                        if (!datasetName)
                            throw new Error('Undefined datasetName when creating table');
                        db = this.getDataset(datasetName);
                        return [4 /*yield*/, db.exists()];
                    case 1:
                        datasetExists = (_b.sent())[0];
                        if (!!datasetExists) return [3 /*break*/, 5];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.createDataset(datasetName)];
                    case 3:
                        Dataset_1 = (_b.sent())[0];
                        db = Dataset_1;
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        console.error("Erro ao criar dataset ".concat(datasetName, " no big query:"), error_1);
                        throw error_1;
                    case 5:
                        table = this.getTableRef(tableMetadata.name, datasetName);
                        return [4 /*yield*/, table.exists()];
                    case 6:
                        tableExists = (_b.sent())[0];
                        if (tableExists) {
                            return [2 /*return*/, table];
                        }
                        try {
                            // const schema = getColummMetadata(target.prototype);
                            // const [table] = await db.createTable(tableMetadata.name, { ...tableMetadata, schema: Object.values(schema) });
                            // console.log(`Tabela ${table.id} criada.`);
                            return [2 /*return*/, table];
                        }
                        catch (error) {
                            console.error("Erro ao criar tabela ".concat(tableMetadata.name, " big query:"), error);
                            throw error;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ConnectionOrm.prototype.getDataset = function (name, options) {
        if (!this.client)
            throw new Error('Not connected to BigQuery. Call connect() first.');
        var datasetName = name !== null && name !== void 0 ? name : this.config.datasetName;
        if (!datasetName)
            throw new Error('Undefined dataset when creating table');
        return this.client.dataset(datasetName, options);
    };
    ConnectionOrm.prototype.getTableRef = function (tableName, dataset, tableOptions) {
        if (!this.client)
            throw new Error('Not connected to BigQuery. Call connect() first.');
        var ds = this.getDataset(dataset);
        if (!ds)
            throw new Error('Undefined dataset when selecting table');
        return ds.table(tableName);
    };
    ConnectionOrm.prototype.createDataset = function (name, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.client)
                            throw new Error('Not connected to BigQuery. Call connect() first.');
                        return [4 /*yield*/, this.client.createDataset(name, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ConnectionOrm.prototype.runQuery = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var job, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.client)
                            throw new Error('Not connected to BigQuery. Call connect() first.');
                        return [4 /*yield*/, this.client.createQueryJob({ query: query })];
                    case 1:
                        job = (_a.sent())[0];
                        return [4 /*yield*/, job.getQueryResults()];
                    case 2:
                        rows = (_a.sent())[0];
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    ConnectionOrm.prototype.query = function (query, options) {
        return __awaiter(this, void 0, void 0, function () {
            var rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.client)
                            throw new Error('Not connected to BigQuery. Call connect() first.');
                        return [4 /*yield*/, this.client.query(query, options)];
                    case 1:
                        rows = (_a.sent())[0];
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    return ConnectionOrm;
}());
exports.ConnectionOrm = ConnectionOrm;
