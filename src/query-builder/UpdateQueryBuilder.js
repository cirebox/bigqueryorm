"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBuilder = void 0;
var UpdateBuilder = /** @class */ (function () {
    function UpdateBuilder(tableId) {
        this.setConditions = [];
        this.whereConditions = [];
        this.tableId = tableId;
    }
    UpdateBuilder.prototype.set = function (column, value) {
        this.setConditions.push("".concat(String(column), " = ").concat(JSON.stringify(value)));
        return this;
    };
    UpdateBuilder.prototype.where = function (condition) {
        this.whereConditions.push(condition);
        return this;
    };
    UpdateBuilder.prototype.build = function () {
        var query = "UPDATE `".concat(this.tableId, "` SET ").concat(this.setConditions.join(', '));
        if (this.whereConditions.length > 0) {
            query += " WHERE ".concat(this.whereConditions.join(' AND '));
        }
        return query;
    };
    return UpdateBuilder;
}());
exports.UpdateBuilder = UpdateBuilder;
