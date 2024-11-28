import {useCTAState} from '~/contexts';
import {useActionData, useLoaderData, useLocation} from '@remix-run/react';

import {useState, useEffect} from 'react';
import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';

import punchIcon from '~/assets/punch.png';
import punchLeft from '~/assets/deshea-punch-left.png';
import punchRight from '~/assets/deshea-punch-right.png';
import damage0 from '~/assets/deshea1.png';
import {cgInitState} from '~/components/common/cta-hub';

export async function clientLoader(args: LoaderFunctionArgs) {
  return json({...args});
}
export default function Countdown() {
  const location = useLocation();
  const [isPunching, setIsPunching] = useState<boolean>(false);
  const [isPunchingLeft, setIsPunchingLeft] = useState<boolean>(false);
  const [desheaFrame, setDesheaFrame] = useState<string>(damage0);

  const punchImage = useEffect(() => {
    if (location.state?.numPunches) {
      // Trigger punch animation
      setIsPunching(true);
      setIsPunchingLeft((prev) => !prev);

      // Reset animations
      const timer = setTimeout(() => {
        setIsPunching(false);
      }, 50); // Adjust timing as needed

      return () => clearTimeout(timer);
    }
  }, [location.state?.numPunches]);

  useEffect(() => {
    if (location.state?.isInProgress && isPunching) {
      setDesheaFrame(isPunchingLeft ? punchLeft : punchRight);
    } else {
      setDesheaFrame(location.state ? location.state.currentImage : damage0);
    }
  }, [location, isPunching, isPunchingLeft]);

  return (
    <>
      <div
        className="w-full h-[500px] flex flex-col justify-center border-none items-center p-[20px] gap-[50px]"
        id="countdown-game-container"
      >
        <div
          className="w-full flex flex-col justify-center items-center bg-white"
          id="countdown-game-header"
        >
          <h2 className="text-lg font-bold tracking-wide mb-[-10px]">SCORE</h2>
          <div className="w-full flex justify-center items-center gap-[5px]">
            <img className="h-[35px]" src={punchIcon} alt="Punch Icon" />
            <h3
              className="text-[45px] font-bold tracking-wide"
              id="countdown-game-time-remaining"
            >
              {location.state
                ? location.state?.numPunches
                : `${cgInitState.numPunches}`}{' '}
            </h3>
            {/* <img className="h-[45px]" src={punchIcon} alt="Punch Icon" /> */}
          </div>
        </div>
        <img className="h-[300px]" src={desheaFrame} alt="Deshea" />
      </div>
    </>
  );
}
