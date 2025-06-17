<?php

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'firstname' => ['required', 'string', 'max:50'],
            'lastname' => ['required', 'string', 'max:50'],
            'birthday' => ['required', 'date', 'before:today'],
            'gender' => ['required', 'string', 'in:homme,femme,autre'],
            'address' => ['required', 'string', 'max:255'],
            'zip' => ['required', 'string', 'max:50'],
            'city' => ['required', 'string', 'max:50'],
            'phone' => ['required', 'string', 'max:20'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
        ];
    }

}
