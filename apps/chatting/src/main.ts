import { NestFactory } from '@nestjs/core';
import { ChattingModule } from './chatting.module';

async function bootstrap() {
  const app = await NestFactory.create(ChattingModule);
  const PORT = process.env.CHATTING_PORT || 3001;
  await app.listen(PORT, () => {
    console.log(`App started on PORT:${PORT}`);
  });
}
bootstrap();
