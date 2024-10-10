<?php

/*
 * This file is part of xypp/flarum-answer-bounty.
 *
 * Copyright (c) 2024 小鱼飘飘.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Xypp\AnswerBounty;

use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Discussion\Event\Saving;
use Flarum\Extend;
use Flarum\Http\RequestUtil;
use FoF\BestAnswer\Events\BestAnswerSet;
use FoF\BestAnswer\Events\BestAnswerUnset;
use Xypp\AnswerBounty\Listener\SavingDiscussionListener;
use Xypp\AnswerBounty\Listener\SetBestAnswerListener;
use Xypp\AnswerBounty\Listener\UnsetBestAnswerListener;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/less/admin.less'),
    new Extend\Locales(__DIR__ . '/locale'),
    (new Extend\Event)
        ->listen(BestAnswerSet::class, SetBestAnswerListener::class)
        ->listen(BestAnswerUnset::class, UnsetBestAnswerListener::class)
        ->listen(Saving::class, SavingDiscussionListener::class),
    (new Extend\ApiSerializer(DiscussionSerializer::class))
        ->attribute('xypp-answer-bounty-use', function (DiscussionSerializer $serializer, $model, $attrs) {
            return RequestUtil::getActor($serializer->getRequest())->can('xypp-answer-bounty-use', $model);
        })
        ->attribute('xypp-answer-bounty-moderate', function (DiscussionSerializer $serializer, $model, $attrs) {
            return RequestUtil::getActor($serializer->getRequest())->can('xypp-answer-bounty-moderate', $model);
        })
        ->attribute('bounty', function (DiscussionSerializer $serializer, $model, $attrs) {
            return $model->getAttribute('bounty');
        }),
];
