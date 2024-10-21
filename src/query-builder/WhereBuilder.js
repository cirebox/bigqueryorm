"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhereBuilder = WhereBuilder;
var find_options_1 = require("../find-options");
function WhereBuilder(where) {
    if (!where || Object.keys(where).length === 0) {
        return ''; // Sem condições, retorna string vazia
    }
    var conditions = Object.entries(where).map(function (_a) {
        var key = _a[0], value = _a[1];
        if (value instanceof find_options_1.FindOperator) {
            // Se o valor for uma instância de FindOperator, usa o operador
            return "".concat(key, " ").concat(value.operator, " ").concat(JSON.stringify(value.value));
        }
        else {
            // Igualdade simples
            return "".concat(key, " = ").concat(JSON.stringify(value));
        }
    });
    return "WHERE ".concat(conditions.join(' AND '));
}
