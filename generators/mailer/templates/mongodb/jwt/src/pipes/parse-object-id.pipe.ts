import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectID } from 'mongodb';

@Injectable()
export default class ParseObjectIdPipe implements PipeTransform<any, ObjectID> {
  public transform(value: string): ObjectID {
    try {
      return ObjectID.createFromHexString(value);
    } catch (error) {
      throw new BadRequestException('Validation failed (ObjectId is expected)');
    }
  }
}
