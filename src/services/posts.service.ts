/* eslint-disable no-await-in-loop */
import { IgApiClient } from 'instagram-private-api';
// @ts-ignore
import parser from 'instagram-id-to-url-segment';
import { ContainerInstance } from '../interfaces/container.interface';
import { sleep } from '../common/utils';

class PostsService {
  private instagram: IgApiClient;

  private container: ContainerInstance;

  constructor(opts: ContainerInstance) {
    this.container = opts;
    this.instagram = opts.scope.instance;
  }

  async getRecentPosts() {
    const { targetUserInfo } = this.container;

    const feed = await this.instagram.feed.user(targetUserInfo.pk);
    const list = await feed.items();

    // To keep getting content, maybe on a future function:
    /* do {
        moreList = await feed.items();
        Array.prototype.push.apply(list,moreList);
        console.log(list[list.length-1]);
        console.log(list.length);

    } while(feed.moreAvailable == true); */

    return list;
  }

  async getComments(postId: string, maxComments = 20) {
    const comments: any = [];

    try {
      const commentsFeed = await this.instagram.feed.mediaComments(postId);
      let commentsResponse = await commentsFeed.items();

      do {
        let repeatedComment = false;
        let repeats = 0;

        commentsResponse = await commentsFeed.items();

        if (commentsResponse.length !== 0) {
          commentsResponse.forEach((comment) => {
            if (comments.length >= maxComments) {
              return comments;
            }

            if (comment.content_type === 'comment') {
              for (let i = 0; i < comments.length; i += 1) {
                if (comments[i].pk === comment.pk) {
                  repeatedComment = true;
                  repeats += 1;
                  break;
                }
              }
              if (!repeatedComment) {
                comments.push(comment);
              }
            }

            return comment;
          });

          if (commentsResponse.length === repeats) {
            return comments;
          }
        }

        if (
          commentsResponse.length !== 0
            && commentsResponse.length !== 1
            && comments.length < maxComments
        ) {
          await sleep(5);
        } else {
          break;
        }
      } while (commentsResponse.length !== 0 && comments.length < maxComments);

      return comments;
    } catch (err) {
      console.log(err);
      console.log('Wait a few minutes after getting a lot of comments');
      return comments;
    }
  }

  async commentPost(postId: string, content: string) {
    await this.instagram.media.comment({
      module: 'profile',
      mediaId: postId,
      text: content,
    });

    const timestamp = new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000;
    const link = `https://www.instagram.com/p/${parser.instagramIdToUrlSegment(postId)}`;

    return {
      status: 'ok',
      timestamp,
      link,
    };
  }
}

export default PostsService;
