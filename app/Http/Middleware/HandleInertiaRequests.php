<?php

namespace App\Http\Middleware;

use App\Http\Resources\AdminResource;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    public function getShareUser($request)
    {
        if ($request->user()) {
            if (auth()->guard()->name === 'admin') {
                return new AdminResource($request->user());
            } else {
                return $request->user()->only('id', 'name', 'nim', 'email');
            }
        } else {
            return null;
        }
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $this->getShareUser($request),
                'guard' => auth()->guard()->name,

            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }
}
