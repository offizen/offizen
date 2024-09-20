<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    /** @var \App\Models\User $user */
    $user = $request->user();

    cookie('permissions', json_encode($user->getAllPermissions()));

    return $request->user();
});
