<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('puntuaciones', function (Blueprint $table) {
            $table->unsignedBigInteger('jugadores_id')->after('jornada_id'); // Agregar el nuevo campo
            $table->foreign('jugadores_id')->references('id')->on('jugadores'); // Ajusta el nombre de la tabla según tu caso
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('puntuaciones', function (Blueprint $table) {
            $table->dropForeign(['jugadores_id']);
            $table->dropColumn('jugadores_id');
        });
    }
};
