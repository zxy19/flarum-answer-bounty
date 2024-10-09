import app from 'flarum/admin/app';

app.initializers.add('xypp/flarum-answer-bounty', () => {
  app.extensionData.for('xypp-answer-bounty')
    .registerPermission({
      permission: 'discussion.xypp-answer-bounty-use',
      label: app.translator.trans('xypp-answer-bounty.admin.permissions.use'),
      icon: 'fas fa-coins'
    }, "start")
    .registerPermission({
      permission: 'discussion.xypp-answer-bounty-moderate',
      label: app.translator.trans('xypp-answer-bounty.admin.permissions.moderate'),
      icon: 'fas fa-coins'
    }, "moderate")
});
