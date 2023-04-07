import { z } from 'zod';
import {
    StartDateInputSchema,
    EndDateInputSchema,
    NumberOfLandingsInputSchema,
    TotalFlyingHoursInputSchema,
    TripInputSchema
} from './schema';

export type StartDateInput = z.infer<typeof StartDateInputSchema>;
export type EndDateInput = z.infer<typeof EndDateInputSchema>;
export type NumberOfLandingsInput = z.infer<typeof NumberOfLandingsInputSchema>;
export type TotalFlyingHoursInput = z.infer<typeof TotalFlyingHoursInputSchema>;
export type TripInput = z.infer<typeof TripInputSchema>;