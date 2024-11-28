import {Link, useLocation} from '@remix-run/react';
import {type Dispatch} from 'react';

interface CountdownHeaderProps {
  timeRemaining: number;
  dispatch: Dispatch<{type: string}>;
}
export function Header({timeRemaining, dispatch}: CountdownHeaderProps) {
  const location = useLocation();
  const isProductShowing =
    location.pathname.includes('countdown') &&
    location.pathname.includes('product');

  return (
    <div
      className="h-[50px] w-full flex flex-row justify-between items-end pb-[10px] pr-[20px] pl-[20px]"
      id="hub-header"
    >
      <h2 className="text-black text-3xl font-bold" id="hub-header-left">
        {isProductShowing
          ? '$42'
          : `${location.state ? location.state?.timeRemaining : '0'}s`}
      </h2>
      <Link to={`/countdown${!isProductShowing ? '/product' : ''}`}>
        <button
          className="flex flex-row justify-center items-center"
          id="header-toggle"
          onClick={() => {
            if (isProductShowing) {
              dispatch({type: 'RESET'});
            }
          }}
        >
          <h3
            className="border border-black rounded-[15px] p-[5px] pl-[10px] pr-[10px] text-black text-sm font-bold"
            id="hub-header-left"
          >
            {isProductShowing
              ? 'PLAY GAME'
              : timeRemaining === 0
              ? 'RESET GAME'
              : 'VIEW PRODUCT'}
          </h3>
        </button>
      </Link>
    </div>
  );
}
