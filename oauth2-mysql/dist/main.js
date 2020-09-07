"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const passport = require("passport");
const session = require("express-session");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./components/app/app.module");
const MySQLStore = require('express-mysql-session')(session);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.default);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(session({
        secret: process.env.PASSPORT_SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new MySQLStore({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '1234',
            database: 'sessions',
        }),
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    const port = process.env.SERVER_PORT || 3000;
    await app.listen(port, () => console.log(`The server is running on ${port} port`));
}
bootstrap();
//# sourceMappingURL=main.js.map