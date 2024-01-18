<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\UserXActivityController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'getUser']);

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
//User
Route::post('login', [AuthController::class, 'login']);
Route::post('register',[AuthController::class, 'register']);
Route::get('user', [AuthController::class, 'getUser']);
Route::put('updateuser/{id}', [AuthController::class, 'updateUser']);
//Post
Route::get('posts', [PostController::class, 'getPosts']);
Route::get('post/{id}', [PostController::class, 'getPost']);
Route::post('createpost', [PostController::class, 'createPost']);
Route::put('updatepost/{id}', [PostController::class, 'updatePost']);
Route::delete('deletepost/{id}', [PostController::class, 'deletePost']);
//Activity
Route::get('activities', [ActivityController::class, 'getActivities']);
Route::get('activity/{id}', [ActivityController::class, 'getActivity']);
Route::post('createactivity', [ActivityController::class, 'createActivity']);
Route::put('updateactivity/{id}', [ActivityController::class, 'updateActivity']);
Route::delete('deleteactivity/{id}', [ActivityController::class, 'deleteActivity']);
// Route::get('getactivitiesbyids', [ActivityController::class, 'getActivitiesByIds']);
//UserXActivity
Route::post('adduser', [UserXActivityController::class, 'addUser']);
Route::post('removeuser', [UserXActivityController::class, 'removeUser']);
Route::get('getusersbyactivity/{id}', [UserXActivityController::class, 'getUsersByActivity']);
Route::get('getactivitiesbyuser/{id}', [UserXActivityController::class, 'getActivitiesByUserId']);


// Route::group([

//     'middleware' => 'api',

// ], function () {

//     Route::post('login', [AuthController::class, 'login']);
//     Route::post('register',[AuthController::class, 'register']);
//     Route::get('posts', [PostController::class, 'getPosts']);
//     Route::get('post/{id}', [PostController::class, 'getPost']);
//     Route::post('createpost', [PostController::class, 'createPost']);
//     Route::put('updatepost/{id}', [PostController::class, 'updatePost']);
//     Route::delete('deletepost/{id}', [PostController::class, 'deletePost']);

// });

