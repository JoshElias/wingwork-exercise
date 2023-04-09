import { ZodRawShape, z } from 'zod';
import { Zodios, makeErrors } from '@zodios/core';
import { BASE_API_URL } from '@/lib/constants';
import { 
    AircraftOutputSnakeSchema, 
    AircraftOutputCamelSchema,
    MaintenanceTypeOutputSnakeSchema,
    MaintenanceTypeOutputCamelSchema,
    MaintenanceEventOutputSnakeSchema,
    MaintenanceEventOutputCamelSchema,
    MaintenanceScheduleOutputSnakeSchema,
    MaintenanceScheduleOutputCamelSchema,
    TripOutputSnakeSchema,
    TripOutputCamelSchema
} from '@/lib/schema';
import { AircraftMap, MaintenanceTypeMap } from './types';


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


// type ZodResource = {
//     method: string,
//     path: string,
//     alias: string,
//     description: string,
//     response: z.ZodEffects<z.ZodArray<z.ZodObject<any>>>
// }

// function createResource() : ZodResource {
//     return {

//     };
// }

export const api = new Zodios(BASE_API_URL, [
    {
        method: "get",
        path: "/aircraft",
        alias: "getAircraft",
        description: "Get all aircraft",
        response: z
            .array(AircraftOutputSnakeSchema)
            .transform(snakes => 
                snakes.reduce((acc, snake) => {
                    const camel = AircraftOutputCamelSchema.parse(snake);
                    acc[camel.id] = camel;
                    return acc;
                }, {} as AircraftMap)
            ),
            
        errors: errors,
    },
    {
        method: "get",
        path: "/maintenance_type",
        alias: "getMaintenanceTypes",
        description: "Get all maintenance types",
        response: z
            .array(MaintenanceTypeOutputSnakeSchema)
            .transform(snakes => 
                snakes.reduce((acc, snake) => {
                    const camel = MaintenanceTypeOutputCamelSchema.parse(snake);
                    acc[camel.id] = camel;
                    return acc;
                }, {} as MaintenanceTypeMap)
            ),
        errors: errors,
    },
    {
        method: "get",
        path: "/maintenance_event",
        alias: "getMaintenanceEvents",
        description: "Get all maintenance events",
        response: z
            .array(MaintenanceEventOutputSnakeSchema)
            .transform(snakes => 
                snakes.map(snake => MaintenanceEventOutputCamelSchema.parse(snake))
            ),
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