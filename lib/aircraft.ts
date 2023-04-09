import { api } from '@/lib/api';
import { 
    FindAvailableAircraftInput,
    AircraftOutput,
} from '@/lib/types';


enum AvailabilityStatus {
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

    // Look if they are grounded
    // currentHobbs + totalFlyingHours > next_due_hobbs AND startDate
    // Look for eligible after maintenance

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