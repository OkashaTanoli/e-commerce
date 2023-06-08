import {
    pgTable,
    text,
    timestamp,
} from "drizzle-orm/pg-core";

import { InferModel } from "drizzle-orm";

export const Users = pgTable('users', {
    id: text('id').primaryKey().notNull(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
});

export type User = InferModel<typeof Users>;
export type NewUser = InferModel<typeof Users, 'insert'>;
