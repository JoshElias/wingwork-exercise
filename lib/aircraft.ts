import { api } from '@/lib/api';
import { 
    FindAvailableAircraftInput,
    AircraftOutput,
} from '@/lib/types';


export enum AvailabilityStatus {
    Available,
    ScheduleConflict,
    MaintenanceConflict,
    Grounded,
}

export type AircraftAvailabilityMap = {
    [key: number]: AvailabilityStatus;
}

export type AircraftAvailability = {
    aircraft: AircraftOutput,
    status: AvailabilityStatus,
}

type Schedule = {
    startDate: Date;
    endDate: Date;
}

function checkScheduleOverlap(schedule1: Schedule, schedule2: Schedule) {
    return (schedule2.startDate <= schedule1.startDate && schedule2.endDate >= schedule1.startDate) 
        || (schedule2.startDate >= schedule1.startDate && schedule2.startDate <= schedule1.endDate)
}


export async function findAircraftAvailability({
    startDate,
    endDate,
    numOfLandings,
    totalFlyingHours,
}: FindAvailableAircraftInput
): Promise<AircraftAvailability[]> {

    // Populate aircraftAvailability
    // Make assumption that trips will be short and there
    // should only be on conflict at a time
    const desiredSchedules = { startDate, endDate };
    const aircraftAvailability: AircraftAvailabilityMap = {};
    const aircraftMap = await api.getAircraft();
    const maintenanceTypeMap = await api.getMaintenanceTypes();
    const remainingAircraft =  {...aircraftMap};
    function setAvailability(id: number, status: AvailabilityStatus) {
        !aircraftAvailability[id] && (aircraftAvailability[id] = status);
        remainingAircraft[id] && delete remainingAircraft[id];
    }

    // Look for conflicting schedules
    const trips = await api.getTrips();
    for(const trip of trips) {
        const tripSchedule = { 
            startDate: new Date(trip.startDate),
            endDate: new Date(trip.endDate),
        }
        checkScheduleOverlap(desiredSchedules, tripSchedule) 
            && setAvailability(trip.aircraftId, AvailabilityStatus.ScheduleConflict);

    }

    // Look for maintenance during that time
    const maintenanceSchedules = await api.getMaintenanceSchedules();
    for(const schedule of maintenanceSchedules) {
        const maintnenanceSchedule = { 
            startDate: new Date(schedule.startDate),
            endDate: new Date(schedule.endDate),
        }
        remainingAircraft[schedule.aircraftId]
            && checkScheduleOverlap(desiredSchedules, maintnenanceSchedule)
            && setAvailability(schedule.aircraftId, AvailabilityStatus.MaintenanceConflict);
    }


    // Is the aircraft grounded?

    // Get upcoming maintenance events
    const maintenanceEvents = await api.getMaintenanceEvents();
    const futureMaintenanceEvents = maintenanceEvents.filter(e => new Date(e.nextDueDate) > startDate);
    futureMaintenanceEvents.sort((a, b) => {
        const aNextDueHobbs = new Date(a.nextDueDate);
        const bNextDueHobbs = new Date(b.nextDueDate);
        if (aNextDueHobbs < bNextDueHobbs) {
            return -1;
        }
        if (aNextDueHobbs > bNextDueHobbs) {
            return 1;
        }
        return 0;
    });
    
    for(const key in aircraftMap) {

        const aircraft = aircraftMap[key];

        // get the next due maintenance event for the aircraft
        const nextDueMaintenanceEvent = futureMaintenanceEvents[0];

        // calculate the current hobbs and landing count for the aircraft
        const currentHobbs = aircraft.currentHobbs + totalFlyingHours;
        const currentLandings = aircraft.currentLandings + numOfLandings;

        // check if the aircraft will be grounded due to maintenance
        if (currentHobbs >= nextDueMaintenanceEvent.nextDueHobbs || currentLandings >= nextDueMaintenanceEvent.nextDueLandings) {
            //console.log(`Aircraft will be grounded due to exceeding maintenance limit`);
            setAvailability(aircraft.id, AvailabilityStatus.Grounded);
            continue;
        } 
        
        else {
            // calculate the time between the last maintenance date and the end of the upcoming trip
            const timeSinceLastMaintenance = endDate.getTime() - new Date(aircraft.lastMaintenanceDate).getTime();

            // calculate the time until the next due date for maintenance
            const timeUntilNextDueDate = new Date(nextDueMaintenanceEvent.nextDueDate).getTime() - endDate.getTime();

            // check if the time between the last maintenance date and the end of the upcoming trip
            // plus the time until the next due date for maintenance exceeds the calendar days interval
            const calendarDaysInterval = maintenanceTypeMap[nextDueMaintenanceEvent.id].calendarDaysInterval;
            if (timeSinceLastMaintenance + timeUntilNextDueDate > calendarDaysInterval * 24 * 60 * 60 * 1000) {
                //console.log(`Aircraft will be grounded due to exceeding calendar days interval of ${calendarDaysInterval}`);
                setAvailability(aircraft.id, AvailabilityStatus.Grounded);
            }
        }
    }

    // Else, they are eligible for trip
    for(const aircraft of Object.values(aircraftMap)) {
        setAvailability(aircraft.id, AvailabilityStatus.Available)
    }
        
    return Object.entries(aircraftAvailability)
        .map(([key, value]) => {
            return {
                aircraft: aircraftMap[parseInt(key)],
                status: value
            }
        })
        .sort((a, b) => a.status - b.status)
}