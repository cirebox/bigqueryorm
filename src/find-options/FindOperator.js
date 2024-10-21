"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindOperator = void 0;
exports.MoreThan = MoreThan;
exports.LessThan = LessThan;
exports.Like = Like;
exports.In = In;
var FindOperator = /** @class */ (function () {
    function FindOperator(operator, value) {
        this.operator = operator;
        this.value = value;
    }
    return FindOperator;
}());
exports.FindOperator = FindOperator;
// Exemplo de uso de operadores para buscas mais avançadas
function MoreThan(value) {
    return new FindOperator('>', value);
}
function LessThan(value) {
    return new FindOperator('<', value);
}
function Like(value) {
    return new FindOperator('LIKE', value);
}
function In(value) {
    return new FindOperator('IN', value);
}
