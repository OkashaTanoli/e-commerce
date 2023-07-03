import {
    boolean,
    integer,
    pgTable,
    text,
    timestamp,
} from "drizzle-orm/pg-core";

import { InferModel } from "drizzle-orm";



// SQL QUERY 
// CREATE TABLE otp (
//     email VARCHAR(255) NOT NULL,
//     otp INT NOT NULL
// );

export const Otp = pgTable('otp', {
    email: text('email').notNull(),
    otp: integer('otp').notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull()
});


export type Otp = InferModel<typeof Otp>;
export type NewOtp = InferModel<typeof Otp, 'insert'>;
