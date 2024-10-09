import app from 'flarum/forum/app';

import { extend } from 'flarum/common/extend';
import classList from 'flarum/common/utils/classList';
import DiscussionComposer from 'flarum/forum/components/DiscussionComposer';
import ReplyComposer from 'flarum/forum/components/ReplyComposer';
import ComposerBody from 'flarum/forum/components/ComposerBody';
import Model from 'flarum/common/Model';
import BountyInput from './components/BountyInput';

function makeComposerBountyInput(composer: ComposerBody) {
    return () => {
        app.modal.show(BountyInput, {
            current: composer.composer.fields.bounty || 1,
            onselect: (money: number | undefined) => {
                if (!money)
                    delete composer.composer.fields.bounty;
                else
                    composer.composer.fields.bounty = money;
            }
        });
    };
}
export const addToComposer = (composer: any) => {
    extend(composer.prototype, 'headerItems', function (this: ComposerBody, items) {
        const isQACurrent = !!(this.composer?.fields?.tags && this.composer.fields.tags.find((e: Model) => e.attribute<boolean>("isQnA")));

        if (isQACurrent) {
            items.add(
                'bounty',
                <a className="ComposerBody-bounty" onclick={makeComposerBountyInput(this)}>
                    <span className={classList('BountyLabel', !this.composer.fields.bounty && 'none')}>
                        {app.translator.trans(`xypp-answer-bounty.forum.composer.${this.composer?.fields?.bounty ? 'edit' : 'set'}`, {
                            bounty: this.composer?.fields?.bounty
                        })}
                    </span>
                </a>,
                1
            );
        }
    });

    extend(composer.prototype, 'data', function (data) {
        if (this.composer?.fields?.bounty) {
            data.bounty = this.composer?.fields?.bounty;
        }
    });
};

export default () => {
    addToComposer(DiscussionComposer);
};