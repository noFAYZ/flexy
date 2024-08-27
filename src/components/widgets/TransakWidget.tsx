import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { TransakConfig, Transak } from '@transak/transak-sdk';

const TransakWidget: React.FC = () => {
  const [TransakComponent, setTransakComponent] = useState<any>(null);

  useEffect(() => {
    const loadTransak = async () => {
      const TransakSDK = await import('@transak/transak-sdk');
      const {  Transak } = TransakSDK;

      const transakConfig: TransakConfig = {
        apiKey:'710b080f-92e6-426a-bb7f-34bebba155fe',
        environment: Transak.ENVIRONMENTS.STAGING,
        // Add other configuration options as needed
      };

      const transakInstance = new Transak(transakConfig);

      transakInstance.init();
      // Event listeners
      Transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
        console.log('Transak widget closed');
      });

      Transak.on(Transak.EVENTS.TRANSAK_ORDER_CREATED, (orderData) => {
        console.log('Order created:', orderData);
      });

      Transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
        console.log('Order successful:', orderData);
        transakInstance.close();
      });

      setTransakComponent(() => () => (
        <button onClick={() => transakInstance.init()}>Open Transak Widget</button>
      ));
    };

    loadTransak();
  }, []);

  return TransakComponent ? <TransakComponent /> : null;
};

export default dynamic(() => Promise.resolve(TransakWidget), { ssr: false });