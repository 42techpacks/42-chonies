import {useCTAState} from '~/contexts';

export function Footer() {
  const {availableIsShowingDescription: isShowingDescription, dispatch} =
    useCTAState();

  const downArrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="30px"
      viewBox="0 -960 960 960"
      width="30px"
      fill="#00000"
    >
      <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
    </svg>
  );

  const upArrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="30px"
      viewBox="0 -960 960 960"
      width="30px"
      fill="#00000"
    >
      <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
    </svg>
  );

  const productData = {
    price: '42',
    description: [
      '1 free chonie',
      'random color',
      'ships next day',
      'we love you guys!',
    ],
    releaseDate: '2024-11-27T12:00-08:00',
  };

  return (
    <div
      className="overflow-hidden transition-[height] duration-500 ease-out w-full bg-white flex flex-col justify-start items-center"
      style={{height: isShowingDescription ? '200px' : '50px'}}
      id="hub-footer"
    >
      <button
        className="w-full flex flex-row justify-center items-center"
        id="hub-footer-toggle"
        onClick={() => dispatch({type: 'AVAILABLE_TOGGLE_DESCRIPTION'})}
      >
        <h3
          className="h-[50px] text-center flex items-center pb-[2px] text-black text-sm font-bold"
          id="hub-footer-toggle-label"
        >
          DESCRIPTION
        </h3>
        {isShowingDescription ? upArrow : downArrow}
      </button>
      <div
        className="h-auto w-full flex flex-col justify-start items-center font-normal tracking-wide leading-[27px]"
        id="hub-footer-main"
      >
        {productData.description.map((desc, index) => (
          <p key={index}>{desc}</p>
        ))}
      </div>
    </div>
  );
}
