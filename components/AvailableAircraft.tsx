import { AircraftOutput } from "@/lib/types";
import { AircraftAvailability, AvailabilityStatus } from "@/lib/aircraft";

export default function AvailableAircraft({
    availabilities
}: {
    availabilities: AircraftAvailability[];
}) {
    return (
        <>
            {availabilities.map(availability => {
                    return (
                        <div key={availability.aircraft.id} className="flex flex-col gap-4">
                            <h2 className="text-2xl font-bold">{`Aircraft Id: ${availability.aircraft.id}`}</h2>
                            <h3 className="text-lg">{`Status: ${AvailabilityStatus[availability.status]}`}</h3>
                        </div>
                )
            })}
        </>
    )
}