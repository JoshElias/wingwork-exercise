import { z } from 'zod';
import { zodToCamelCase } from './util';
import { EARLIEST_TRIP_DATE, LATEST_TRIP_DATE } from './constants';


// WingWork API Schemas

export const AircraftOutputSnakeSchema = z.object({
    id: z.number(),
    tail_number: z.string(),
    current_hobbs: z.number(),
    current_landings: z.number(),
    last_maintenance_date: z.string(),
});
export const AircraftOutputCamelSchema = zodToCamelCase(AircraftOutputSnakeSchema);

export const MaintenanceTypeOutputSnakeSchema = z.object({
    id: z.number(),
    description: z.string(),
    hobbs_interval: z.number(),
    landings_interval: z.number(),
    calendar_days_interval: z.number(),
});
export const MaintenanceTypeOutputCamelSchema = zodToCamelCase(MaintenanceTypeOutputSnakeSchema);

export const MaintenanceEventOutputSnakeSchema = z.object({
    id: z.number(),
    aircraft_id: z.number(),
    maintenance_type_id: z.number(),
    next_due_hobbs: z.number(),
    next_due_landings: z.number(),
    next_due_date: z.string(),
});
export const MaintenanceEventOutputCamelSchema = zodToCamelCase(MaintenanceEventOutputSnakeSchema);

export const MaintenanceScheduleOutputSnakeSchema = z.object({
    id: z.number(),
    aircraft_id: z.number(),
    maintenance_type_id: z.number(),
    start_date: z.string(),
    end_date: z.string(),
});
export const MaintenanceScheduleOutputCamelSchema = zodToCamelCase(MaintenanceScheduleOutputSnakeSchema)

export const TripOutputSnakeSchema = z.object({
    id: z.number(),
    aircraft_id: z.number(),
    start_date: z.string(),
    end_date: z.string(),
    flying_time: z.number(),
    landing_count: z.number()
});
export const TripOutputCamelSchema = zodToCamelCase(TripOutputSnakeSchema);


// Trip Form Schemas

export const StartDateInputSchema = z
    .coerce
    .date()
    .min(EARLIEST_TRIP_DATE.toJSDate())
    .max(LATEST_TRIP_DATE.toJSDate())

export const EndDateInputSchema = z
    .coerce
    .date()
    .min(EARLIEST_TRIP_DATE.toJSDate())
    .max(LATEST_TRIP_DATE.toJSDate())

export const NumberOfLandingsInputSchema = z.coerce.number().min(1);
export const TotalFlyingHoursInputSchema = z.coerce.number().min(1);

export const FindAvailableAircraftInputSchema = z.object({
    startDate: StartDateInputSchema,
    endDate: EndDateInputSchema,
    numOfLandings: NumberOfLandingsInputSchema,
    totalFlyingHours: TotalFlyingHoursInputSchema
})
// These are the same but I still wanted 2 different error messages
.refine((data) => data.startDate < data.endDate, {
    message: 'Start Date must be before End Date',
    path: ['startDate']
})
.refine((data) => data.endDate > data.startDate, {
    message: 'End Date must be after Start Date',
    path: ['endDate']
})
