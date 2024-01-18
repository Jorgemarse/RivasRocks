<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected  $fillable = [
        'title',
        'publication_date',
        'small_description',
        'description'  
    ];
    protected $casts = [
        'publication_date' => 'datetime'
    ];
}
