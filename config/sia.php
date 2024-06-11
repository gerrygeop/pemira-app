<?php

return [
    /*
    |--------------------------------------------------------------------------
    | SIA Login URL
    |--------------------------------------------------------------------------
    |
    | This value is the URL for the SIA login. This value is used when the
    | application needs to authenticate users through the SIA system.
    | Make sure to set this value in your ".env" file.
    |
    */

    'url_login' => env('SIA_URL_LOGIN'),

    /*
    |--------------------------------------------------------------------------
    | SIA Student Details URL
    |--------------------------------------------------------------------------
    |
    | This value is the URL for accessing detailed information about students
    | through the SIA system. This URL is used by the application to fetch
    | student data as needed. Make sure to set this value in your ".env" file.
    |
    */

    'url_detail_mhs' => env('SIA_URL_DETAIL_MHS'),

    /*
    |--------------------------------------------------------------------------
    | SIA API Key
    |--------------------------------------------------------------------------
    |
    | This value is the API key for accessing the SIA system's services.
    | This key should be stored securely and set in your ".env" file to
    | ensure proper authentication when making API requests.
    |
    */

    'api_key' => env('SIA_API_KEY'),

    /*
    |--------------------------------------------------------------------------
    | SIA Bearer Token
    |--------------------------------------------------------------------------
    |
    | This value is the bearer token used for authorization when making
    | requests to the SIA system's APIs. This token should be kept secure
    | and set in your ".env" file to ensure proper access control.
    |
    */

    'bearer_token' => env('SIA_BEARER_TOKEN'),
];
