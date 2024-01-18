<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Activity;

class ActivityController extends Controller
{
    //
    public function getActivities()
    {
        $activities = Activity::all()->toJson(JSON_PRETTY_PRINT);
        return response($activities, 200);
    }

    public function createActivity(Request $request)
    {
        $activity = new Activity;
        $activity->title = $request->title;
        $activity->location = $request->location;
        $activity->activity_date = $request->activity_date;
        $activity->description = $request->description;
        $activity->small_description = $request->small_description;
        $activity->publication_date = $request->publication_date;
        $activity->save();

        return response()->json([
            "message" => "Activity created"
        ], 201);
    }

    public function getActivity($id)
    {
        if (Activity::where('id', $id)->exists()) {
            $activity = Activity::find($id);
            return response()->json($activity, 200);
        } else {
            return response()->json([
                "message" => "Activity not found"
            ], 404);
        }
    }   

    public function updateActivity(Request $request, $id)
    {
        if (Activity::where('id', $id)->exists()) {
            $activity = Activity::find($id);
            $activity->title = is_null($request->title) ? $activity->title : $request->title;
            $activity->location = is_null($request->location) ? $activity->location : $request->location;
            $activity->activity_date = is_null($request->activity_date) ? $activity->activity_date : $request->activity_date;
            $activity->description = is_null($request->description) ? $activity->description : $request->description;
            $activity->small_description = is_null($request->small_description) ? $activity->small_description : $request->small_description;
            $activity->publication_date = is_null($request->publication_date) ? $activity->publication_date : $request->publication_date;
            $activity->save();

            return response()->json([
                "message" => "Activity updated successfully"
            ], 200);
        } else {
            return response()->json([
                "message" => "Activity not found"
            ], 404);
        }
    }

    public function deleteActivity ($id)
    {
        if(Activity::where('id', $id)->exists()) {
            $activity = Activity::find($id);
            $activity->delete();

            return response()->json([
              "message" => "Activity deleted"
            ], 202);
        } else {
            return response()->json([
              "message" => "Activity not found"
            ], 404);
        }
    }
}
