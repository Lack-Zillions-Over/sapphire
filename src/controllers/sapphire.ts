import { createHash } from 'crypto';
import { compress, decompress } from 'lzutf8';
import { Connection, Channel, connect } from 'amqplib';

class Sapphire {
  private connection: Connection;
  private channelMQ: Channel;

  private async _initialize() {
    this.connection = await this._getConnection();
    this.channelMQ = await this._getChannel();
  }

  private async _getConnection() {
    if (!this.connection) {
      return await connect(process.env.RABBITMQ_URL);
    } else {
      return this.connection;
    }
  }

  private async _getChannel() {
    if (!this.channelMQ) {
      return await this.connection.createChannel();
    } else {
      return this.channelMQ;
    }
  }

  private _serialize(text: string) {
    return createHash('sha256').update(text).digest('hex');
  }

  private _compress<T>(value: T): string {
    return compress(JSON.stringify(value), { outputEncoding: 'Base64' });
  }

  private _decompress<T>(value: string): T {
    return JSON.parse(
      decompress(value, { inputEncoding: 'Base64', outputEncoding: 'String' }),
    );
  }

  /**
   * @description Publishes a message to a channel or multiple channels
   * @returns An array of channels that the message was published to successfully
   */
  public async publish<T>(
    value: T,
    ...channels: string[]
  ): Promise<string[]> {
    const result: string[] = [];

    for (const channel of channels) {
      const queue = this._serialize(channel);

      await this._initialize();
      await this.channelMQ.assertQueue(queue, { durable: true });

      if (
        this.channelMQ.sendToQueue(
          queue,
          Buffer.from(this._compress(value)),
          { persistent: true },
        )
      ) {
        result.push(channel);
      }
    }

    return result;
  }

  /**
   * @description Subscribes to a channel or multiple channels
   */
  public async subscribe<T>(
    callback: (message: T) => Promise<void>,
    ...channels: string[]
  ) {
    channels = channels.map((channel) => this._serialize(channel));

    for (const channel of channels) {
      await this._initialize();
      await this.channelMQ.assertQueue(channel, { durable: true });

      this.channelMQ.consume(channel, async (msg) => {
        try {
          const message = msg.content.toString();
          await callback(this._decompress(message));
          this.channelMQ.ack(msg);
        } catch (err) {
          this.channelMQ.nack(msg);
        }
      });
    }
  }
}

export default Sapphire;
