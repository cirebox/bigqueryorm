"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// entities/user.entity.ts
var decorators_1 = require("../../src/decorators");
var User = function () {
    var _classDecorators = [(0, decorators_1.Table)({ name: 'user_table', suffix: 'months', datasetName: 'dataset_user', partitionBy: 'DATE(timestamp)', clusterBy: ['user_id'], description: 'Tabela de teste de integração' }), (0, decorators_1.Index)('user_id', 'event_type')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _age_decorators;
    var _age_initializers = [];
    var _age_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _createAt_decorators;
    var _createAt_initializers = [];
    var _createAt_extraInitializers = [];
    var User = _classThis = /** @class */ (function () {
        function User_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.age = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _age_initializers, void 0));
            this.isActive = (__runInitializers(this, _age_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            this.createAt = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _createAt_initializers, void 0));
            __runInitializers(this, _createAt_extraInitializers);
        }
        return User_1;
    }());
    __setFunctionName(_classThis, "User");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, decorators_1.Column)({ name: 'USER_ID', type: 'STRING', mode: "REQUIRED" })];
        _name_decorators = [(0, decorators_1.Column)({ name: 'USER_NAME', type: 'STRING', mode: "REQUIRED" })];
        _age_decorators = [(0, decorators_1.Column)({ name: 'USER_AGE', type: 'FLOAT', mode: "NULLABLE", description: "IDADE" })];
        _isActive_decorators = [(0, decorators_1.Column)({ name: 'USER_ACTIVE', type: 'BOOLEAN', mode: "NULLABLE" })];
        _createAt_decorators = [(0, decorators_1.Column)({ name: 'USER_CREATEAT', type: 'DATE', mode: "NULLABLE" })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _age_decorators, { kind: "field", name: "age", static: false, private: false, access: { has: function (obj) { return "age" in obj; }, get: function (obj) { return obj.age; }, set: function (obj, value) { obj.age = value; } }, metadata: _metadata }, _age_initializers, _age_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _createAt_decorators, { kind: "field", name: "createAt", static: false, private: false, access: { has: function (obj) { return "createAt" in obj; }, get: function (obj) { return obj.createAt; }, set: function (obj, value) { obj.createAt = value; } }, metadata: _metadata }, _createAt_initializers, _createAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        User = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return User = _classThis;
}();
exports.User = User;
