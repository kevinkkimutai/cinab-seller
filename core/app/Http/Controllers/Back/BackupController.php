<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use mysqli;
use ZanySoft\Zip\Zip;

class BackupController extends Controller
{
     /**
     * Constructor Method.
     *
     * Setting Authentication
     */
    public function __construct()
    {
        $this->middleware('auth:admin');
        $this->middleware('adminlocalize');
    }

    
    public function systemBackup()
    {
        $dir = public_path();
        
        $zip_file = Carbon::now().'-backup.zip';

       // Get real path for our folder
       $rootPath = realpath($dir);

       $zip = Zip::create($zip_file)->add($rootPath, true);
       $zip->close();


       header('Content-disposition: attachment; filename='.$zip_file);
       header('Content-type: application/zip');
       readfile($zip_file);
       @unlink($zip_file);
    }

    public function databaseBackup()
    {
        $DB_NAME = env('DB_DATABASE');

    $get_all_table_query = "SHOW TABLES ";
    $result = DB::select(DB::raw($get_all_table_query));

    $prep = "Tables_in_$DB_NAME";
    foreach ($result as $res){
        $tables[] =  $res->$prep;
    }

    
    $connect = DB::connection()->getPdo();

    $get_all_table_query = "SHOW TABLES";
    $statement = $connect->prepare($get_all_table_query);
    $statement->execute();
    $result = $statement->fetchAll();


    $output = '';
    foreach($tables as $table)
    {
        $show_table_query = "SHOW CREATE TABLE " . $table . "";
        $statement = $connect->prepare($show_table_query);
        $statement->execute();
        $show_table_result = $statement->fetchAll();

        foreach($show_table_result as $show_table_row)
        {
            $output .= "\n\n" . $show_table_row["Create Table"] . ";\n\n";
        }
        $select_query = "SELECT * FROM " . $table . "";
        $statement = $connect->prepare($select_query);
        $statement->execute();
        $total_row = $statement->rowCount();
        $check = Carbon::now();
        for($count=0; $count<$total_row; $count++)
        {
            $single_result = $statement->fetch(\PDO::FETCH_ASSOC);
            $table_column_array = array_keys($single_result);
            $table_value_array = array_values($single_result);
            $new_value_array = [];
            foreach($table_column_array as $key => $coloumn){
                $new_value_array[] = $table_value_array[$key];
                
                if($coloumn == 'created_at'){
                    
                    if(!$table_value_array[$key]){
                        unset($new_value_array[$key]);
                        $new_value_array['created_at'] = Carbon::now()->subMinutes(rand(1, 55));
                    }
                }
                if($coloumn == 'item_type'){
                    if(!$table_value_array[$key]){
                        unset($new_value_array[$key]);
                        $new_value_array['item_type'] = 'normal';
                    }
                }
                if($coloumn == 'file_type'){
                    
                    if(!$table_value_array[$key]){
                        unset($new_value_array[$key]);
                        $new_value_array['file_type'] = 'file';
                    }
                }
                if($coloumn == 'subcategory_id'){
                    
                    if(!$table_value_array[$key]){
                        unset($new_value_array[$key]);
                        $new_value_array['subcategory_id'] = 0;
                    }
                }
                if($coloumn == 'brand_id'){
                    
                    if(!$table_value_array[$key]){
                        unset($new_value_array[$key]);
                        $new_value_array['brand_id'] = 0;
                    }
                }
                if($coloumn == 'user_id'){
                    
                    if(!$table_value_array[$key]){
                        unset($new_value_array[$key]);
                        $new_value_array['user_id'] = 0;
                    }
                }
                if($coloumn == 'childcategory_id'){
                    
                    if(!$table_value_array[$key]){
                        unset($new_value_array[$key]);
                        $new_value_array['childcategory_id'] = 0;
                    }
                }
                if($coloumn == 'updated_at'){
                    if(!$table_value_array[$key]){
                        unset($new_value_array[$key]);
                        $new_value_array['updated_at'] = Carbon::now()->subMinutes(rand(1, 55));
                    }
                }
               
            }
            $update = [];
            foreach($new_value_array as $new_check){
                $update[] = str_replace("'","\'",$new_check);
            }
            
            $output .= "\nINSERT INTO $table (";
            $output .= "" . implode(", ", $table_column_array) . ") VALUES (";
            $output .= "'" . implode("','", $update) . "');\n";
        }
    }
    $file_name = 'database_backup_on_' . date('y-m-d') . '.sql';
    $file_handle = fopen($file_name, 'w+');
    fwrite($file_handle, $output);
    fclose($file_handle);
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename=' . basename($file_name));
    header('Content-Transfer-Encoding: binary');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($file_name));
    flush();
    readfile($file_name);
    unlink($file_name);
    }
}
