import { AircraftOutput } from "@/lib/types";
import { AircraftAvailability, AvailabilityStatus } from "@/lib/aircraft";

export default function AvailableAircraft({
    availabilities
}: {
    availabilities: AircraftAvailability[];
}) {
    return (
        <div className="gap-y-8 grid-cols-1">
            {availabilities.map(availability => {
                    return (
                        <div key={availability.aircraft.id} className="flex flex-col gap-4 ">
                            <h2 className="text-2xl font-bold">{`Aircraft Id: ${availability.aircraft.tailNumber}`}</h2>
                            <p> {JSON.stringify(availability.aircraft)}</p>
                            <h3 className="text-lg">{`Status: ${AvailabilityStatus[availability.status]}`}</h3>
                        </div>
                )
            })}
        </div>
    )
}