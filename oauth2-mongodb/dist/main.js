"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const passport = require("passport");
const session = require("express-session");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./components/app/app.module");
const MongoDBStore = require('connect-mongodb-session')(session);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.default);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(session({
        secret: process.env.PASSPORT_SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new MongoDBStore({
            uri: 'mongodb+srv://root:1234@cluster0-ilpdw.mongodb.net/nestjs-test-api',
            collection: 'sessions'
        }),
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    const port = process.env.SERVER_PORT || 3000;
    await app.listen(port, () => console.log(`The server is running on ${port} port`));
}
bootstrap();
//# sourceMappingURL=main.js.map