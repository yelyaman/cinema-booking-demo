import { Test, TestingModule } from '@nestjs/testing';
import { ChattingController } from './chatting.controller';
import { ChattingService } from './chatting.service';

describe('ChattingController', () => {
  let chattingController: ChattingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChattingController],
      providers: [ChattingService],
    }).compile();

    chattingController = app.get<ChattingController>(ChattingController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(chattingController.getHello()).toBe('Hello World!');
    });
  });
});
