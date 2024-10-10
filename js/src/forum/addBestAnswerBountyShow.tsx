import { extend } from "flarum/common/extend";
import Discussion from "flarum/common/models/Discussion";
import app from "flarum/forum/app";
import BountyAnswer from "./components/BountyAnswer";

export default function addBestAnswerBountyShow() {
    extend((flarum.extensions['fof-best-answer'] as any).components.SelectBestAnswerItem.prototype, "items", function (items: any) {
        if ((this.discussion as Discussion).attribute("bounty")) {
            items.add("bounty", <BountyAnswer number={(this.discussion as Discussion).attribute("bounty")} />)
        }
    });
}