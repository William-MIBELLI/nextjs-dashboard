import { z } from 'zod'
import { Invoice } from './definitions'

const BaseInvoiceSchema = z.object({
  id: z.string().uuid(),
  customer_id: z.string().uuid(),
  amount: z.coerce.number().positive(),
  date: z.string().date(),
  status: z.enum(['pending', 'paid'])
})

export const InvoiceSChema: z.ZodType<Invoice> = BaseInvoiceSchema

export type InvoiceSchemaType = z.infer<typeof InvoiceSChema>

export const InvoiceCreationSchema = BaseInvoiceSchema.omit({ id: true });

export type InvoiceCreation = z.infer<typeof InvoiceCreationSchema>