<?php

namespace App\Repositories\Back;

use App\{
    Models\Currency,
};

class CurrencyRepository
{

    /**
     * Store Currency.
     *
     * @param  \App\Http\Requests\ImageStoreRequest  $request
     * @return void
     */

    public function store($request)
    {
        $input = $request->all();
        Currency::create($input);
    }

    /**
     * Update Currency.
     *
     * @return void
     */

    public function update($currency, $request)
    {
        $input = $request->all();
        $currency->update($input);
    }

    /**
     * Delete currency.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function delete($currency)
    {
        $currency->delete();
    }

}
