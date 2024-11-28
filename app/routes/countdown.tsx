// import {type ActionFunctionArgs} from '@shopify/remix-oxygen';
import {Outlet} from '@remix-run/react';
import {useEffect, useState} from 'react';
import {json} from '@shopify/remix-oxygen';

export default function CountdownLayout() {
  // const actionData = useActionData();
  // useEffect(() => {
  //   console.log(actionData);
  // }, [actionData]);
  return (
    <div
      className="w-full flex flex-col justify-center items-center pt-[70px]"
      id="countdown-main"
    >
      <Outlet />
    </div>
  );
}
