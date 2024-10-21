"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapTypeScriptTypeToBigQuery = mapTypeScriptTypeToBigQuery;
// utils/type-mapper.ts
function mapTypeScriptTypeToBigQuery(type) {
    switch (type.toLowerCase()) {
        case 'string':
            return 'STRING';
        case 'number':
            return 'FLOAT64';
        case 'boolean':
            return 'BOOL';
        case 'date':
            return 'DATE';
        default:
            throw new Error("Tipo n\u00E3o suportado: ".concat(type));
    }
}
