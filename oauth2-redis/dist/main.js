"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const redisStore = require("connect-redis");
const redis = require("redis");
const passport = require("passport");
const session = require("express-session");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./components/app/app.module");
const redisClient = redis.createClient();
const RedisStore = redisStore(session);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.default);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(session({
        secret: process.env.PASSPORT_SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new RedisStore({
            host: 'redis',
            port: 6379,
            client: redisClient,
            ttl: 666,
        }),
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    const port = process.env.SERVER_PORT || 3000;
    await app.listen(port, () => console.log(`The server is running on ${port} port`));
}
bootstrap();
//# sourceMappingURL=main.js.map