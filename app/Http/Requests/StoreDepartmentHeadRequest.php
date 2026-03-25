<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDepartmentHeadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'employee_id' => [
                'required',
                'exists:employees,id',
                'unique:department_heads,employee_id'
            ],

            'department' => [
                'required',
                'string',
                'max:255'
            ],

            'status' => [
                'required',
                'in:active,inactive'
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'employee_id.required' => 'Please select an employee.',
            'employee_id.exists' => 'The selected employee is invalid.',
            'employee_id.unique' => 'This employee is already assigned as a department head.',

            'department.required' => 'Department is required.',

            'status.required' => 'Status is required.',
            'status.in' => 'Invalid status value.',
        ];
    }
}
