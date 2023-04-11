import { z } from 'zod';
import camelcaseKeys from 'camelcase-keys';

export function zodToCamelCase(zod: z.ZodObject<any>): z.ZodObject<any> {
    return z.object(camelcaseKeys(zod.shape));
}
