import ActivityEntry, { ActivityProps, Event } from '@/components/ActivityEntry';
import { 
    TripOutput,
    MaintenanceScheduleOutput,
    MaintenanceEventOutput,
    AircraftMap,
    MaintenanceTypeMap,
  } from '@/lib/types';


function getStartDate(a: ActivityProps): Date {
    return new Date(
        (a.event as TripOutput | MaintenanceScheduleOutput).startDate
        || (a.event as MaintenanceEventOutput).nextDueDate
    );
}

function buildActivities(
    aircraftMap: AircraftMap,
    trips: TripOutput[],
    maintenanceSchedules: MaintenanceScheduleOutput[],
    maintenanceEvents: MaintenanceEventOutput[]
): ActivityProps[] {
    return [
        ...trips.map(trip => ({
            event: trip,
            aircraft: aircraftMap[trip.aircraftId],          
        })),
        ...maintenanceSchedules.map(schedule => ({
            event: schedule,
            aircraft: aircraftMap[schedule.aircraftId],
        })),
        ...maintenanceEvents.map(event => ({
            event: event,
            aircraft: aircraftMap[event.aircraftId],
        }))
    ].sort((a, b) => {
        const aStartDate = getStartDate(a);
        const bStartDate = getStartDate(b);
        if (aStartDate < bStartDate) {
            return -1;
        }
        if (aStartDate > bStartDate) {
            return 1;
        }
        return 0;
    })
}


export interface ActivityFeedProps {
    aircraft: AircraftMap,
    trips: TripOutput[],
    maintenanceSchedules: MaintenanceScheduleOutput[],
    maintenanceTypes: MaintenanceTypeMap,
    maintenanceEvents: MaintenanceEventOutput[]
}

export default function ActivityFeed(props: ActivityFeedProps) {
    const activities = buildActivities(
        props.aircraft, 
        props.trips, 
        props.maintenanceSchedules, 
        props.maintenanceEvents);

    return (
        <div className="
            max-w-4xl mx-auto grid 
            gap-y-8 grid-cols-1
            mt-8
        ">    
            <h2 className='text-center font-bold text-4xl'>Activity Feed</h2>  
            {activities.map(a => (
                    <ActivityEntry
                        key={a.event.id}
                        event={a.event}
                        aircraft={a.aircraft}
                    />
            ))}   
        </div>
    )
}