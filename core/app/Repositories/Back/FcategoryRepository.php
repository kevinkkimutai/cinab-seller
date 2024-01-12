<?php

namespace App\Repositories\Back;

use App\Models\Fcategory;

class FcategoryRepository
{

    /**
     * Store category.
     *
     * @param  \App\Http\Requests\FcategoryRequest  $request
     * @return void
     */

    public function store($request)
    {
        $input = $request->all();
        Fcategory::create($input);
    }

    /**
     * Update category.
     *
     * @param  \App\Http\Requests\FcategoryRequest  $request
     * @return void
     */

    public function update($fcategory, $request)
    {
        $input = $request->all();
        $fcategory->update($input);
    }

    /**
     * Delete category.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function delete($fcategory)
    {
        $fcategory->delete();
    }

}
