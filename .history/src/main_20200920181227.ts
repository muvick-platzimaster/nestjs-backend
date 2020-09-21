import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.useGlobalPipes(new ValidationPipe());
  // const options = new DocumentBuilder()
  //   .setTitle('Pangu Learning API')
  //   .setDescription('The Pangu Learning API description')
  //   .setVersion('0.1')
  //   .build();

  // const document = SwaggerModule.createDocument(app, options);

  // SwaggerModule.setup('api', app, document);
  await app.listen(AppModule.PORT);
}
bootstrap();
