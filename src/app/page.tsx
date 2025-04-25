import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const DoctorListingContent = dynamic(
  () => import('@/components/DoctorListingContent'),
  {
    loading: () => <div>Loading...</div>,
    ssr: false
  }
);

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DoctorListingContent />
    </Suspense>
  );
} 