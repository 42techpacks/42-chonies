import {useState, useEffect} from 'react';
import {useCTAState} from '~/contexts';
import {AvailableHeader, AvailableFooter, SizeGuide} from './available';
import {CountdownHeader, CountdownFooter, CountdownTimer} from './countdown';
import {
  useLocation,
  useRouteError,
  isRouteErrorResponse,
} from '@remix-run/react';
import {
  SoldoutEmailSignup,
  SoldoutFooter,
  SoldoutHeader,
  soldOutClickHandler,
} from './soldout';
// import { onClickHandler as onClickHandlerInSoldOut } from "~/routes/soldout";

type Route = 'AVAILABLE' | 'COUNTDOWN' | 'SOLDOUT';

export function CTAHub() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return;
  }

  const [buttonHighlight, setButtonHighlight] = useState<boolean>(false);
  const location = useLocation();
  const {
    soldoutIsShowingEmailInput: isShowingEmailInput,
    countdownIsProductShowing: isProductShowing,
    dispatch,
  } = useCTAState();

  // Timer to handle button highlight effect
  useEffect(() => {
    //TODO: Bring back
    // if (!enableFlash) return;

    const interval = setInterval(() => {
      setButtonHighlight(true);
      setTimeout(() => setButtonHighlight(false), 400); // Highlight for 1 second
    }, 2000); // Every 3 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  {
    /* Get rendered route from URL */
  }
  let route: Route = 'AVAILABLE';
  if (location.pathname.includes('countdown')) {
    route = 'COUNTDOWN';
  }
  if (location.pathname.includes('soldout')) {
    route = 'SOLDOUT';
  }

  return (
    <div
      className="w-full fixed bottom-[0px] flex flex-col items-center justify-center text-black font-['Montserrat'] box-border"
      id="hub-container"
    >
      {/* Header */}
      {route === 'AVAILABLE' && <AvailableHeader />}
      {route === 'COUNTDOWN' && <CountdownHeader />}
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
            buttonHighlight
              ? 'bg-white text-[#ff4747]'
              : 'bg-[#ff4747] text-white'
          }`}
          id="cta-button"
          onClick={() => {
            route === 'AVAILABLE' && console.log('avbaialble click');
            route === 'COUNTDOWN' && console.log('coundwown click');
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
            {route === 'COUNTDOWN' && !isProductShowing && (
              <span className="text-[55px]">PUNCH</span>
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
