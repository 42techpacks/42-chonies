import {useState, useEffect, useReducer} from 'react';
import {useCTAState} from '~/contexts';
import {AvailableHeader, AvailableFooter, SizeGuide} from './available';
import {CountdownHeader, CountdownFooter, CountdownTimer} from './countdown';
import {useLocation, useRouteError, useNavigate} from '@remix-run/react';
import {
  SoldoutEmailSignup,
  SoldoutFooter,
  SoldoutHeader,
  soldOutClickHandler,
} from './soldout';
import damage0 from '~/assets/deshea1.png';
import damage1 from '~/assets/damage-one.png';
import damage2 from '~/assets/damage-two.png';
import damage3 from '~/assets/damage-three.png';
import punchLeft from '~/assets/deshea-punch-left.png';
import punchRight from '~/assets/deshea-punch-right.png';

// import { onClickHandler as onClickHandlerInSoldOut } from "~/routes/soldout";

type Route = 'AVAILABLE' | 'COUNTDOWN' | 'SOLDOUT';

interface CGState {
  timeRemaining: number;
  numPunches: number;
  isInProgress: boolean;
  currentImage: string;
}
export const cgInitState: CGState = {
  timeRemaining: 5,
  numPunches: 0,
  isInProgress: false,
  currentImage: damage0,
};

const cgReducer = (state: CGState, action: {type: string}): CGState => {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        isInProgress: true,
      };
    case 'STOP':
      return {
        ...state,
        isInProgress: false,
      };
    case 'RESET':
      return {
        ...cgInitState,
      };
    case 'TICK':
      if (state.isInProgress) {
        return {
          ...state,
          timeRemaining: state.timeRemaining - 1,
        };
      } else {
        return state;
      }

    case 'PUNCH':
      if (state.timeRemaining === 0) {
        return {
          ...state,
        };
      }
      if (!state.isInProgress) {
        return {
          ...state,
          isInProgress: true,
          numPunches: state.numPunches + 1,
        };
      }

      /* if game is in progress */

      if (state.numPunches < 32) {
        state.currentImage = damage0;
      }

      if (state.numPunches >= 32) {
        state.currentImage = damage1;
      }

      if (state.numPunches >= 65) {
        state.currentImage = damage2;
      }

      /* if game is in progress */
      if (state.numPunches >= 99) {
        state.currentImage = damage3;
      }

      return {
        ...state,
        numPunches: state.numPunches + 1,
      };
    default:
      return state;
  }
};

export function CTAHub() {
  const error = useRouteError();
  // const fetcher = useFetcher();
  const nav = useNavigate();
  const location = useLocation();
  const [buttonHighlight, setButtonHighlight] = useState<boolean>(false);
  const {soldoutIsShowingEmailInput: isShowingEmailInput, dispatch} =
    useCTAState();
  const [cgState, cgDispatch] = useReducer(cgReducer, cgInitState);

  const isProductShowing =
    location.pathname.includes('countdown') &&
    location.pathname.includes('product');

  /* Get rendered route from URL */
  let route: Route = 'AVAILABLE';
  if (location.pathname.includes('countdown')) {
    route = 'COUNTDOWN';
  }
  if (location.pathname.includes('soldout')) {
    route = 'SOLDOUT';
  }

  /* Button Highlight */
  useEffect(() => {
    if (route !== 'AVAILABLE') return;

    const interval = setInterval(() => {
      setButtonHighlight(true);
      setTimeout(() => setButtonHighlight(false), 400); // Highlight for 1 second
    }, 2000); // Every 3 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [route]);

  /* Update viewport w/ latest state */
  useEffect(() => {
    route === 'COUNTDOWN' &&
      !isProductShowing &&
      nav('/countdown', {replace: true, state: {...cgState}});
  }, [cgState, nav, isProductShowing, route]);

  /* Update game timer */
  useEffect(() => {
    if (!cgState.isInProgress) return;
    const interval = setInterval(() => {
      cgDispatch({type: 'TICK'});
      if (cgState.timeRemaining <= 1) {
        cgDispatch({type: 'STOP'});
        nav('/countdown', {replace: true, state: cgInitState});
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [cgState.isInProgress, cgState.timeRemaining]);

  if (error) {
    return;
  }

  return (
    <div
      className="w-full fixed bottom-[0px] flex flex-col items-center justify-center text-black font-['Montserrat'] box-border"
      id="hub-container"
    >
      {/* Header */}
      {route === 'AVAILABLE' && <AvailableHeader />}
      {route === 'COUNTDOWN' && (
        <CountdownHeader
          timeRemaining={cgState.timeRemaining}
          dispatch={cgDispatch}
        />
      )}
      {route === 'SOLDOUT' && <SoldoutHeader />}

      {/* Main */}
      <div
        className="w-full bg-white gap-[0px] flex flex-col justify-center items-center pr-[20px] pl-[20px]"
        id="hub-main"
      >
        {route === 'AVAILABLE' && <SizeGuide />}
        {route === 'COUNTDOWN' && <CountdownTimer />}
        {route === 'SOLDOUT' && <SoldoutEmailSignup />}

        {/* Big CTA Button */}
        <button
          className={`h-[125px] w-full border border-[#ff4747] rounded-bl-[15px] rounded-br-[15px] p-[15px] ${
            buttonHighlight || cgState.timeRemaining === 0
              ? 'bg-white text-[#ff4747]'
              : 'bg-[#ff4747] text-white'
          }`}
          id="cta-button"
          onClick={() => {
            route === 'COUNTDOWN' &&
              !isProductShowing &&
              cgState.timeRemaining !== 0 &&
              cgDispatch({type: 'PUNCH'});
            route === 'COUNTDOWN' &&
              !isProductShowing &&
              cgState.timeRemaining === 0 &&
              dispatch({type: 'COUNTDOWN_TOGGLE_LEADERBOARD_INPUT'});
            route === 'AVAILABLE' && console.log('avbaialble click');
            route === 'SOLDOUT' &&
              soldOutClickHandler(isShowingEmailInput, dispatch);
          }}
        >
          <h2 className="text-[32px] font-bold">
            {/* Available Labels */}
            {route === 'AVAILABLE' && <>CLICK HERE TO BUY NOW</>}

            {/* Countdown Labels */}
            {route === 'COUNTDOWN' && isProductShowing && (
              <>
                YOU CAN'T BUY <br />
                THIS RIGHT NOW
              </>
            )}
            {route === 'COUNTDOWN' &&
              !isProductShowing &&
              cgState.timeRemaining !== 0 &&
              cgState.isInProgress && (
                <span className="text-[55px]">PUNCH</span>
              )}

            {route === 'COUNTDOWN' &&
              !isProductShowing &&
              cgState.timeRemaining !== 0 &&
              !cgState.isInProgress && (
                <span className="text-[35px]">PUNCH TO START</span>
              )}

            {route === 'COUNTDOWN' &&
              !isProductShowing &&
              cgState.timeRemaining === 0 && (
                <span className="text-[40px] leading-[15px]">
                  SUBMIT TO <br /> LEADERBOARD
                </span>
              )}

            {/* Soldout Labels */}
            {route === 'SOLDOUT' && (
              <>
                {isShowingEmailInput ? (
                  <>SUBMIT</>
                ) : (
                  <>
                    CLICK HERE TO <br /> SAVE DESHEA!
                  </>
                )}
              </>
            )}
          </h2>
        </button>
      </div>

      {/* Footer */}
      {route === 'AVAILABLE' && <AvailableFooter />}
      {route === 'COUNTDOWN' && <CountdownFooter />}
      {route === 'SOLDOUT' && <SoldoutFooter />}
    </div>
  );
}
