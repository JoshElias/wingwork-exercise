import { api } from '@/lib/api';
import { 
    FindAvailableAircraftInput,
    AircraftOutput,
    MaintenanceScheduleOutput
} from '@/lib/types';


enum AvailabilityStatus {
    ScheduleConflict,
    MaintenanceConflict,
    Grounded,
    Available,
}

type AircraftAvailability = {
    [key: number]: AvailabilityStatus;
}

type AircraftMap = {
    [key: number]: AircraftOutput;
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
): Promise<AircraftOutput[]> {

    // Populate aircraftAvailability
    // Make assumption that trips will be short and there
    // should only be on conflict at a time
    const desiredSchedules = { startDate, endDate };
    const aircraftAvailability: AircraftAvailability = {};
    const aircraftMap = (await api.getAircraft())
        .reduce((acc, aircraft) => {
            acc[aircraft.id] = aircraft;
            return acc;
        }, {} as AircraftMap);

    function setAvailability(id: number, status: AvailabilityStatus) {
        !aircraftAvailability[id] && (aircraftAvailability[id] = status);
        aircraftMap[id] && delete aircraftMap[id];
    }

    // Look for conflicting schedules
    const trips = await api.getTrips();
    for(const trip of trips) {
        const tripSchedule = { 
            startDate: trip.startDate,
            endDate: trip.endDate,
        }
        checkScheduleOverlap(desiredSchedules, tripSchedule) 
            && setAvailability(trip.aircraftId, AvailabilityStatus.ScheduleConflict);

    }

    // Look for maintenance during that time
    const maintenanceSchedules = await api.getMaintenanceSchedules();
    for(const schedule of maintenanceSchedules) {
        aircraftMap[schedule.aircraftId]
            && checkScheduleOverlap(desiredSchedules, schedule)
            && setAvailability(schedule.aircraftId, AvailabilityStatus.MaintenanceConflict);
    }

    // Look if they are grounded

    // currentHobbs + totalFlyingHours > next_due_hobbs AND startDate

    //const groundings = (await api
    // Look for eligible after maintenance
    // Else, they are eligible for trip
    return Object.values(aircraftMap);
}