<?php

namespace App\Repositories\Front;

use App\{
    Models\Cart,
    Models\Item,
    Models\PromoCode,
    Helpers\PriceHelper
};
use App\Models\AttributeOption;
use App\Models\Attribute;
use Illuminate\Support\Facades\Session;

class CartRepository
{

    /**
     * Store cart.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store($request)
    {
       
        // return $request->all();

        $msg = '';
        $qty_check  = 0;
        $input = $request->all();
        $input['option_name']=[];
        $input['option_price']=[];
        $input['attr_name'] =[];

        $qty = isset($input['quantity']) ? $input['quantity'] : 1 ;



        $qty = is_numeric($qty) ? $qty : 1;


        if($input['options_ids']){
            foreach(explode(',',$input['options_ids']) as $optionId){
                $option = AttributeOption::findOrFail($optionId);
                if($qty > $option->stock){
                    $data = [ 'message' => 'Product Out Of Stock', 'status' => 'outStock'];
                    return $data;
                }
            }
        }
     
        $cart = Session::get('cart');

        $item = Item::where('id',$input['item_id'])->select('id','name','photo','discount_price','previous_price','slug','item_type','license_name','license_key', 'stock')->first();
      
        if($item->type == 'normal' ){
            if($item->stock < $request->quantity){
                $data = [ 'message' => 'Product Out Of Stock', 'status' => 'outStock'];
               return $data;
           }
        }
     


        $single = isset($request->type) ? ($request->type == '1' ? 1 : 0 ) : 0;



        if(Session::has('cart')){
            if($item->item_type == 'digital' || $item->item_type == 'license'){
                $check = array_key_exists($input['item_id'],Session::get('cart'));

                if($check){
                    $data = [ 'message' => 'Product already added', 'status' => 'alreadyInCart'];
                    return $data;
                }else{
                    if(array_key_exists($input['item_id'].'-',Session::get('cart'))){
                      
                        $data = [ 'message' => 'Product already added', 'status' => 'alreadyInCart'];
                        return $data;
                    }
                }
            }

        }

        $option_id = [];

        if($single == 1){
            $attr_name = [];
            $option_name = [];
            $option_price = [];

            if(count($item->attributes) > 0){
                foreach($item->attributes as $attr){
                    if(isset($attr->options[0]->name)){
                        $attr_name[] = $attr->name;
                        $option_name[] = $attr->options[0]->name;
                        $option_price[] = $attr->options[0]->price;
                        $option_id[] = $attr->options[0]->id;
                    }
                }
            }

            $input['attr_name'] = $attr_name;
            $input['option_price'] = $option_price;
            $input['option_name'] = $option_name;
            $input['option_id'] = $option_id;

            if($request->quantity != 'NaN'){
                $qty = $request->quantity;
                $qty_check = 1;
            }else{
                $qty = 1;
            }

        }else{


            if($input['attribute_ids']){
                foreach(explode(',',$input['attribute_ids']) as $attrId){
                    $attr = Attribute::findOrFail($attrId);
                    $attr_name[] = $attr->name;
                }
                $input['attr_name'] = $attr_name;
            }

            if($input['options_ids']){
                foreach(explode(',',$input['options_ids']) as $optionId){
                    $option = AttributeOption::findOrFail($optionId);
                    $option_name[] = $option->name;
                    $option_price[] = $option->price;
                    $option_id[] = $option->id;
                }
                $input['option_name'] = $option_name;
                $input['option_price'] = $option_price;
            }

           
        }

     
      

        if (!$item) {
            abort(404);
        }


        $option_price = array_sum($input['option_price']);
        $attribute['names'] = $input['attr_name'];
        $attribute['option_name'] = $input['option_name'];

        if(isset($request->item_key) && $request->item_key !=(int) 0){
            $cart_item_key = explode('-',$request->item_key)[1];

        }else{
            $cart_item_key = str_replace(' ','',implode(',',$attribute['option_name']));
        }

        $attribute['option_price'] = $input['option_price'];
        $cart = Session::get('cart');
        // if cart is empty then this the first product
        if (!$cart || !isset($cart[$item->id.'-'.$cart_item_key])) {
            $license_name = json_decode($item->license_name,true);
            $license_key = json_decode($item->license_name,true);
            $cart [$item->id.'-'.$cart_item_key] = [
                    'options_id' => $option_id,
                    'attribute' => $attribute,
                    'attribute_price' => $option_price,
                    "name" => $item->name,
                    "slug" => $item->slug,
                    "qty" => $qty,
                    "price" => PriceHelper::grandPrice($item),
                    "main_price" => $item->discount_price,
                    "photo" => $item->photo,
                    "type" => $item->item_type,
                    "item_type" => $item->item_type,
                    'item_l_n' => $item->item_type == 'license' ? end($license_name) : null,
                    'item_l_k' => $item->item_type == 'license' ? end($license_key) : null
            ];

            Session::put('cart', $cart);
            $mgs = ['message' => __('Product add successfully') , 'qty' => count(Session::get('cart'))];
            return $mgs;

        }


        // if cart not empty then check if this product exist then increment quantity
        if (isset($cart[$item->id.'-'.$cart_item_key])) {

            $cart = Session::get('cart');

            if($qty_check == 1){
                $cart[$item->id.'-'.$cart_item_key]['qty'] =  $qty;
            }else{
                $cart[$item->id.'-'.$cart_item_key]['qty'] +=  $qty;
            }


            Session::put('cart', $cart);

            if($qty_check == 1){
                $mgs = ['message' => __('Product add successfully') , 'qty' => count(Session::get('cart'))];
            }else{
                $mgs = ['message' => __('Product add successfully') , 'qty' => count(Session::get('cart'))];
            }

            $qty_check = 0;
            return $mgs;
        }

            $mgs = ['message' => __('Product add successfully') , 'qty' => count(Session::get('cart'))];
           return $mgs;


    }

	public function promoStore($request)
	{

        $input = $request->all();
        $promo_code = PromoCode::where('status', 1)->whereCodeName($input['code'])->where('no_of_times', '>', 0)->first();


        if($promo_code){
            $cart = Session::get('cart');
            $cartTotal = PriceHelper::cartTotal($cart, 2);
            $discount = $this->getDiscount($promo_code->discount,$promo_code->type,$cartTotal);

            $coupon= [
                'discount' => $discount['sub'],
                'code'  => $promo_code
            ];
            Session::put('coupon',$coupon);

            return [
                'status'  => true,
                'message' => __('Promo code found!')
            ];
        }else{
            return [
                'status'  => false,
                'message' => __('No coupon code found')
            ];
        }
    }



	public function getCart()
	{
        $cart = Session::has('cart') ? Session::get('cart') : null;
        return $cart;

    }

    public function getDiscount($discount,$type,$price){
        if($type == 'amount'){
            $sub = $discount;
            $total = $price - $sub;
        }else{
            $val = $price / 100;
            $sub = $val * $discount;
            $total = $price - $sub;
        }

        return [
            'sub' => $sub,
            'total' => $total
        ];
    }

}
