import { OnModuleDestroy } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['localhost:29092'],
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
