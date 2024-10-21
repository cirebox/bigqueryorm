// src/decorators/Column.ts
import 'reflect-metadata';
import { ColumnMetadata } from '../types';

export function Column(metadata: ColumnMetadata): ClassDecorator {
  return function (target: Function) {
    target.prototype.name = metadata.name;
    target.prototype.type = metadata.type;
    target.prototype.mode = metadata.mode;
    target.prototype.description = metadata.description;
    Reflect.defineMetadata('column', metadata, target);
  }
}
