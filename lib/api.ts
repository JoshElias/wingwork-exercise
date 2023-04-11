import { z } from 'zod';
import { Zodios, makeErrors } from '@zodios/core';
import { BASE_API_URL } from '@/lib/constants';
import { 
    AircraftOutputSnakeSchema, 
    MaintenanceTypeOutputSnakeSchema,
    MaintenanceEventOutputSnakeSchema,
    MaintenanceScheduleOutputSnakeSchema,
    TripOutputSnakeSchema,
} from '@/lib/schema';
import { AircraftMap, MaintenanceTypeMap } from './types';
import camelcaseKeys from 'camelcase-keys';


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
        description: "Get all aircraft",
        response: z
            .array(AircraftOutputSnakeSchema)
            .transform(snakes => 
                camelcaseKeys(snakes)
                    .reduce((acc, aircraft) => {
                        acc[aircraft.id] = aircraft;
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
                camelcaseKeys(snakes)
                    .reduce((acc, maintenanceType) => {
                        acc[maintenanceType.id] = maintenanceType;
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
            .transform(snakes => camelcaseKeys(snakes)),
        errors: errors,
    },
    {
        method: "get",
        path: "/maintenance_schedule",
        alias: "getMaintenanceSchedules",
        description: "Get all maintenance schedules",
        response: z
            .array(MaintenanceScheduleOutputSnakeSchema)
            .transform(snakes => camelcaseKeys(snakes)),
        errors: errors,
    },
    {
        method: "get",
        path: "/trip",
        alias: "getTrips",
        description: "Get all trips",
        response: z
            .array(TripOutputSnakeSchema)
            .transform(snakes => camelcaseKeys(snakes)),
        errors: errors,
    },
]);