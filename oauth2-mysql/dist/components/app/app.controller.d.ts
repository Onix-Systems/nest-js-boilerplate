import AppService from './app.service';
export default class AppController {
    private readonly appService;
    constructor(appService: AppService);
    index(): string;
}
