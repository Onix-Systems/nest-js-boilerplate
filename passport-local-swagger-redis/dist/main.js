"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const flash = require("connect-flash");
const redisStore = require("connect-redis");
const redis = require("redis");
const exphbs = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
const path_1 = require("path");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./components/app/app.module");
const _404_filter_1 = require("./filters/404.filter");
const redisClient = redis.createClient();
const RedisStore = redisStore(session);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.default);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new _404_filter_1.default());
    const viewsPath = path_1.join(__dirname, '../public/views');
    app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }));
    app.set('views', viewsPath);
    app.set('view engine', '.hbs');
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
    app.use(flash());
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Api v1')
        .setDescription('The boilerplate API for nestjs devs')
        .setVersion('1.0')
        .addCookieAuth('connect.sid')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    const port = process.env.SERVER_PORT || 3000;
    await app.listen(port, () => console.log(`The server is running on ${port} port`));
}
bootstrap();
//# sourceMappingURL=main.js.map