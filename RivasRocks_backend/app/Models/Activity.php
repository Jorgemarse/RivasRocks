<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;
    protected  $fillable = [
        'title',
        'publication_date',
        'activity_date',
        'location',
        'small_description',
        'description'  
    ];
    protected $casts = [
        'publication_date' => 'datetime',
        'activity_date' => 'datetime'
    ];
}
