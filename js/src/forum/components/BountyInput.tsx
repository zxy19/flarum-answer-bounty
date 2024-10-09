import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Stream from 'flarum/common/utils/Stream';
import app from 'flarum/forum/app';

export default class BountyInput extends Modal<{ onselect: (money: number|null) => void, current?: number } & IInternalModalAttrs> {
  money: Stream<number>;
  oninit(vnode: any) {
    super.oninit(vnode);
    this.money = new Stream(this.attrs.current || 0);
  }

  className() {
    return 'Modal Modal--small';
  }

  title() {
    return app.translator.trans('xypp-answer-bounty.forum.modal.title');
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label for="xypp-bounty-amount">{app.translator.trans('xypp-answer-bounty.forum.modal.label')}</label>
            <input id="xypp-bounty-amount" required className="FormControl" type="number" step="any" min="1" bidi={this.money} />
          </div>
          <div className="Form-group">
            {Button.component(
              {
                className: 'Button Button--primary',
                type: 'submit'
              },
              app.translator.trans('xypp-answer-bounty.forum.modal.submit')
            )}
            {Button.component(
              {
                className: 'Button Button--danger',
                onclick: (()=>{
                  this.attrs.onselect(null);
                  app.modal.close();
                }).bind(this),
              },
              app.translator.trans('xypp-answer-bounty.forum.modal.clear')
            )}
          </div>
        </div>
      </div>
    );
  }

  onsubmit(e: any) {
    e.preventDefault();
    this.attrs.onselect(this.money());
    app.modal.close();
  }
}