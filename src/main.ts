import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';;
import * as cookieParser from 'cookie-parser';
import { serverUtil } from './shared/utils/server.utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(cookieParser());
  await serverUtil.boot().then(async () => {
    await app.listen(process.env.PORT ?? 3000, () => {
      console.log(`Welcome to Logixpay ${process.env.PORT ?? 3000}`);
    });
  });

}
bootstrap();
 