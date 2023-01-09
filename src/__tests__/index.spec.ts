import { Sapphire } from '../controllers/index';

jest.mock('amqplib', () => ({
  connect: jest.fn(() => ({
    createChannel: jest.fn(() => ({
      assertQueue: jest.fn(),
      consume: jest.fn(),
      sendToQueue: jest.fn(),
      ack: jest.fn(),
      nack: jest.fn(),
    })),
  })),
}));

const setupSut = () => {
  const sut = new Sapphire();
  return { sut };
};

describe('Sapphire Suite Tests', () => {
  test('should subscribe channel', async () => {
    const { sut } = setupSut();
    await expect(
      sut.subscribe(async () => {
        return;
      }, 'channel1'),
    ).resolves.toBeUndefined();
  });

  test('should publish channel', async () => {
    const { sut } = setupSut();
    await expect(sut.publish('testing', 'channel1')).resolves.toHaveLength(0);
  });
});
