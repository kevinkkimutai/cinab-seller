<?php

namespace App\Repositories\Back;

use App\{
    Models\Post,
    Helpers\ImageHelper
};
use Illuminate\Support\Str;

class PostRepository
{

    /**
     * Store post.
     *
     * @param  \App\Http\Requests\ImageStoreRequest  $request
     * @return void
     */

    public function store($request)
    {
        $input = $request->all();
        $input['slug'] = Str::slug($request->title);
        if($request->has('tags')){
            $input['tags'] = str_replace(["value", "{", "}", "[","]",":","\""], '', $request->tags);
        }
        if($request->photo){
            $input['photo'] = json_encode($this->storeImageData($request),true);
        }
        
        
        Post::create($input);
    }

    /**
     * Update post.
     *
     * @param  \App\Http\Requests\ImageUpdateRequest  $request
     * @return void
     */

    public function update($post, $request)
    {
        $input = $request->all();
        $input['slug'] = Str::slug($request->title);
        if($request->has('tags')){
            $input['tags'] = str_replace(["value", "{", "}", "[","]",":","\""], '', $request->tags);
        }
        if($request->photo){
            $input['photo'] = json_encode($this->UpdateImageData($request,$post),true);
        }
        $post->update($input);
    }


    public function storeImageData($request)
    {
        
        $storeData = [];
        if ($photos = $request->file('photo')) {
            foreach($photos as $key => $photo){
                $storeData[$key] = ImageHelper::handleUploadedImage($photo,'assets/images');
            }
        }
        return $storeData;
    }

    public function UpdateImageData($request,$post)
    {
        
        $storeData = json_decode($post->photo,true);
        
        if ($photos = $request->file('photo')) {
            foreach($photos as $key => $photo){
                array_push($storeData,ImageHelper::handleUploadedImage($photo,'assets/images'));
            }
        }
        
        return $storeData;
    }


    /**
     * Delete post.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function delete($post)
    {
        $images = json_decode($post->photo,true);
        foreach($images as $image){
            //if (file_exists(base_path('../').'assets/images/'.$image)) {
            if (file_exists(public_path('/').'assets/images/'.$image)) {
              //  unlink(base_path('../').'assets/images/'.$image);
                unlink(public_path('/').'assets/images/'.$image);
            }
        }
        $post->delete();
    }

    /**
     * Delete post.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function photoDelete($key,$id)
    {
        $post = Post::findOrFail($id);
        $photos = json_decode($post->photo,true);
        $delete_photo = $photos[$key];
       // if (file_exists(base_path('../').'assets/images/'.$delete_photo)) {
        if (file_exists(public_path('/').'assets/images/'.$delete_photo)) {
          //  unlink(base_path('../').'assets/images/'.$delete_photo);
            unlink(public_path('/').'assets/images/'.$delete_photo);
        }
        
        unset($photos[$key]);
        $new_photos = json_encode($photos,true);
        $post->update(['photo'=> $new_photos]);
    }

}
