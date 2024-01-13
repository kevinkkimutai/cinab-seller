<?php

namespace App\Http\Controllers\Back;

use App\Models\Sitemap;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Spatie\Sitemap\SitemapGenerator;

class SitemapController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin');
        $this->middleware('adminlocalize');
    }
    public function index(Request $request)
    {
        $data['sitemaps'] = Sitemap::orderBy('id', 'DESC')->paginate(10);
        return view('back.settings.sitemap.index', $data);
    }

    public function add()
    {
        return view('back.settings.sitemap.add');
    }

    public function download(Request $request) {

        return response()->download('assets/sitemaps/'.$request->filename);
    }

    public function store(Request $request)
    {
        $data = new Sitemap();
        $input = $request->all();

        $filename = 'sitemap' . uniqid() . '.xml';
        SitemapGenerator::create($request->sitemap_url)->writeToFile('assets/sitemaps/' . $filename);
        $input['filename']    = $filename;
        $input['sitemap_url'] = $request->sitemap_url;
        $data->fill($input)->save();

        return redirect()->route('admin.sitemap.index')->withSuccess(__('Sitemap Generate Successfully'));

    }

    public function delete($id)
    {

        $sitemap = Sitemap::find($id);
        @unlink('assets/sitemaps/' . $sitemap->filename);
        $sitemap->delete();

        return redirect()->back()->withSuccess(__('Sitemap file deleted successfully!'));

    }

}
