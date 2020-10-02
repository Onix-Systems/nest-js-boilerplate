import * as fs from 'fs';
import {
  Controller,
  Render,
  UseGuards,
  Get,
  Res,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCookieAuth,
  ApiUnauthorizedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';

import IsLoggedGuard from '@guards/is-logged.guard';
import UserEntity from '@components/users/entities/user.entity';
import SuccessResponse from '@responses/success.response';
import AppUtils from '@components/app/app.utils';

@ApiTags('App')
@Controller()
export default class AppController {
  @ApiCookieAuth()
  @ApiOkResponse({
    type: AppUtils.DtoFactory.wrap(UserEntity),
    description: 'Returns the logged user',
  })
  @ApiUnauthorizedResponse({
    description: 'Returns the unauthorized error',
  })
  @UseGuards(IsLoggedGuard)
  @Get('/home')
  @Render('home')
  getHome(
    @Req() req: ExpressRequest,
    @Res() res: ExpressResponse,
  ): SuccessResponse {
    return new SuccessResponse(null, req.user as UserEntity);
  }

  @ApiOkResponse({
    type: Buffer,
    description: 'returns a favicon',
  })
  @Get('favicon.ico')
  async getFavicon(@Res() res: ExpressResponse) {
    fs.createReadStream(`${__dirname}/../../../public/favicon.png`)
      .on('data', (chunk: Buffer) => {
        res.write(chunk);
      })
      .on('close', () => {
        return res.end();
      });
  }
}
