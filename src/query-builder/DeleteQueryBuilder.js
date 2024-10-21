"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteBuilder = void 0;
var DeleteBuilder = /** @class */ (function () {
    function DeleteBuilder(tableId) {
        this.whereConditions = [];
        this.tableId = tableId;
    }
    DeleteBuilder.prototype.where = function (condition) {
        this.whereConditions.push(condition);
        return this;
    };
    DeleteBuilder.prototype.build = function () {
        var query = "DELETE FROM `".concat(this.tableId, "`");
        if (this.whereConditions.length > 0) {
            query += " WHERE ".concat(this.whereConditions.join(' AND '));
        }
        return query;
    };
    return DeleteBuilder;
}());
exports.DeleteBuilder = DeleteBuilder;
