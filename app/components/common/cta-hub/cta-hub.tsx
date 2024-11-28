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
import clsx from 'clsx';

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
        numPunches: state.numPunches + 1,
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

  const gameOver =
    !isProductShowing && cgState.timeRemaining === 0 && !cgState.isInProgress;

  const [enableFlash, setEnableFlash] = useState<boolean>(
    route === 'AVAILABLE',
  );

  /* Button Highlight */
  useEffect(() => {
    if (!enableFlash) return;

    const interval = setInterval(() => {
      setButtonHighlight(true);
      setTimeout(() => {
        setButtonHighlight(false);
        if (gameOver) {
          setTimeout(() => {
            setEnableFlash(false);
          }, 3000);
        }
      }, 300);
    }, 1000);

    return () => clearInterval(interval);
  }, [enableFlash, gameOver]);

  /* Update viewport w/ latest state */
  useEffect(() => {
    if (cgState.isInProgress)
      nav('/countdown', {replace: true, state: {...cgState}});
  }, [cgState, nav, isProductShowing, route]);

  /* Update game timer */
  useEffect(() => {
    if (!cgState.isInProgress) return;
    const interval = setInterval(() => {
      cgDispatch({type: 'TICK'});
      if (cgState.timeRemaining <= 1) {
        cgDispatch({type: 'STOP'});
        setEnableFlash(true);
        // nav('/countdown', {replace: true});
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [cgState.isInProgress, cgState.timeRemaining]);

  if (error) {
    return;
  }

  const cgStateUpdater = () => {
    if (
      route === 'COUNTDOWN' &&
      !isProductShowing &&
      cgState.timeRemaining === cgInitState.timeRemaining &&
      !cgState.isInProgress
    )
      cgDispatch({type: 'START'});
    if (cgState.isInProgress) cgDispatch({type: 'PUNCH'});
  };

  let header = <AvailableHeader />;
  if (route === 'COUNTDOWN') {
    header = (
      <CountdownHeader
        timeRemaining={cgState.timeRemaining}
        dispatch={cgDispatch}
      />
    );
  }
  if (route === 'SOLDOUT') {
    header = <SoldoutHeader />;
  }

  let main = <SizeGuide />;
  if (route === 'COUNTDOWN') {
    main = <CountdownTimer />;
  }
  if (route === 'SOLDOUT') {
    main = <SoldoutEmailSignup />;
  }

  let footer = <AvailableFooter />;
  if (route === 'COUNTDOWN') {
    footer = <CountdownFooter />;
  }
  if (route === 'SOLDOUT') {
    footer = <SoldoutFooter />;
  }

  let buttonLabel;
  if (route === 'AVAILABLE') {
    buttonLabel = 'CLICK HERE TO BUY NOW';
  } else if (route === 'COUNTDOWN') {
    if (isProductShowing) {
      buttonLabel = (
        <>
          YOU CAN'T BUY <br />
          THIS RIGHT NOW
        </>
      );
    } else if (
      !isProductShowing &&
      cgState.timeRemaining !== 0 &&
      cgState.isInProgress
    ) {
      buttonLabel = <span className="text-[55px]">PUNCH</span>;
    } else if (
      !isProductShowing &&
      cgState.timeRemaining !== 0 &&
      !cgState.isInProgress
    ) {
      buttonLabel = <span className="text-[35px]">PUNCH TO START</span>;
    } else if (
      !isProductShowing &&
      cgState.timeRemaining === 0 &&
      !enableFlash
    ) {
      buttonLabel = (
        <span className="text-[40px] leading-[15px]">
          SUBMIT TO <br /> LEADERBOARD
        </span>
      );
    } else if (
      !isProductShowing &&
      cgState.timeRemaining === 0 &&
      enableFlash
    ) {
      buttonLabel = (
        <span className="text-[55px] leading-[15px]">GAME OVER</span>
      );
    }
  } else if (route === 'SOLDOUT') {
    buttonLabel = isShowingEmailInput ? (
      'SUBMIT'
    ) : (
      <>
        CLICK HERE TO <br /> SAVE DESHEA!
      </>
    );
  }

  const buttonOnClick = () => {
    cgStateUpdater();
    if (gameOver && !enableFlash)
      dispatch({type: 'COUNTDOWN_TOGGLE_LEADERBOARD_INPUT'});
    route === 'AVAILABLE' && console.log('avbaialble click');
    route === 'SOLDOUT' && soldOutClickHandler(isShowingEmailInput, dispatch);
  };

  return (
    <div
      className="w-full fixed bottom-[0px] flex flex-col items-center justify-center text-black font-['Montserrat'] box-border"
      id="hub-container"
    >
      {/* Header */}
      {header}

      {/* Main */}
      <div
        className="w-full bg-white gap-[0px] flex flex-col justify-center items-center pr-[20px] pl-[20px]"
        id="hub-main"
      >
        {main}

        {/* Big CTA Button */}
        <button
          className={clsx(
            'h-[125px] w-full border border-[#ff4747] rounded-bl-[15px] rounded-br-[15px] p-[15px]',
            buttonHighlight
              ? 'bg-white text-[#ff4747]'
              : 'bg-[#ff4747] text-white',
          )}
          id="cta-button"
          onClick={buttonOnClick}
        >
          <h2 className="text-[32px] font-bold">{buttonLabel}</h2>
        </button>
      </div>

      {/* Footer */}
      {footer}
    </div>
  );
}
