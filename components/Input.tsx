import { HTMLInputTypeAttribute } from "react";


export default function Input({
    id,
    label,
    type,
    formRegister,
    errors
}: {
    id: string,
    label: string,
    type: HTMLInputTypeAttribute,
    formRegister?: any,
    errors: any
}) {
    return (
        <div className="justify-between">            
            <label 
                htmlFor={id} 
                className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="mt-2">
                <input
                    type={type}
                    name={id}
                    id={id}
                    autoComplete="off"
                    className="
                        block w-full 
                        rounded-md border-0 
                        p-1.5 px-4
                        text-gray-900 shadow-sm 
                        ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                        sm:text-sm sm:leading-6
                    "
                    {...formRegister}
                />
                {errors && (
                    <div className="mt-2 text-red-700 text-sm">
                        {errors.message}
                    </div>
                )}
            </div> 
        </div>
    );
}