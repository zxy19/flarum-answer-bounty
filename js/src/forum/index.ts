import app from 'flarum/forum/app';
import addHeaderItem from './addHeaderItem';
import addDiscussionAction from './addDiscussionAction';
import addBountyTip from './addBountyTip';
import addBadge from './addBadge';
import addBestAnswerBountyShow from './addBestAnswerBountyShow';

app.initializers.add('xypp/flarum-answer-bounty', () => {
  addHeaderItem();
  addDiscussionAction();
  addBountyTip();
  addBadge();
  addBestAnswerBountyShow();
});
