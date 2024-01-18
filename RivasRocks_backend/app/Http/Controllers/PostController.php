<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    //
    public function getPosts()
    {
        $posts = Post::all()->toJson(JSON_PRETTY_PRINT);
        return response($posts, 200);
    }

    public function createPost(Request $request)
    {
        $post = new Post;
        $post->title = $request->title;
        $post->description = $request->description;
        $post->small_description = $request->small_description;
        $post->publication_date = $request->publication_date;
        $post->save();

        return response()->json([
            "message" => "Post created"
        ], 201);
    }

    public function getPost($id)
    {
        if (Post::where('id', $id)->exists()) {
            $post = Post::find($id);
            return response()->json($post, 200);
        } else {
            return response()->json([
                "message" => "Post not found"
            ], 404);
        }
    }

    public function updatePost(Request $request, $id)
    {
        if (Post::where('id', $id)->exists()) {
            $post = Post::find($id);
            $post->title = is_null($request->title) ? $post->title : $request->title;
            $post->description = is_null($request->description) ? $post->description : $request->description;
            $post->small_description = is_null($request->small_description) ? $post->small_description : $request->small_description;
            $post->publication_date = is_null($request->publication_date) ? $post->publication_date : $request->publication_date;
            $post->save();

            return response()->json([
                "message" => "Post updated successfully"
            ], 200);
        } else {
            return response()->json([
                "message" => "Post not found"
            ], 404);
        }
    }

    public function deletePost($id)
    {
        if (Post::where('id', $id)->exists()) {
            $post = Post::find($id);
            $post->delete();

            return response()->json([
                "message" => "Post deleted"
            ], 202);
        } else {
            return response()->json([
                "message" => "Post not found"
            ], 404);
        }
    }


}
