import { PipeTransform } from '@nestjs/common';
import { ObjectID } from 'mongodb';
export default class ParseObjectIdPipe implements PipeTransform<any, ObjectID> {
    transform(value: any): ObjectID;
}
