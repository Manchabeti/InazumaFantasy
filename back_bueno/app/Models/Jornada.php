<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Jornada extends Model
{
    protected $fillable = ['fecha'];

    public function puntuaciones()
    {
        return $this->hasMany(Puntuacion::class, 'jornada_id');
    }
}
