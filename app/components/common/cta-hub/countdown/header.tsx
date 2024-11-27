import {useCTAState} from '~/contexts';

export function Header() {
  const {countdownIsProductShowing: isProductShowing} = useCTAState();

  return (
    <div
      className="h-[50px] w-full flex flex-row justify-between items-end pb-[10px] pr-[20px] pl-[20px]"
      id="hub-header"
    >
      <h2 className="text-black text-3xl font-bold" id="hub-header-left">
        {isProductShowing ? '$42' : '0 PUNCHES'}
      </h2>
      <button
        className="flex flex-row justify-center items-center"
        id="header-toggle"
        onClick={() => {
          console.log('TODO: Redirect to /countdown/game/leaderboard');
        }}
      >
        <h3
          className="border border-black rounded-[15px] p-[5px] pl-[10px] pr-[10px] text-black text-sm font-bold"
          id="hub-header-left"
        >
          {isProductShowing ? 'PLAY GAME' : 'VIEW PRODUCT'}
        </h3>
      </button>
    </div>
  );
}
