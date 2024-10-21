"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = Column;
// src/decorators/Column.ts
require("reflect-metadata");
function Column(metadata) {
    return function (target) {
        target.prototype.name = metadata.name;
        target.prototype.type = metadata.type;
        target.prototype.mode = metadata.mode;
        target.prototype.description = metadata.description;
        Reflect.defineMetadata('column', metadata, target);
    };
}
