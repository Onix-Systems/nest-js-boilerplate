import { Response } from 'express';
export default class AppController {
    getHome(req: any, res: Response): {
        user: any;
    };
}
