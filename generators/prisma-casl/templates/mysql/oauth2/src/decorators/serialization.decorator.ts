import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import SerializeInterceptor from '@interceptors/serialization.interceptor';

const SERIALIZE_TYPE_KEY = 'SerializeTypeKey';
export function getSerializeType(target:any):any {
  return Reflect.getMetadata(SERIALIZE_TYPE_KEY, target) as any;
}

export function setSerializeType(target:any, serializeType: any) {
  Reflect.defineMetadata(SERIALIZE_TYPE_KEY, serializeType, target);
}

const Serialize = (roles: any) => (proto: any, propName: any, descriptor: any) => {
  setSerializeType(proto[propName], roles);
  UseInterceptors(ClassSerializerInterceptor)(proto, propName, descriptor);
  UseInterceptors(SerializeInterceptor)(proto, propName, descriptor);
};

export default Serialize;
