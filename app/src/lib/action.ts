"use server";
import { revalidatePath } from "next/cache";

import { createInvoiceOnDB, deleteInvoiceOnDB, updateInvoiceOnDB } from "./data";
import { InvoiceCreation, InvoiceCreationSchema, InvoiceSChema } from "./zod";
import { redirect } from "next/navigation";
import { object } from "zod";

export const CreateInvoice = async (formData: FormData) => {

  const { data, success, error } = InvoiceCreationSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (error) {
    console.log('error :', error.errors)
    return
  }
  const amountInCents = data?.amount * 100;
  const invoice: InvoiceCreation = { ...data, amount: amountInCents };
  createInvoiceOnDB(invoice);
  revalidatePath('/dashboard/invoices')
  redirect('/dashboard/invoices');
};

export const editInvoice = async (id: string, formData: FormData) => {

  const mappedInvoice = {
    ...Object.fromEntries(formData.entries()),
    id
  }

  const { success, data, error } = InvoiceSChema.safeParse(mappedInvoice);
  
  console.log('DATA UPDATE : ', data);
  if (error) {
    console.log("ERROR : ", error.errors);
    return
  }
  await updateInvoiceOnDB(data);
  revalidatePath('/dashboard/invoices')
  redirect('/dashboard/invoices');

}

export async function deleteInvoice(id: string) {
  await deleteInvoiceOnDB(id);
  revalidatePath('/dashboard/invoices');
}