"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectBuilder = void 0;
var SelectBuilder = /** @class */ (function () {
    function SelectBuilder(tableId) {
        this.whereConditions = [];
        this.orderConditions = [];
        this.tableId = tableId;
    }
    SelectBuilder.prototype.where = function (condition) {
        this.whereConditions.push(condition);
        return this;
    };
    SelectBuilder.prototype.orderBy = function (column, direction) {
        this.orderConditions.push("".concat(String(column), " ").concat(direction));
        return this;
    };
    SelectBuilder.prototype.limit = function (limit) {
        this.limitCondition = limit;
        return this;
    };
    SelectBuilder.prototype.build = function () {
        var query = "SELECT * FROM `".concat(this.tableId, "`");
        if (this.whereConditions.length > 0) {
            query += " WHERE ".concat(this.whereConditions.join(' AND '));
        }
        if (this.orderConditions.length > 0) {
            query += " ORDER BY ".concat(this.orderConditions.join(', '));
        }
        if (this.limitCondition !== undefined) {
            query += " LIMIT ".concat(this.limitCondition);
        }
        return query;
    };
    return SelectBuilder;
}());
exports.SelectBuilder = SelectBuilder;
