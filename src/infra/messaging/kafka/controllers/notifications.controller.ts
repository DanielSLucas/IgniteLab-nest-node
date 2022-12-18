import { SendNotification } from '@app/use-cases/send-notification';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

interface SendNotificationPayload {
  content: string;
  category: string;
  recipientId: string;
}

@Controller()
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @EventPattern('notifications.send-notification')
  async handleSendNotification(
    @Payload() { recipientId, category, content }: SendNotificationPayload,
  ) {
    await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });
  }
}
