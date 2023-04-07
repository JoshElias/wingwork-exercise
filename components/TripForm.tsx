import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '@/components/Input';

type TripQuery = {
    start_date: string;
    end_date: string;
    numOfLandings: number;
    totalFlyingHours: number;
}

const tripInputs = [
    { 
        id: 'startDate',
        label: 'Start Date',
        type: 'date'
    },
    { 
        id: 'endDate',
        label: 'End Date',
        type: 'date'
    },
    { 
        id: 'numOfLandings',
        label: 'Number of Landings',
        type: 'number'
    },
    { 
        id: 'totalFlyingHours',
        label: 'Total Flying Hours',
        type: 'number'
    },
]

export default function TripForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit: SubmitHandler<any> = data => {
        console.log("FORM SUBMISSION")
        console.log(data);
    }

    return (
        <div className="
            max-w-4xl
            mx-auto
            border-2 rounded-lg
            px-8 pb-8 pt-6
        ">
            <form onSubmit={onSubmit}>
                <div className="border-b border-gray-900/10 pb-8">
                    <h2 className="text-lg font-semibold leading-7 text-gray-900">
                        Schedule a Flight!
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        See which aircraft are available for your next flight.
                    </p>
                    <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
                        {tripInputs.map(input => 
                            <Input 
                                key={input.id} 
                                {...input} 
                                formRegister={register(input.id)}
                                errors={errors[input.id]}
                            />
                        )}
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="submit"
                        className="
                            rounded-md bg-indigo-600 
                            px-3 py-2 text-sm f
                            ont-semibold text-white shadow-sm hover:bg-indigo-500 
                            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                        "
                    >
                        Schedule
                    </button>
                </div>

            </form>
        </div> 
    )
}