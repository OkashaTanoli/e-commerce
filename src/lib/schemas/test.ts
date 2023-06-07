import {
    pgTable,
    text,
} from "drizzle-orm/pg-core";

import { InferModel } from "drizzle-orm";

export const Test = pgTable('test', {
    name: text('name')
});

export type Test = InferModel<typeof Test>;
export type NewTest = InferModel<typeof Test, 'insert'>;
