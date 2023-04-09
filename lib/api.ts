import { z } from 'zod';
import { Zodios, makeErrors } from '@zodios/core';
import { BASE_API_URL } from '@/lib/constants';
import { 
    AircraftOutputSnakeSchema, 
    AircraftOutputCamelSchema,
    MaintenanceTypeOutputSchema,
    MaintenanceEventOutputSchema,
    MaintenanceScheduleOutputSnakeSchema,
    MaintenanceScheduleOutputCamelSchema,
    TripOutputSnakeSchema,
    TripOutputCamelSchema
} from '@/lib/schema';


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
        response: z
            .array(AircraftOutputSnakeSchema)
            .transform(snakes => 
                snakes.map(snake => AircraftOutputCamelSchema.parse(snake))
            ),
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
        response: z
            .array(MaintenanceScheduleOutputSnakeSchema)
            .transform(snakes => 
                snakes.map(snake => MaintenanceScheduleOutputCamelSchema.parse(snake))
            ),
        errors: errors,
    },
    {
        method: "get",
        path: "/trip",
        alias: "getTrips",
        description: "Get all trips",
        response: z
            .array(TripOutputSnakeSchema)
            .transform(snakes => 
                snakes.map(snake => TripOutputCamelSchema.parse(snake))
            ),
        errors: errors,
    },
]);