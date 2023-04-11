import { 
    AircraftOutput, 
    TripOutput, 
    MaintenanceScheduleOutput,
    MaintenanceEventOutput
} from "@/lib/types";
import {
    TripOutputCamelSchema,
    MaintenanceEventOutputCamelSchema
} from '@/lib/schema';

function ActivityDetail({
    title,
    data
}: {
    title: string,
    data: string | number
}) {
    return (
        <span className="font-bold"> 
            {`${title}: `}
            <span className="font-normal">
                {data}
            </span>
        </span>
    )
}

function ActivityTitle({title}: {title: string}) {
    return <h3 className="font-bold text-lg mb-1">{title}</h3>
}

function renderEvent(event: TripOutput | MaintenanceScheduleOutput | MaintenanceEventOutput) {

    function getFields() {
        if(TripOutputCamelSchema.safeParse(event).success) {
            event = event as TripOutput;
            return (
                <>
                    <ActivityTitle title="Trip Details" />
                    <ActivityDetail title="Start Date" data={event.startDate} />
                    <ActivityDetail title="End Date" data={event.endDate} />
                    <ActivityDetail title="Flying Time" data={event.flyingTime} />
                    <ActivityDetail title="Landing Count" data={event.landingCount} />
                </>
            )
        }
        else if(MaintenanceEventOutputCamelSchema.safeParse(event).success) {
            event = event as MaintenanceEventOutput;
            return (
                <>
                    <ActivityTitle title="Maintenance Event Details" />
                    <ActivityDetail title="Due Date" data={event.nextDueDate} />
                    <ActivityDetail title="Maintenance Type" data={event.maintenanceTypeId} />
                </>
            )
        }
        else {
            event = event as MaintenanceScheduleOutput;
            return (
                <>
                    <ActivityTitle title="Maintenance Schedule Details" />
                    <ActivityDetail title="Start Date" data={event.startDate} />
                    <ActivityDetail title="End Date" data={event.endDate} />
                    <ActivityDetail title="Maintenance Type" data={event.maintenanceTypeId} />

                </>
            )
        }
    }
        
    return (
            <div className="flex flex-col">
                {getFields()}
            </div>
    )
}

export type Event = TripOutput | MaintenanceScheduleOutput | MaintenanceEventOutput;

export type ActivityProps = {
    event: Event,
    aircraft: AircraftOutput
}

export default function ActivityEntry({
    event,
    aircraft
}: ActivityProps) {
    return (
        <div 
            className="flex flex-row justify-evenly gap-1"
            data-testid="activity-entry">
            {renderEvent(event)}
            <div className="flex flex-col">
                <ActivityTitle title="Aircraft Details" />
                <ActivityDetail title="Tail Number" data={aircraft.tailNumber} />
                <ActivityDetail title="Current Hobbs" data={aircraft.currentHobbs} />
                <ActivityDetail title="Current Landings" data={aircraft.currentLandings} />
                <ActivityDetail title="Last Maintenance" data={aircraft.lastMaintenanceDate} />
            </div>
        </div>
    )
}

