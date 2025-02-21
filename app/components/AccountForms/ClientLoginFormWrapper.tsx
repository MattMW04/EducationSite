'use client';

import dynamic from 'next/dynamic';

const ClientLoginForm = dynamic(() => import('@/app/components/AccountForms/ClientLoginForm'), { ssr: false });

const ClientLoginWrapper = () => {
    return <ClientLoginForm />;
};

export default ClientLoginWrapper;