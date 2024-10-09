import Component from "flarum/common/Component";
import app from "flarum/forum/app";

export default class BountyTip extends Component<{
    number: number
}> {
    view(n: any) {
        const moneyName = app.forum.attribute<string>('antoinefr-money.moneyname') || '[money]';

        return <div className="BountyTip">
            <i class="fas fa-coins"></i>
            {app.translator.trans('xypp-answer-bounty.forum.tip', {
                money: moneyName.replace('[money]', this.attrs.number + ""),
                span: <span className="BountyTip-number" />
            })}
        </div>
    }
}