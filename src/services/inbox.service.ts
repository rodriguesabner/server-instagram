/* eslint-disable no-loop-func, no-await-in-loop, max-len */
import { ContainerInstance } from '../interfaces/container.interface';
import TargetUserInfoProps from '../interfaces/infoUser.interface';
import InstagramInstanceProps from '../interfaces/instagram.interface';

class InboxService {
  private instagram: InstagramInstanceProps;

  private targetUserInfo: TargetUserInfoProps;

  constructor(opts: ContainerInstance) {
    this.instagram = opts.scope.instance;
    this.targetUserInfo = opts.targetUserInfo;
  }

  async getInbox() {
    const inboxFeed = await this.instagram.feed.directInbox();
    const threads = await inboxFeed.items();

    const directMessagesFormated = threads.map((dm: any) => {
      const myId = this.instagram.loggedInUser.pk;

      // @ts-ignore
      const userId = Object.keys(dm.last_seen_at).find((pk) => pk !== myId);

      let readByUser = (dm.thread_title === '') || false;
      let readByMe = true;

      if (
        userId != null
            && dm.last_seen_at[userId]
      ) {
        readByUser = (dm.last_seen_at[userId].timestamp >= dm.last_permanent_item.timestamp);
      }

      if (dm.last_seen_at[myId]) {
        readByMe = (dm.last_seen_at[myId].timestamp >= dm.last_permanent_item.timestamp);
      }

      return {
        threadId: dm.thread_id,
        threadIdV2: dm.thread_v2_id,
        isGroup: (dm.users.length > 1),
        users: dm.users,
        readByUser,
        readByMe,
        // 'MINCURSOR' means there is no older one
        oldest_cursor: dm.oldest_cursor,
        // 'MAXCURSOR' means that theres no next one
        next_cursor: dm.next_cursor,
        lastMessage: {
          timeStamp: dm.last_permanent_item.timestamp,
          type: dm.last_permanent_item.item_type,
          messageContent: (() => {
            if (dm.last_permanent_item.link) return dm.last_permanent_item.link.text;
            if (dm.last_permanent_item.text) return dm.last_permanent_item.text;
            if (dm.last_permanent_item.media) return dm.last_permanent_item.media.image_versions2.candidates[0].url;
            if (dm.last_permanent_item.animated_media) return dm.last_permanent_item.animated_media.images.fixed_height.url;
            if (dm.last_permanent_item.like) return 'like';
            return 'unknown';
          })(),
        },
      };
    });

    return directMessagesFormated;
  }
}

export default InboxService;
