<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Puntuacion extends Model
{
    protected $table = 'puntuaciones';
    protected $fillable = ['user_id', 'jornada_id', 'jugadores_id', 'puntos'];

    public function jornada()
    {
        return $this->belongsTo(Jornada::class, 'jornada_id');
    }

    public function jugador()
    {
        return $this->belongsTo(Jugador::class, 'jugadores_id');
    }

    public function usuario()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}

