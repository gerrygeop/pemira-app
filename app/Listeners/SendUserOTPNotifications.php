<?php

namespace App\Listeners;

use App\Events\UserOneTimePassword;
use App\Notifications\OtpUser;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

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
        try {
            $event->user->notify(new OtpUser());
        } catch (\Exception $e) {
            Log::error('Gagal mengirim email OTP: ' . $e->getMessage());
        }
    }
}
