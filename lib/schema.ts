import { z } from 'zod';
import { EARLIEST_TRIP_DATE, LATEST_TRIP_DATE } from './constants';


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

export const TripInputSchema = z.object({
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
