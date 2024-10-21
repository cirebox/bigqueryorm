"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataSetMetadata = getDataSetMetadata;
exports.getTableMetadata = getTableMetadata;
exports.getColummMetadata = getColummMetadata;
function getDataSetMetadata(datasetName) {
    return Reflect.getMetadata('dataset', datasetName);
}
function getTableMetadata(metadata) {
    return Reflect.getMetadata('table', metadata);
}
// export function getIndexMetadata(metadata: ColumnOptions): Record<string, TableField> {
//   return Reflect.getMetadata('index', metadata);
// }
function getColummMetadata(metadata) {
    return Reflect.getMetadata('column', metadata);
}
