<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserXActivity;
use App\Models\Activity;
use Illuminate\Support\Facades\DB;

class UserXActivityController extends Controller
{
    //
    public function addUser(Request $request)
    {
        $useXactivitytemp = UserXActivity::where('user_id', $request->user_id)
                        ->where('activity_id', $request->activity_id)
                        ->first();
        if(!$useXactivitytemp) {
            $userXactivity = new UserXActivity;

            $userXactivity->user_id = $request->user_id;
            $userXactivity->activity_id = $request->activity_id;

            $userXactivity->save();

            return response()->json([
                'message' => 'Successfully added user to activity',
                'userXactivity' => $userXactivity
            ]);
        }else{
            return response()->json([
                'message' => 'User already added to activity'
            ]);
        }
        
    }

    public function removeUser(Request $request )
    {
        $userXactivity = UserXActivity::where('user_id', $request->user_id)
                                    ->where('activity_id', $request->activity_id)
                                    ->first();

        if ($userXactivity) {
            $userXactivity->delete();
            return response()->json([
                'message' => 'Successfully removed user from activity'
            ]);
        } else {
            return response()->json([
                'message' => 'No matching record found'
            ]);
        }
    }

    public function getUsersByActivity($id)
    {
        // $userXactivities = UserXActivity::where('activity_id', $id)->get();

        // if ($userXactivities->isEmpty()) {
        //     return response()->json([
        //         'message' => 'No matching records found'
        //     ], 404);
        // } else {
        //     $user_ids = $userXactivities->pluck('user_id');
        //     return response()->json([
        //         'user_ids' => $user_ids
        //     ]);
        // }

        $users = DB::table('users')
        ->join('user_x_activity', 'users.id', '=', 'user_x_activity.user_id')
        ->where('user_x_activity.activity_id', $id)
        ->select('users.*')
        ->get();

        return response()->json($users, 200);
    } 

    public function getActivitiesByUserId($id)
    {
        $activities = DB::table('activities')
            ->join('user_x_activity', 'activities.id', '=', 'user_x_activity.activity_id')
            ->where('user_x_activity.user_id', $id)
            ->select('activities.*')
            ->get();

        return response()->json($activities, 200);
    }


}
