<?php

namespace Xypp\AnswerBounty\Listener;
use Flarum\Locale\Translator;
use Flarum\User\User;
use FoF\BestAnswer\Events\BestAnswerSet;
use Illuminate\Contracts\Events\Dispatcher;

class SetBestAnswerListener
{
    protected $events;
    protected $translator;
    public function __construct(Dispatcher $events, Translator $translator)
    {
        $this->events = $events;
        $this->translator = $translator;
    }
    public function __invoke(BestAnswerSet $event)
    {
        $bounty = $event->discussion->getAttribute("bounty");
        if ($bounty) {
            User::lockForUpdate()->where('id', $event->post->user_id)->increment('money', $bounty);

            if (class_exists(\Mattoid\MoneyHistory\Event\MoneyHistoryEvent::class)) {
                $this->events->dispatch(new \Mattoid\MoneyHistory\Event\MoneyHistoryEvent(
                    $event->post->user,
                    $bounty,
                    'bounty_received',
                    $this->translator->trans('xypp-answer-bounty.api.bounty')
                ));
            }
            $event->discussion->setAttribute("bounty", null);
            $event->discussion->save();
        }
    }
}