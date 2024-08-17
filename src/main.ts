import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Trello API')
    .setDescription('API документация')
    .setVersion('1.0.0')
    .addTag('trello api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const PORT = process.env.PORT;
  await app.listen(PORT);
  console.log('server is listening on port ', PORT);
}
bootstrap();
