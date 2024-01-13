<?php

namespace App\Http\Controllers\Back;

use Illuminate\Http\Request;

use App\{
    Models\Setting,
    Models\Language,
    Models\EmailTemplate,
    Http\Controllers\Controller,
    Http\Requests\SettingRequest,
    Repositories\Back\SettingRepository
};
use App\Models\ExtraSetting;

class SettingController extends Controller
{

    /**
     * Constructor Method.
     *
     * Setting Authentication
     *
     * @param  \App\Repositories\Back\SettingRepository $repository
     *
     */
    public function __construct(SettingRepository $repository)
    {
        $this->middleware('auth:admin');
        $this->middleware('adminlocalize');
        $this->repository = $repository;
    }

    /**
     * Show the form for updating resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function system()
    {

        return view('back.settings.system');
    }


    /**
     * Show the form for updating resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function menu()
    {

        return view('back.settings.menu');
    }

    /**
     * Show the form for updating resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function language()
    {
        $data = Language::first();
        $data_results = file_get_contents(resource_path().'/lang/'.$data->file);
        $lang = json_decode($data_results, true);
        return view('back.settings.language',compact('data','lang'));
    }

    /**
     * Show the form for updating resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function social()
    {
        return view('back.settings.social',[
            'google_url' => url('/auth/google/callback'),
            'facebook_url' => preg_replace("/^http:/i", "https:", url('/auth/facebook/callback'))
        ]);
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(SettingRequest $request)
    {
        $this->repository->update($request);
        return redirect()->back()->withSuccess(__('Data Updated Successfully.'));
    }


    public function section()
    {
        return view('back.settings.section');
    }

    public function visiable(Request $request)
    {

        $feilds = ['is_slider','is_three_c_b_first','is_popular_category','is_three_c_b_second','is_highlighted','is_two_column_category','is_popular_brand','is_featured_category','is_two_c_b','is_blogs','is_service','is_t2_slider','is_t2_service_section','is_t2_3_column_banner_first','is_t2_flashdeal','is_t2_new_product','is_t2_3_column_banner_second','is_t2_featured_product','is_t2_bestseller_product','is_t2_toprated_product','is_t2_2_column_banner','is_t2_blog_section','is_t2_brand_section','is_t3_slider','is_t3_service_section','is_t3_3_column_banner_first','is_t3_popular_category','is_t3_flashdeal','is_t3_3_column_banner_second','is_t3_pecialpick','is_t3_brand_section','is_t3_2_column_banner','is_t3_blog_section','is_t4_slider','is_t4_featured_banner','is_t4_specialpick','is_t4_3_column_banner_first','is_t4_flashdeal','is_t4_3_column_banner_second','is_t4_popular_category','is_t4_2_column_banner','is_t4_blog_section','is_t4_brand_section','is_t4_service_section', 'is_t1_falsh',
        'is_t2_falsh',
        'is_t3_falsh',
        'is_t2_three_column_category',
        'is_t3_three_column_category',
        ];


        $extrasetting = ExtraSetting::find(1);
        $setting = Setting::find(1);
     
        foreach($feilds as $field){
            if($request->has($field)){
                $setting_input[$field] = 1;
                $input[$field] = 1;
            }else{
                if($this->checkVisibaltyUrl(url()->previous())){
                 $input[$field] = 0;
                 $setting_input[$field] = 0;
                }
            }
        }


        $extrasetting->update($input);
        $setting->update($setting_input);

        return redirect()->back()->withSuccess(__('Data Updated Successfully.'));

    }

    public function checkVisibaltyUrl($url){
        $segment = explode('/',url()->previous());
        $value = end($segment);
        if($value == 'section'){
            return true;
        }else{
            return false;
        }
    }


    public function announcement(){
        return view('back.settings.announcement');
    }

    public function cookie(){
        return view('back.settings.cookie');
    }

    public function maintainance(){
        return view('back.settings.maintainance');
    }
}
