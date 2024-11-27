import {useCTAState} from '~/contexts';
import black_chonie from '~/assets/black-chonie.png';
import deshea1 from '~/assets/deshea1.png';

export default function Countdown() {
  const {countdownIsProductShowing: isProductShowing} = useCTAState();

  return (
    <>
      <div
        className="w-full flex flex-col justify-center items-center pt-[100px]"
        id="countdown-main"
      >
        <div
          className="w-full h-[500px] flex flex-col justify-center items-center"
          id="countdown-game-container"
        >
          {isProductShowing ? (
            <img
              className="w-[214px] h-[154px] blur-[3px]"
              src={black_chonie}
              alt="Black Chonies"
            />
          ) : (
            <img className="h-[300px]" src={deshea1} alt="Deshea" />
          )}
        </div>
      </div>
    </>
  );
}
