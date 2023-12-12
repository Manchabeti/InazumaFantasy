<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jugador extends Model
{
    protected $fillable = [
        'nombre',
        'apodo',
        'media',
        'user_id',
        'posicion_id',
        'equipo_id',
        'foto'
    ];

    protected $table = 'jugadores';
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function posicion()
    {
        return $this->belongsTo(Posicion::class);
    }

    public function equipo()
    {
        return $this->belongsTo(Equipo::class);
    }
}
