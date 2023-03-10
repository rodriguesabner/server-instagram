/* eslint-disable no-await-in-loop */
// @ts-ignore
import parser from 'instagram-id-to-url-segment';
import _ from 'lodash';
import fs from 'fs';
import { StickerBuilder } from 'instagram-private-api/dist/sticker-builder';
import { ContainerInstance } from '../interfaces/container.interface';
import { sleep } from '../common/utils';
import TargetUserInfoProps from '../interfaces/infoUser.interface';
import InstagramInstanceProps from '../interfaces/instagram.interface';

class PostsService {
  private instagram: InstagramInstanceProps;

  private targetUserInfo: TargetUserInfoProps;

  constructor(opts: ContainerInstance) {
    this.instagram = opts.scope.instance;
    this.targetUserInfo = opts.targetUserInfo;
  }

  async findPostById(postId: string) {
    const postInfo = await this.instagram.media.info(postId);
    return postInfo.items;
  }

  async getRecentPosts() {
    const feed = await this.instagram.feed.user(this.targetUserInfo.pk);
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

  async likePost(postId: string) {
    await this.instagram.media.like({
      mediaId: postId,
      moduleInfo: {
        module_name: 'profile',
        user_id: this.instagram.loggedInUser.pk,
        username: this.instagram.loggedInUser.username,

      },
      // @ts-ignore
      d: _.sample([0, 1]),
    });

    const timestamp = new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000;
    const link = `https://www.instagram.com/p/${parser.instagramIdToUrlSegment(postId)}`;

    return {
      status: 'ok',
      timestamp,
      link,
    };
  }

  async unlikePost(postId: string) {
    await this.instagram.media.unlike({
      mediaId: postId,
      moduleInfo: {
        module_name: 'profile',
        user_id: this.instagram.loggedInUser.pk,
        username: this.instagram.loggedInUser.username,
      },
    });

    const timestamp = new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000;
    const link = `https://www.instagram.com/p/${parser.instagramIdToUrlSegment(postId)}`;

    return {
      status: 'ok',
      timestamp,
      link,
    };
  }

  async uploadPostImage(description: string, filePath: string) {
    const file = fs.readFileSync(filePath);

    const ret = await this.instagram.publish.photo({
      file,
      caption: description,
    });

    fs.unlinkSync(filePath);

    return ret;
  }

  async uploadStoryImage(filePath: string) {
    const file = fs.readFileSync(filePath);

    const ret = await this.instagram.publish.story({
      file,
    });

    fs.unlinkSync(filePath);

    return ret;
  }
}

export default PostsService;
