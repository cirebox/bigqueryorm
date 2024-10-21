// src/decorators/IndexDecorator.js
export function Index(...columns: string[]) {
  return function (target: Function) {
    if (!target.prototype.tableOptions) {
      target.prototype.tableOptions = {};
    }
    target.prototype.tableOptions.clustering = {
      fields: columns
    };

    Reflect.defineMetadata('index', columns, target);
  }
}