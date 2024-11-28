import {useCTAState} from '~/contexts';
import {Description} from './description';
import {Link, useLocation} from '@remix-run/react';
import LeaderboardRoute from '~/routes/countdown.leaderboard';

interface FooterProps {
  isGameActive: boolean;
}

export function Footer({isGameActive}: FooterProps) {
  const location = useLocation();
  const {countdownIsShowingDescription: isShowingDescription} = useCTAState();
  
  const isProductShowing =
    location.pathname.includes('countdown') &&
    location.pathname.includes('product');

  const isLeaderboardShowing =
    location.pathname.includes('countdown') &&
    location.pathname.includes('leaderboard');

  return (
    <div
      className="overflow-hidden transition-[height] duration-500 ease-out w-full bg-white flex flex-col justify-start items-center"
      style={{height: isShowingDescription ? '200px' : '50px'}}
      id="hub-footer"
    >
      {isProductShowing ? (
        <Description />
      ) : !isGameActive && (
        <Link
          to={isLeaderboardShowing ? "/countdown" : "/countdown/leaderboard"}
          prefetch="intent"
          className="w-full flex flex-row justify-center items-center"
          id="hub-footer-toggle"
        >
          <h3
            className="h-[50px] text-center flex items-center pb-[2px] underline text-black text-sm font-bold"
            id="hub-footer-toggle-label"
          >
            {isLeaderboardShowing ? 'BACK TO GAME' : 'LEADERBOARD'}
          </h3>
        </Link>
      )}
    </div>
  );
}