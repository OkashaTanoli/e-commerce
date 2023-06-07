import {
    pgTable,
    serial,
    text,
    timestamp,
    varchar,
    uniqueIndex,
    date,
    numeric,
    integer,
    index,
    jsonb,
} from "drizzle-orm/pg-core";

import { InferModel } from "drizzle-orm";

export const Orders = pgTable('orders', {
    id: text('id').primaryKey(),
    subtotal: integer('subtotal').notNull(),
    total: integer('total').notNull(),
    products: jsonb('products').notNull(),
    shipping: jsonb('shipping').notNull(),
    delivery_status: text('delivery_status').default('pending').notNull(),
    payment_status: text('payment_status').notNull(),
    payment_intent_id: text('payment_intent_id').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
});

export type Order = InferModel<typeof Orders>;
export type NewOrder = InferModel<typeof Orders, 'insert'>;
