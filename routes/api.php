<?php

use App\Http\Controllers\Api\BookableAvailabilityController;
use App\Http\Controllers\Api\BookableController;
use App\Http\Controllers\Api\BookablePriceController;
use App\Http\Controllers\Api\BookableReviewController;
use App\Http\Controllers\Api\BookingByReviewController;
use App\Http\Controllers\Api\CheckoutController;
use App\Http\Controllers\Api\ReviewController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('bookables', function(request $request){
//     return Bookable::all();
// });

// Route::get('bookables/{id}', function(request $request, $id){
//     return Bookable::findOrFail($id);
// });

// Route::get('bookables', [BookableController::class,'index']);
// Route::get('bookables/{id}', [BookableController::class,'show']);

Route::apiResource('bookables',BookableController::class)->only(['index','show']);
Route::get('bookables/{id}/availability',BookableAvailabilityController::class)->name('bookable.availability.show');
Route::get('bookables/{bookable_id}/reviews', BookableReviewController::class)->name('bookable.reviews.index');
Route::get('bookables/{bookableId}/price', BookablePriceController::class)->name('bookable.price.show');

Route::get('/booking-by-review/{reviewKey}', BookingByReviewController::class)->name('booking.by-review.show');

Route::apiResource('reviews',ReviewController::class)->only(['show','store']);

Route::post('checkout', CheckoutController::class)->name('checkout');

    