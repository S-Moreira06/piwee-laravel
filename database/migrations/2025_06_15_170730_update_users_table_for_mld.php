<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('firstname', 50)->nullable();
            $table->string('lastname', 50)->nullable();
            $table->date('birthday')->nullable();
            $table->string('gender', 10)->nullable();
            $table->string('address', 255)->nullable();
            $table->string('zip', 50)->nullable();
            $table->string('city', 50)->nullable();
            $table->string('phone', 20)->nullable();
            $table->boolean('verified')->default(false);
            $table->string('role', 50)->default('user');
            $table->boolean('is_deleted')->default(false);
            $table->dropColumn('name');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'firstname', 'lastname', 'birthday', 'gender',
                'address', 'zip', 'city', 'phone',
                'verified', 'role', 'is_deleted'
            ]);
        });
    }
};
