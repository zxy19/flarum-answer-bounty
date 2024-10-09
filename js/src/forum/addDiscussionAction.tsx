import app from 'flarum/forum/app';
import DiscussionControls from 'flarum/forum/utils/DiscussionControls';
import { extend } from 'flarum/common/extend';
import Button from 'flarum/common/components/Button';
import BountyInput from './components/BountyInput';

export default function addDiscussionAction() {
    extend(DiscussionControls, 'moderationControls', function (items, discussion) {
        const discussionUser = discussion.user();
        const currentUser = app.session?.user;
        let show = false;
        if (currentUser && discussionUser && currentUser.id() !== discussionUser.id()) {
            if (discussion.attribute("xypp-answer-bounty-moderate")) {
                show = true;
            }
        } else if (discussion.attribute("xypp-answer-bounty-use")) {
            show = true;
        }

        if (show) {
            items.add('fingerprint-recorder-fingerprint', Button.component({
                icon: 'fas fa-users-cog',
                className: 'Button Button--link',
                onclick: () => {
                    app.modal.show(BountyInput, {
                        current: discussion.attribute("bounty") || 1,
                        onselect: (money: number) => {
                            discussion.save({
                                bounty: money
                            });
                        }
                    });
                }
            },
                app.translator.trans('xypp-answer-bounty.forum.discussion.' + (discussion.attribute("bounty") ? "edit" : "set"), {
                    bounty: discussion.attribute("bounty")
                }))
            )
        }
    });
}