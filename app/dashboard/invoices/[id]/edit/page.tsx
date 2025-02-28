import Form from "@/app/src/ui/invoices/edit-form";
import Breadcrumbs from "@/app/src/ui/invoices/breadcrumbs";
import { fetchCustomers, fetchInvoiceById } from "@/app/src/lib/data";

interface IProps {
  params: Promise<{
    id: string;
  }>;
}
export default async function Page({ params }: IProps) {

  const id = (await params).id
  const data = await fetchInvoiceById(id);
  const customers = await fetchCustomers()
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={data} customers={customers} />
    </main>
  );
}
