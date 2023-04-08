import { z } from 'zod';
import { Zodios, makeErrors } from '@zodios/core';
import { BASE_API_URL } from './constants';


export const TripOutputSchema = z.object({
    id: z.number(),
    aircraft_id: z.number(),
    start_date: z.string(),
    end_date: z.string(),
    flying_time: z.number(),
    landing_count: z.number()
});
export type TripOutput = z.infer<typeof TripOutputSchema>;

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
        path: "/trip",
        alias: "getTrips",
        description: "Get all trips",
        response: z.array(TripOutputSchema),
        errors: errors,
    },
]);