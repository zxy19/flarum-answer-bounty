import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';
import BountyTip from './components/BountyTip';

export default function addBountyTip() {
    extend(CommentPost.prototype, 'footerItems', function (items) {
        const thisPost = this.attrs.post;
        const discussion = thisPost.discussion();
        const hasBounty = (!(discussion as any).hasBestAnswer()) && discussion.attribute('bounty');

        if (hasBounty && thisPost.number() === 1 && !thisPost.isHidden()) {
            items.add('bountyTip', <BountyTip number={discussion.attribute("bounty")} />, 100000);
        }
    });
}