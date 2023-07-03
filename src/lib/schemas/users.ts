import {
    boolean,
    pgTable,
    text,
    timestamp,
} from "drizzle-orm/pg-core";

import { InferModel } from "drizzle-orm";




// SQL QUERY
// CREATE TABLE users(
//     id VARCHAR(255) PRIMARY KEY NOT NULL,
//     name VARCHAR(255) NOT NULL,
//     email VARCHAR(255) NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     is_verified BOOLEAN NOT NULL DEFAULT FALSE,
//     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
// );

export const Users = pgTable('users', {
    id: text('id').primaryKey().notNull(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    is_verified: boolean('is_verified').default(false).notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
});

export type User = InferModel<typeof Users>;
export type NewUser = InferModel<typeof Users, 'insert'>;
