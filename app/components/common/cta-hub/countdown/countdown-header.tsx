import {Link, replace, useLocation, useNavigate} from '@remix-run/react';
import {type Dispatch} from 'react';
import {cgInitState} from '../cta-hub';

interface CountdownHeaderProps {
  timeRemaining: number;
  dispatch: Dispatch<{type: string}>;
}
export function Header({timeRemaining, dispatch}: CountdownHeaderProps) {
  const location = useLocation();
  const nav = useNavigate();
  const price = '$42'; //TODO: load from shopify
  const isProductShowing =
    location.pathname.includes('countdown') &&
    location.pathname.includes('product');
  
  const isLeaderboardShowing =
    location.pathname.includes('countdown') &&
    location.pathname.includes('leaderboard');

  let buttonLabel: string;
  let buttonOnclick: () => void = () => {};
  let priceLabel = `${timeRemaining}s`;

  if (isProductShowing) {
    priceLabel = price;
    buttonLabel = 'PLAY GAME';
    buttonOnclick = () => {
      dispatch({type: 'RESET'});
      nav('/countdown', {replace: true});
    };
  } else if (timeRemaining === 0) {
    buttonLabel = 'RESET GAME';
    buttonOnclick = () => {
      dispatch({type: 'RESET'});
      nav('/countdown', {replace: true, state: {...cgInitState}});
    };
  } else if (isLeaderboardShowing) {
    // No button or price needed for leaderboard
  } else {
    buttonLabel = 'VIEW PRODUCT';
    buttonOnclick = () => {
      dispatch({type: 'RESET'});
      nav('/countdown/product');
    };
  }

  return (
    <div
      className="h-[50px] w-full flex flex-row justify-between items-end pb-[10px] pr-[20px] pl-[20px]"
      id="hub-header"
    >
      {!isLeaderboardShowing && (
        <h2 className="text-black text-3xl font-bold" id="hub-header-left">
          {priceLabel}
        </h2>
      )}
      {!isLeaderboardShowing && (
        <button
          className="flex flex-row justify-center items-center"
          id="header-toggle"
          onClick={buttonOnclick}
        >
          <h3
            className="border border-black rounded-[15px] p-[5px] pl-[10px] pr-[10px] text-black text-sm font-bold"
            id="hub-header-left"
          >
            {buttonLabel}
          </h3>
        </button>
      )}
    </div>
  );
}