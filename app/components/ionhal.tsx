/*
  IONHAL... I dont have a layout
*/

import {CTAProvider} from '~/contexts';
import TopBar from './topbar';
import {Outlet} from '@remix-run/react';
import {CTAHub} from './common/cta-hub';
import React from 'react';

interface IonHalProps {
  children?: React.ReactNode;
}

export function IonHaL({children = null}: IonHalProps) {
  return (
    <>
      <TopBar />
      <CTAProvider>
        {children}
        <CTAHub />
      </CTAProvider>
    </>
  );
}
