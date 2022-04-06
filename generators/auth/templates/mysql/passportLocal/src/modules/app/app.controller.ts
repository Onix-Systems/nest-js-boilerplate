import fs from 'fs';
import {
  Controller,
  Get,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Response as ExpressResponse } from 'express';

@ApiTags('App')
@Controller()
export default class AppController {
  @ApiOkResponse({
    type: Buffer,
    description: 'returns a favicon',
  })
  @Get('favicon.ico')
  public getFavicon(@Res() res: ExpressResponse) {
    fs.createReadStream(`${__dirname}/../../../public/favicon.png`)
      .on('data', (chunk: Buffer) => {
        res.write(chunk);
      })
      .on('close', () => {
        res.end();
      });
  }
}
