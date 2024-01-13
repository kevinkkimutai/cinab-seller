<?php

namespace App\Http\Controllers\Back;

use App\{
    Models\Slider,
    Repositories\Back\SliderRepository,
    Http\Requests\ImageStoreRequest,
    Http\Requests\ImageUpdateRequest,
    Http\Controllers\Controller
};
use Illuminate\Http\Request;

class SliderController extends Controller
{
    /**
     * Constructor Method.
     *
     * Setting Authentication
     *
     * @param  \App\Repositories\Back\SliderRepository $repository
     *
     */
    public function __construct(SliderRepository $repository)
    {
        $this->middleware('auth:admin');
        $this->middleware('adminlocalize');
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('back.slider.index',[
            'datas' => Slider::orderBy('id','desc')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('back.slider.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       
        $request->validate([
            'logo' => 'image',
            'photo' => 'required|image',
            'title' => 'required|max:100',
            'link' => 'required|max:255',
            'details' => 'required|max:255',
        ]);
        $this->repository->store($request);
        return redirect()->route('back.slider.index')->withSuccess(__('New Slider Added Successfully.'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Slider $slider)
    {
        return view('back.slider.edit',compact('slider'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ImageUpdateRequest $request, Slider $slider)
    {
        $request->validate([
            'title' => 'required|max:100',
            'link' => 'required|max:255',
            'logo' => 'image',
            'photo' => 'image',
            'details' => 'required|max:255',
        ]);
        $this->repository->update($slider, $request);
        return redirect()->route('back.slider.index')->withSuccess(__('Slider Updated Successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Slider $slider)
    {
        $this->repository->delete($slider);
        return redirect()->route('back.slider.index')->withSuccess(__('Slider Deleted Successfully.'));
    }
}
