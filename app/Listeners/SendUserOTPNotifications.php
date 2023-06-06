<?php

namespace App\Listeners;

use App\Events\UserOneTimePassword;
use App\Notifications\OtpUser;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendUserOTPNotifications
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UserOneTimePassword $event): void
    {
        $event->user->notify(new OtpUser());
    }
}
