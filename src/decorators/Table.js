"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = Table;
function Table(metadata) {
    return function (target) {
        target.prototype.tableName = metadata.name;
        target.prototype.prefix = metadata.prefix;
        target.prototype.suffix = metadata.suffix;
        target.prototype.datasetName = metadata.datasetName;
        target.prototype.tableId = metadata.tableId;
        target.prototype.projectId = metadata.projectId;
        target.prototype.partitionBy = metadata.partitionBy;
        target.prototype.clusterBy = metadata.clusterBy;
        Reflect.defineMetadata('table', metadata, target);
    };
}
