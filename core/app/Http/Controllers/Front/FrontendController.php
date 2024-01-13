<?php

namespace App\Http\Controllers\Front;

use Illuminate\{
    Http\Request,
    Support\Facades\Session
};

use App\{
    Models\Item,
    Models\Setting,
    Models\Subscriber,
    Helpers\EmailHelper,
    Http\Controllers\Controller,
    Http\Requests\ReviewRequest,
    Http\Requests\SubscribeRequest,
    Repositories\Front\FrontRepository
};
use App\Helpers\SmsHelper;
use App\Models\Brand;
use App\Models\CampaignItem;
use App\Models\Category;
use App\Models\ChieldCategory;
use App\Models\Fcategory;
use App\Models\HomeCutomize;
use App\Models\Order;
use App\Models\Language;
use App\Models\Post;
use App\Models\Service;
use App\Models\Slider;
use App\Models\Subcategory;
use App\Models\TrackOrder;
use Carbon\Carbon;
use Illuminate\Support\Facades\Config;

use function GuzzleHttp\json_decode;

class FrontendController extends Controller
{

    /**
     * Constructor Method.
     *
     * @param  \App\Repositories\Front\FrontRepository $repository
     *
     */
    public function __construct(FrontRepository $repository)
    {
        $this->repository = $repository;
        $setting = Setting::first();
        if($setting->recaptcha == 1){
            Config::set('captcha.sitekey', $setting->google_recaptcha_site_key);
            Config::set('captcha.secret', $setting->google_recaptcha_secret_key);
        }

        $this->middleware('localize');

    }

// -------------------------------- HOME ----------------------------------------

	public function index()
	{
       
      
        $setting = Setting::first();


            $home_customize = HomeCutomize::first();

            // feature category
            $feature_category_ids = json_decode($home_customize->feature_category,true);
            $feature_category_title = $feature_category_ids['feature_title'];
            $feature_category = [];
                for($i=1;$i<=4;$i++){
                    if(!in_array($feature_category_ids['category_id'.$i],$feature_category)){
                        if($feature_category_ids['category_id'.$i]){
                            $feature_category[] = $feature_category_ids['category_id'.$i];
                        }
                    }
                }

            $feature_categories = [];
            foreach($feature_category as $key => $cat){
                $feature_categories[] = Category::findOrFail($cat);
            }
            $feature_category_items = [];
            if(count($feature_categories)){
                $index = '';
                foreach($feature_categories as $key => $data){
                   if($data->id == $feature_category_ids['category_id1']){
                       $index = $key;
                   }
                }

                $category = $feature_categories[$index]->id;
                $subcategory = $feature_category_ids['subcategory_id1'];
                $childcategory = $feature_category_ids['childcategory_id1'];

                $feature_category_items = Item::when($category, function ($query, $category) {
                    return $query->where('category_id', $category);
                })
                ->when($subcategory, function ($query, $subcategory) {
                    return $query->where('subcategory_id', $subcategory);
                })
                ->when($childcategory, function ($query, $childcategory) {
                    return $query->where('childcategory_id', $childcategory);
                })
                ->whereStatus(1)->take(10)->orderby('id','desc')->get();
            }


            // feature category end
            $home_customize = HomeCutomize::first();
            // popular category

            $popular_category_ids = json_decode($home_customize->popular_category,true);
            $popular_category_title = $popular_category_ids['popular_title'];

            $popular_category = [];
                for($i=1;$i<=4;$i++){
                    if(!in_array($popular_category_ids['category_id'.$i],$popular_category)){
                        if($popular_category_ids['category_id'.$i]){
                            $popular_category[] = $popular_category_ids['category_id'.$i];
                        }
                    }
                }
                $popular_categories = [];
                foreach($popular_category as $key => $cat){
                    $popular_categories[] = Category::findOrFail($cat);
                }

            $popular_category_items = [];

            if(count($popular_categories) > 0){
                $index = '';
                foreach($popular_categories as $key => $data){
                   if($data->id == $popular_category_ids['category_id1']){
                       $index = $key;
                   }
                }
            $pupular_cateogry_home4 = null;
            if($setting->theme == 'theme4'){
                $pupular_cateogries_home4 = json_decode($home_customize->home_4_popular_category,true);
                $pupular_cateogry_home4 = [];
                foreach($pupular_cateogries_home4 as $home4category){
                    $pupular_cateogry_home4[] = Category::with('items')->findOrFail($home4category);
                }
            }

            // dd($pupular_cateogry_home4);
            $category = $popular_categories[$index]->id;
            $subcategory = $popular_category_ids['subcategory_id1'];
            $childcategory = $popular_category_ids['childcategory_id1'];

            $popular_category_items = Item::when($category, function ($query, $category) {
                return $query->where('category_id', $category);
            })
            ->when($subcategory, function ($query, $subcategory) {
                return $query->where('subcategory_id', $subcategory);
            })
            ->when($childcategory, function ($query, $childcategory) {
                return $query->where('childcategory_id', $childcategory);
            })
            ->whereStatus(1)->get();
            }




            // two column category
            $two_column_category_ids = json_decode($home_customize->two_column_category,true);

            $two_column_category = [];
                for($i=1;$i<=3;$i++){
                    if(isset($two_column_category_ids['category_id'.$i]) && !in_array($two_column_category_ids['category_id'.$i],$two_column_category)){
                        if($two_column_category_ids['category_id'.$i]){
                            $two_column_category[] = $two_column_category_ids['category_id'.$i];
                        }
                    }
                }

            $two_column_categories = Category::whereStatus(1)->whereIn('id',$two_column_category)->orderby('id','desc')->get();

            $two_column_category_items1 = [];
            if($two_column_category_ids['category_id1']){
                $two_column_category_items1 = Item::where('category_id',$two_column_category_ids['category_id1'])->orderby('id','desc')->whereStatus(1)->take(10)->get();
            }
            if($two_column_category_ids['subcategory_id1']){
                $two_column_category_items1 = Item::where('subcategory_id',$two_column_category_ids['subcategory_id1'])->whereStatus(1)->where('category_id',$two_column_category_ids['category_id1'])->orderby('id','desc')->take(10)->get();
            }
            if($two_column_category_ids['childcategory_id1']){
                $two_column_category_items1 = Item::where('childcategory_id',$two_column_category_ids['childcategory_id1'])->whereStatus(1)->where('category_id',$two_column_category_ids['category_id1'])->orderby('id','desc')->take(10)->get();
            }

            $two_column_category_items2 = [];
            if($two_column_category_ids['category_id2']){
                $two_column_category_items2 = Item::where('category_id',$two_column_category_ids['category_id2'])->orderby('id','desc')->whereStatus(1)->take(10)->get();
            }
            if($two_column_category_ids['subcategory_id2']){
                $two_column_category_items2 = Item::where('subcategory_id',$two_column_category_ids['subcategory_id2'])->whereStatus(1)->where('category_id',$two_column_category_ids['category_id2'])->orderby('id','desc')->take(10)->get();
            }
            if($two_column_category_ids['childcategory_id2']){
                $two_column_category_items2 = Item::where('childcategory_id',$two_column_category_ids['childcategory_id2'])->whereStatus(1)->where('category_id',$two_column_category_ids['category_id2'])->orderby('id','desc')->take(10)->get();
            }

            $two_column_category_items3 = [];
            if(isset($two_column_category_ids['category_id3'])){
                if($two_column_category_ids['category_id3']){
                $two_column_category_items3 = Item::where('category_id',$two_column_category_ids['category_id3'])->orderby('id','desc')->whereStatus(1)->take(10)->get();
            }
            if($two_column_category_ids['subcategory_id3']){
                $two_column_category_items3 = Item::where('subcategory_id',$two_column_category_ids['subcategory_id3'])->whereStatus(1)->where('category_id',$two_column_category_ids['category_id3'])->orderby('id','desc')->take(10)->get();
            }
            if($two_column_category_ids['childcategory_id3']){
                $two_column_category_items3 = Item::where('childcategory_id',$two_column_category_ids['childcategory_id3'])->whereStatus(1)->where('category_id',$two_column_category_ids['category_id3'])->orderby('id','desc')->take(10)->get();
            }
            }
            



            $two_column_categoriess = [];
            foreach($two_column_categories as $key => $two_category){
                if($key ==0){
                    $two_column_categoriess[$key] ['name'] = $two_category;
                    $two_column_categoriess[$key] ['items'] = $two_column_category_items1;
                }elseif($key==1){
                    $two_column_categoriess[$key] ['name'] = $two_category;
                    $two_column_categoriess[$key] ['items'] = $two_column_category_items2;
                }else{
                    $two_column_categoriess[$key] ['name'] = $two_category;
                    $two_column_categoriess[$key] ['items'] = $two_column_category_items3;
                }

            }


            if($setting->theme == 'theme1'){
                $sliders = Slider::where('home_page','theme1')->get();
            }elseif($setting->theme == 'theme2'){
                $sliders = Slider::where('home_page','theme2')->get();
            }elseif($setting->theme == 'theme3'){
                $sliders = Slider::where('home_page','theme3')->get();
            }else{
                $sliders = Slider::where('home_page','theme4')->get();
            }


            // {"title1":"Watchtt","subtitle1":"50% OFF","url1":"#","title2":"Man","subtitle2":"40% OFF","url2":"#","img1":"1637766462banner-h2-4-1.jpeg","img2":"1637766420banner-h2-4-1.jpeg"}

            return view('front.index',[
                'hero_banner'   => $home_customize->hero_banner != '[]' ? json_decode($home_customize->hero_banner,true) : null,
                'banner_first'   => json_decode($home_customize->banner_first,true),
                'sliders'  => $sliders,
                'campaign_items' => CampaignItem::with('item')->whereStatus(1)->whereIsFeature(1)->orderby('id','desc')->get(),
                'services' => Service::orderby('id','desc')->get(),
                'posts'    => Post::with('category')->orderby('id','desc')->take(8)->get(),
                'brands'   => Brand::whereStatus(1)->get(),
                'banner_secend'  => json_decode($home_customize->banner_secend,true),
                'banner_third'   => json_decode($home_customize->banner_third,true),
                'brands'   => Brand::whereStatus(1)->whereIsPopular(1)->get(),
                'products' => Item::with('category')->whereStatus(1),
                'home_page4_banner' => json_decode($home_customize->home_page4,true),
                'pupular_cateogry_home4' => isset($pupular_cateogry_home4) ? $pupular_cateogry_home4 : [],
                // feature category
                'feature_category_items' => $feature_category_items,
                'feature_categories' => $feature_categories,
                'feature_category_title' => $feature_category_title,

                // feature category
                'popular_category_items' => $popular_category_items,
                'popular_categories' => $popular_categories,
                'popular_category_title' => $popular_category_title,

                // two column category
                'two_column_categoriess' => $two_column_categoriess,

            ]);
	}



    public function review_submit(){
        return view('back.overlay.index');
    }

    public function slider_o_update(Request $request){
        $setting = Setting::find(1);
        $setting->overlay = $request->slider_overlay;
        $setting->save();
        return redirect()->back();
    }


    public function product($slug)
    {

        $item = Item::with('category')->whereStatus(1)->whereSlug($slug)->firstOrFail();
        $video = explode('=',$item->video);
        return view('front.catalog.product',[
            'item'          => $item,
            'reviews'       => $item->reviews()->where('status',1)->paginate(3),
            'galleries'     => $item->galleries,
            'video'         => $item->video ? end($video) : '',
            'sec_name'      => isset($item->specification_name) ? json_decode($item->specification_name,true) : [],
            'sec_details'   => isset($item->specification_description) ? json_decode($item->specification_description,true) : [],
            'attributes'    => $item->attributes,
            'related_items' => $item->category->items()->whereStatus(1)->where('id','!=',$item->id)->take(8)->get()
        ]);
    }



    public function brands()
    {
        if(Setting::first()->is_brands == 0){
            return back();
        }
        return view('front.brand',[
            'brands' => Brand::whereStatus(1)->get()
        ]);
    }


	public function blog(Request $request)
	{

        $tagz = '';
        $tags = null;
        $name = Post::pluck('tags')->toArray();
        foreach($name as $nm)
        {
            $tagz .= $nm.',';
        }
        $tags = array_unique(explode(',',$tagz));

        if(Setting::first()->is_blog == 0) return back();

        if($request->ajax()) return view('front.blog.list',['posts' => $this->repository->displayPosts($request)]);

		return view('front.blog.index',['posts' => $this->repository->displayPosts($request),
        'recent_posts'       => Post::orderby('id','desc')->take(4)->get(),
        'categories' => \App\Models\Bcategory::withCount('posts')->whereStatus(1)->get(),
        'tags'       => array_filter($tags)
        ]);


	}

    public function blogDetails($id)
    {
        $items = $this->repository->displayPost($id);

        return view('front.blog.show',[
            'post' => $items['post'],
            'categories' => $items['categories'],
            'tags' => $items['tags'],
            'posts' => $items['posts'],

        ]);
    }


// -------------------------------- FAQ ----------------------------------------

	public function faq()
	{
        if(Setting::first()->is_faq == 0){
            return back();
        }
        $fcategories =  Fcategory::whereStatus(1)->withCount('faqs')->latest('id')->get();
		return view('front.faq.index',['fcategories' => $fcategories]);
	}

	public function show($slug)
	{
        if(Setting::first()->is_faq == 0){
            return back();
        }
        $category =  Fcategory::whereSlug($slug)->first();
		return view('front.faq.show',['category' => $category]);
	}

// -------------------------------- FAQ ----------------------------------------

// -------------------------------- CAMPAIGN ----------------------------------------

	public function compaignProduct()
	{
        if(Setting::first()->is_campaign == 0){
            return back();
        }
        $compaign_items =  CampaignItem::whereStatus(1)->orderby('id','desc')->get();
		return view('front.campaign',['campaign_items' => $compaign_items]);
	}

// -------------------------------- CAMPAIGN ----------------------------------------


// -------------------------------- CURRENCY ----------------------------------------
    public function currency($id){
        Session::put('currency',$id);
        return back();
    }
// -------------------------------- CURRENCY ----------------------------------------


// -------------------------------- LANGUAGE ----------------------------------------
    public function language($id){
        Session::put('language',$id);
        return back();
    }
// -------------------------------- LANGUAGE ----------------------------------------


// -------------------------------- FAQ ----------------------------------------

public function page($slug)
{
    return view('front.page',[
        'page' => $this->repository->displayPage($slug)
    ]);
}

// -------------------------------- CONTACT ----------------------------------------

	public function contact()
	{
        if(Setting::first()->is_contact == 0){
            return back();
        }
		return view('front.contact');
	}

    public function contactEmail(Request $request)
    {
        $request->validate([
            'first_name' => 'required|max:50',
            'last_name' => 'required|max:50',
            'email' => 'required|email|max:50',
            'phone' => 'required|max:50',
            'message' => 'required|max:250',
        ]);
        $input = $request->all();

        $setting = Setting::first();
        $name  = $input['first_name'].' '.$input['last_name'];
        $subject = "Email From ".$name;
        $to = $setting->contact_email;
        $phone = $request->phone;
        $from = $request->email;
        $msg = "Name: ".$name."<br/>Email: ".$from."<br/>Phone: ".$phone."<br/>Message: ".$request->message;

        $emailData = [
            'to' => $to,
            'subject' => $subject,
            'body' => $msg,
        ];

        $email = new EmailHelper();
        $email->sendCustomMail($emailData);
        Session::flash('success',__('Thank you for contacting with us, we will get back to you shortly.'));
        return redirect()->back();
    }

// -------------------------------- REVIEW ----------------------------------------

    public function reviews()
    {
        return view('front.reviews');
    }

    public function topReviews()
    {
        return view('front.top-reviews');
    }

    public function reviewSubmit(ReviewRequest $request)
    {
        return response()->json($this->repository->reviewSubmit($request));
    }



// -------------------------------- SUBSCRIBE ----------------------------------------

    public function subscribeSubmit(SubscribeRequest $request)
    {
        Subscriber::create($request->all());
        return response()->json(__('You Have Subscribed Successfully.'));
    }


    // ---------------------------- TRACK ORDER ----------------------------------------//
    public function trackOrder()
    {
        return view('front.track_order');
    }

    public function track(Request $request)
    {
        $order = Order::where('transaction_number',$request->order_number)->first();

        if($order){
            return view('user.order.track',[
                'numbers' => 3,
                'track_orders' => TrackOrder::whereOrderId($order->id)->get()->toArray()
            ]);
        }else{
            return view('user.order.track',[
                'numbers' => 3,
                'error' => 1,
            ]);
        }
    }


    public function maintainance()
    {
        $setting = Setting::first();
        if($setting->is_maintainance == 0){
            return redirect(route('front.index'));
        }
        return view('front.maintainance');
    }



    public function finalize()
    {
        return redirect(route('front.index'));
    }


}
