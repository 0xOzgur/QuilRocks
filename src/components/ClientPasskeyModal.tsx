'use client';

import dynamic from 'next/dynamic';

const PasskeyModal = dynamic(() => import('./modals/PasskeyModal').then(mod => mod.PasskeyModal), { ssr: false });

export default function ClientPasskeyModal() {
  return <PasskeyModal />;
}