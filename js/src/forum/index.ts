import app from 'flarum/forum/app';
import addHeaderItem from './addHeaderItem';
import addDiscussionAction from './addDiscussionAction';
import addBountyTip from './addBountyTip';

app.initializers.add('xypp/flarum-answer-bounty', () => {
  addHeaderItem();
  addDiscussionAction();
  addBountyTip();
});
