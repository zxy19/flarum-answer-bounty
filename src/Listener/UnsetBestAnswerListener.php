<?php

namespace Xypp\AnswerBounty\Listener;
use Flarum\Locale\Translator;
use Flarum\User\User;
use FoF\BestAnswer\Events\BestAnswerUnset;
use Illuminate\Contracts\Events\Dispatcher;

class UnsetBestAnswerListener
{
    protected $events;
    protected $translator;
    public function __construct(Dispatcher $events, Translator $translator)
    {
        $this->events = $events;
        $this->translator = $translator;
    }
    public function __invoke(BestAnswerUnset $event)
    {
        $bounty = $event->discussion->getAttribute("bounty");
        if ($bounty) {
            $event->discussion->setAttribute("bounty", null);
            $event->discussion->save();
        }
    }
}