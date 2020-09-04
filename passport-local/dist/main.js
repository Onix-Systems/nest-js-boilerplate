"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const passport = require("passport");
const session = require("express-session");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./components/app/app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.default);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(session({
        secret: 'hello-world',
        resave: false,
        saveUninitialized: true,
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map