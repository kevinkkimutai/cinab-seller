<?php

namespace App\Repositories\Back;

use App\Models\Bcategory;

class BcategoryRepository
{

    /**
     * Store category.
     *
     * @param  \App\Http\Requests\BcategoryRequest  $request
     * @return void
     */

    public function store($request)
    {
        $input = $request->all();
        Bcategory::create($input);
    }

    /**
     * Update category.
     *
     * @param  \App\Http\Requests\BcategoryRequest  $request
     * @return void
     */

    public function update($bcategory, $request)
    {
        $input = $request->all();
        $bcategory->update($input);
    }

    /**
     * Delete category.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function delete($bcategory)
    {
        $bcategory->delete();
    }

}
