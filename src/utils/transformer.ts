import { createTransform, Transform } from 'redux-persist';

interface TransformConfig {
  whitelist?: Array<string>;
  blacklist?: Array<string>;
}

export type SerializableClass = {
  new(...args: any[]): {},
  name: string,
  deserialize(json: string): InstanceType<SerializableClass>,
  prototype: {
    serialize(): string,
  }
};

export function transformer<HSS, ESS>(args: SerializableClass[], options?: TransformConfig): Transform<HSS, ESS> {

  const mapper: Map<string, SerializableClass> = new Map<string, SerializableClass>();
  for(let cls of args) {
    mapper.set(cls.name, cls);
  }
  const replacer = (value: any): any => {
    if(typeof value === 'object' && value !== null) {
      if(mapper.has(value.constructor.name)) {
        return {
          __serializedType__: value.constructor.name, 
          data: value.serialize()
        };
      }

      if(Array.isArray(value)) {
        return value.map(v => replacer(v))
      }
      let res: any = {};
      for(let key in value) {
        res[key] = replacer(value[key]);
      }
      return res;
    }
    return value;
  }

  const reviver = (value: any): any => {
    if (typeof value === 'object'){
      if(value !== null && value.hasOwnProperty('__serializedType__') 
        && mapper.has(value.__serializedType__)) {
          return mapper.get(value.__serializedType__)!.deserialize(value.data);
      }
      if(value === null) {
        return null;
      }
      if(Array.isArray(value)) {
        return value.map(v => reviver(v));
      }
      let res: any = {};
      for(let key in value) {
        res[key] = reviver(value[key]);
      }
      return res;
    }
    return value;
  }

  return createTransform(
    (state, _) => replacer(state),
    (state, _) => reviver(state),
    options
  );
}