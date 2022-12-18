import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository,
    );
    const targetRecipientId = 'recipient-1';

    await notificationsRepository.create(
      makeNotification({ recipientId: targetRecipientId }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: targetRecipientId }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: targetRecipientId,
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: targetRecipientId }),
        expect.objectContaining({ recipientId: targetRecipientId }),
      ]),
    );
  });
});
