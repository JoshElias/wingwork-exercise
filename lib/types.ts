import { z } from 'zod';
import {
    StartDateInputSchema,
    EndDateInputSchema,
    NumberOfLandingsInputSchema,
    TotalFlyingHoursInputSchema,
    FindAvailableAircraftInputSchema,
    
    AircraftOutputCamelSchema,
    MaintenanceScheduleOutputCamelSchema,
    MaintenanceTypeOutputCamelSchema,
    TripOutputCamelSchema,
} from './schema';

export type StartDateInput = z.infer<typeof StartDateInputSchema>;
export type EndDateInput = z.infer<typeof EndDateInputSchema>;
export type NumberOfLandingsInput = z.infer<typeof NumberOfLandingsInputSchema>;
export type TotalFlyingHoursInput = z.infer<typeof TotalFlyingHoursInputSchema>;
export type FindAvailableAircraftInput = z.infer<typeof FindAvailableAircraftInputSchema>;

export type TripOutput = z.infer<typeof TripOutputCamelSchema>;
export type AircraftOutput = z.infer<typeof AircraftOutputCamelSchema>;
export type MaintenanceScheduleOutput = z.infer<typeof MaintenanceScheduleOutputCamelSchema>;
export type MaintenanceTypeOutput = z.infer<typeof MaintenanceTypeOutputCamelSchema>;
export type MaintenanceEventOutput = z.infer<typeof MaintenanceEventOutputCamelSchema>;
