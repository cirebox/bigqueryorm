"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaBuilder = void 0;
var SchemaBuilder = /** @class */ (function () {
    function SchemaBuilder() {
    }
    SchemaBuilder.createTable = function (tableName, columns) {
        var columnsDefinition = columns
            .map(function (col) { return "".concat(col.name, " ").concat(col.type, " ").concat(col.mode ? col.mode : ''); })
            .join(', ');
        return "CREATE TABLE `".concat(tableName, "` (").concat(columnsDefinition, ")");
    };
    SchemaBuilder.dropTable = function (tableName) {
        return "DROP TABLE `".concat(tableName, "`");
    };
    SchemaBuilder.alterTableAddColumn = function (tableName, column) {
        return "ALTER TABLE `".concat(tableName, "` ADD COLUMN ").concat(column.name, " ").concat(column.type, " ").concat(column.mode ? column.mode : '');
    };
    return SchemaBuilder;
}());
exports.SchemaBuilder = SchemaBuilder;
