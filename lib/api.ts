import { z } from 'zod';
import { Zodios, makeErrors } from '@zodios/core';
import { BASE_API_URL } from './constants';


export const AircraftOutputSchema = z.object({
    id: z.number(),
    tail_number: z.string(),
    current_hobbs: z.number(),
    current_landings: z.number(),
    last_maintenance_date: z.string(),
});

export const MaintenanceTypeOutputSchema = z.object({
    id: z.number(),
    description: z.string(),
    hobbs_interval: z.number(),
    landings_interval: z.number(),
    calendar_days_interval: z.number(),
});

export const MaintenanceEventOutputSchema = z.object({
    id: z.number(),
    aircraft_id: z.number(),
    maintenance_type_id: z.number(),
    next_due_hobbs: z.number(),
    next_due_landings: z.number(),
    next_due_date: z.string(),
});

export const MaintenanceScheduleOutputSchema = z.object({
    id: z.number(),
    aircraft_id: z.number(),
    maintenance_type_id: z.number(),
    start_date: z.string(),
    end_date: z.string(),
});

export const TripOutputSchema = z.object({
    id: z.number(),
    aircraft_id: z.number(),
    start_date: z.string(),
    end_date: z.string(),
    flying_time: z.number(),
    landing_count: z.number()
});


export const errors = makeErrors([
    {
        status: "default",
        description: "Default error",
        schema: z.object({
            error: z.object({
            code: z.string(),
            message: z.string(),
            }),
        }),
    },
]);


export const api = new Zodios(BASE_API_URL, [
    {
        method: "get",
        path: "/aircraft",
        alias: "getAircraft",
        description: "Get all aricraft",
        response: z.array(AircraftOutputSchema),
        errors: errors,
    },
    {
        method: "get",
        path: "/maintenance_type",
        alias: "getMaintenanceTypes",
        description: "Get all maintenance types",
        response: z.array(MaintenanceTypeOutputSchema),
        errors: errors,
    },
    {
        method: "get",
        path: "/maintenance_event",
        alias: "getMaintenanceEvents",
        description: "Get all maintenance events",
        response: z.array(MaintenanceEventOutputSchema),
        errors: errors,
    },
    {
        method: "get",
        path: "/maintenance_schedule",
        alias: "getMaintenanceSchedules",
        description: "Get all maintenance schedules",
        response: z.array(MaintenanceScheduleOutputSchema),
        errors: errors,
    },
    {
        method: "get",
        path: "/trip",
        alias: "getTrips",
        description: "Get all trips",
        response: z.array(TripOutputSchema),
        errors: errors,
    },
]);