import app from 'flarum/forum/app';

import { extend } from 'flarum/common/extend';
import Badge from 'flarum/common/components/Badge';
import DiscussionList from 'flarum/forum/components/DiscussionList';
import Discussion from 'flarum/common/models/Discussion';

export default () => {
  extend(Discussion.prototype, 'badges', function (badges) {
    if (this.attribute('bounty')) {
      badges.add(
        'bounty',
        Badge.component({
          type: 'bounty',
          label: app.translator.trans('xypp-answer-bounty.forum.badge'),
          icon: 'fas fa-coins',
        }),
        5
      );
    }
  });
};