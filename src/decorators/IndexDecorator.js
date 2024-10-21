"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Index = Index;
// src/decorators/IndexDecorator.js
function Index() {
    var columns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        columns[_i] = arguments[_i];
    }
    return function (target) {
        if (!target.prototype.tableOptions) {
            target.prototype.tableOptions = {};
        }
        target.prototype.tableOptions.clustering = {
            fields: columns
        };
        Reflect.defineMetadata('index', columns, target);
    };
}
