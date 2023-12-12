<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipo extends Model
{
    protected $fillable = [
        'nombre',
        'escudo',
        
    ];
    public function jugadores()
    {
        return $this->hasMany(Jugador::class);
    }
}
