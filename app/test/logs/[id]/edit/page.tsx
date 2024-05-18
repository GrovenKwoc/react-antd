import Form from '@/app/component/log/edit-form';
import Breadcrumbs from '@/app/component/breadcrumbs';
import { fetchRecordById, fetchAllHaters } from '@/app/lib/data';
import { notFound } from 'next/navigation';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Record',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [record, haters] = await Promise.all([
    fetchRecordById(id),
    fetchAllHaters(),
  ]);

  if (!record) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Records', href: '/diary/record' },
          {
            label: 'Edit Record',
            href: `/diary/record/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form record={record} haters={haters} />
    </main>
  );
}
