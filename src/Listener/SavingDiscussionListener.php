<?php

namespace Xypp\AnswerBounty\Listener;
use Flarum\Discussion\Event\Saving;
use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use Flarum\User\User;
use Illuminate\Support\Arr;
use Illuminate\Contracts\Events\Dispatcher;

class SavingDiscussionListener
{
    protected $translator;
    protected $events;
    public function __construct(Translator $translator, Dispatcher $events)
    {
        $this->translator = $translator;
        $this->events = $events;
    }
    public function __invoke(Saving $event)
    {
        if (Arr::has($event->data, 'attributes.bounty')) {
            $user = $event->discussion->user;

            // Check permission
            if ($user->id != $event->actor->id) {
                $event->actor->assertCan('xypp-answer-bounty-moderate', $event->discussion);
            } else {
                $event->actor->assertCan('xypp-answer-bounty-use', $event->discussion);
            }

            // Safety check
            $bounty = Arr::get($event->data, 'attributes.bounty', null);
            if (!is_null($bounty)) {
                $bounty = intval($bounty);
                if ($bounty <= 0)
                    $bounty = null;
            }

            // Refund previous bounty if any
            $originalBounty = $event->discussion->getAttribute('bounty');
            if ($originalBounty) {
                User::lockForUpdate()->where('id', $user->id)->increment('money', $originalBounty);
                $user->refresh();
                if (class_exists(\Mattoid\MoneyHistory\Event\MoneyHistoryEvent::class)) {
                    $this->events->dispatch(new \Mattoid\MoneyHistory\Event\MoneyHistoryEvent(
                        $user,
                        $originalBounty,
                        'bounty_clear',
                        $this->translator->trans('xypp-answer-bounty.api.bounty_clear')
                    ));
                }
            }

            // Set new bounty, cost money
            if ($bounty) {
                if ($user->money < $bounty) {
                    throw new ValidationException(['bounty' => $this->translator->trans('xypp-answer-bounty.api.not_enough_money')]);
                }

                User::lockForUpdate()->where('id', $user->id)->decrement('money', $bounty);

                if (class_exists(\Mattoid\MoneyHistory\Event\MoneyHistoryEvent::class)) {
                    $this->events->dispatch(new \Mattoid\MoneyHistory\Event\MoneyHistoryEvent(
                        $user,
                        $bounty,
                        'bounty_set',
                        $this->translator->trans('xypp-answer-bounty.api.bounty_set')
                    ));
                }
            }

            $event->discussion->setAttribute('bounty', $bounty);
        }
    }
}