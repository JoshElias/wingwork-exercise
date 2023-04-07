import { z } from 'zod';
import { DateTime } from 'luxon';

const earliestDate = DateTime.utc(2023, 3, 1);
const latestDate = DateTime.utc(2023, 12, 31);

export const StartDateInputSchema = z
    .coerce
    .date()
    .min(earliestDate.toJSDate())
    .max(latestDate.toJSDate())

export const EndDateInputSchema = z
    .coerce
    .date()
    .min(earliestDate.toJSDate())
    .max(latestDate.toJSDate())

export const NumberOfLandingsInputSchema = z.coerce.number().min(1);
export const TotalFlyingHoursInputSchema = z.coerce.number().min(1);

export const TripInputSchema = z.object({
    startDate: StartDateInputSchema,
    endDate: EndDateInputSchema,
    numOfLandings: NumberOfLandingsInputSchema,
    totalFlyingHours: TotalFlyingHoursInputSchema
})
.required()
// These are the same but I still wanted 2 different error messages
.refine((data) => data.startDate > data.endDate, {
    message: 'Start Date must be before End Date',
    path: ['startDate']
})
.refine((data) => data.endDate < data.startDate, {
    message: 'End Date must be after Start Date',
    path: ['endDate']
})

