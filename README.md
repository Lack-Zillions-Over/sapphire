# LZO: Sapphire

> Pub/Sub messaging using RabbitMQ.

[![Sponsor][sponsor-badge]][sponsor]
[![Commitizen friendly][commitizen-badge]][commitizen]
[![TypeScript version][ts-badge]][typescript-4-9]
[![Node.js version][nodejs-badge]][nodejs]
[![MIT][license-badge]][license]
[![Build Status - GitHub Actions][gha-badge]][gha-ci]

## Installation

```bash
npm install lzo-sapphire OR yarn add lzo-sapphire
```

## Configuration

Please input the credentials of your RabbitMQ server in the `.env` file.

> See the example in the `.env.example` file.

```bash
RABBITMQ_URL="amqp://admin:admin@rabbitmq:5672"
RABBITMQ_PORT=5672
```

## Usage

```typescript
import { sapphire } from 'lzo-sapphire';

Sapphire.subscribe(
  (value) => console.log(typeof value, value), // object, { name: 'John Doe' }
  'testing',
);

setTimeout(() => {
  Sapphire.publish({ name: 'John Doe' }, 'testing');
});
```

## API

`Sapphire.publish<T>(value: T, ...channels: string[]): Promise<string[]>`

> Publishes a message to a channel or multiple channels.

`Sapphire.subscribe<T>(callback: (message: T) => Promise<void>, ...channels: string[]): Promise<void>`

> Subscribes to a channel or multiple channels.

## Backers & Sponsors

Support this project by becoming a [sponsor][sponsor].

## License

Licensed under the MIT. See the [LICENSE](https://github.com/Lack-Zillions-Over/sapphire/blob/main/LICENSE) file for details.

[commitizen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen]: http://commitizen.github.io/cz-cli/
[ts-badge]: https://img.shields.io/badge/TypeScript-4.9-blue.svg
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%2018.12.1-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v18.x/docs/api/
[gha-badge]: https://github.com/Lack-Zillions-Over/sapphire/actions/workflows/nodejs.yml/badge.svg
[gha-ci]: https://github.com/Lack-Zillions-Over/sapphire/actions/workflows/nodejs.yml
[typescript-4-9]: https://devblogs.microsoft.com/typescript/announcing-typescript-4-9/
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: https://github.com/Lack-Zillions-Over/sapphire/blob/main/LICENSE
[sponsor-badge]: https://img.shields.io/badge/♥-Sponsor-fc0fb5.svg
[sponsor]: https://github.com/sponsors/Lack-Zillions-Over
