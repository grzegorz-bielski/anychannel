import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

function bootstrap(): Promise<void> {
    const port = Number.parseInt(process.env.NODE_PORT!, 10);

    return NestFactory.create(AppModule).then(app => {
        // app.setGlobalPrefix('api');
        app.listen(port);
    });
}

bootstrap();
