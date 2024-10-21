"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertBuilder = void 0;
var InsertBuilder = /** @class */ (function () {
    function InsertBuilder(tableId) {
        this._values = [];
        this.tableId = tableId;
    }
    InsertBuilder.prototype.values = function (entity) {
        this._values.push(entity);
        return this;
    };
    InsertBuilder.prototype.build = function () {
        var columns = Object.keys(this._values[0]);
        var values = this._values.map(function (entity) {
            return "(".concat(columns.map(function (col) { return JSON.stringify(entity[col]); }).join(', '), ")");
        }).join(', ');
        return "INSERT INTO `".concat(this.tableId, "` (").concat(columns.join(', '), ") VALUES ").concat(values);
    };
    return InsertBuilder;
}());
exports.InsertBuilder = InsertBuilder;
