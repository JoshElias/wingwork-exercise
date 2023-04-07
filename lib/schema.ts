import { z } from 'zod';
import { DateTime } from 'luxon';

const earliestDate = DateTime.utc(2023, 3, 1);
const latestDate = DateTime.utc(2023, 12, 31);

export const StartDateInput = z
    .coerce
    .date()
    .min(earliestDate.toJSDate())
    .max(latestDate.toJSDate())


export const EndDateInput = z
    .coerce
    .date()
    .min(earliestDate.toJSDate())
    .max(latestDate.toJSDate())

export const NumberOfLandingsInput = z.coerce.number().min(1);

export const TotalFlyingHoursInput = z.coerce.number().min(1);

export const TripInput = z.object({
    startDate: StartDateInput,
    endDate: EndDateInput,
    numOfLandings: NumberOfLandingsInput,
    totalFlyingHours: TotalFlyingHoursInput
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

