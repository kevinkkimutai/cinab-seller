<?php

namespace App\Repositories\Back;

use App\{
    Models\Slider,
    Helpers\ImageHelper
};

class SliderRepository
{

    /**
     * Store slider.
     *
     * @param  \App\Http\Requests\ImageStoreRequest  $request
     * @return void
     */

    public function store($request)
    {
        $input = $request->all();
        $input['photo'] = ImageHelper::handleUploadedImage($request->file('photo'),'assets/images');
        $input['logo'] = ImageHelper::handleUploadedImage($request->file('logo'),'assets/images');
        Slider::create($input);
    }

    /**
     * Update slider.
     *
     * @param  \App\Http\Requests\ImageUpdateRequest  $request
     * @return void
     */

    public function update($slider, $request)
    {
        $input = $request->all();
        if ($file = $request->file('photo')) {
            $input['photo'] = ImageHelper::handleUpdatedUploadedImage($file,'/assets/images/',$slider,'/assets/images/','photo');
        }
        if ($file = $request->file('logo')) {
            $input['logo'] = ImageHelper::handleUpdatedUploadedImage($file,'/assets/images/',$slider,'/assets/images/','logo');
        }
        $slider->update($input);
    }

    /**
     * Delete slider.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function delete($slider)
    {
        ImageHelper::handleDeletedImage($slider,'photo','assets/images/');
        ImageHelper::handleDeletedImage($slider,'logo','assets/images/');
        $slider->delete();
    }

}
