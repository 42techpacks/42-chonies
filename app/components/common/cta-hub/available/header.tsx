import { useCTAState } from "~/contexts";

export function Header() {
  const { availableIsShowingSizeGuide: isShowingSizeGuide, dispatch } =
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
    price: "42",
    description: [
      "1 free chonie",
      "random color",
      "ships next day",
      "we love you guys!",
    ],
    releaseDate: "2024-11-27T12:00-08:00",
  };

  return (
    <div
      className="h-[50px] w-full flex flex-row justify-between items-end pb-[10px]"
      id="hub-header"
    >
      <h2 className="text-black text-3xl font-bold" id="hub-header-left">
        ${productData.price}
      </h2>
      <button
        className="flex flex-row justify-center items-center"
        id="header-toggle"
        onClick={() => dispatch({ type: "AVAILABLE_TOGGLE_SIZE_GUIDE" })}
      >
        <h3 className="text-black text-sm font-bold" id="hub-header-left">
          SIZE GUIDE
        </h3>
        {isShowingSizeGuide ? upArrow : downArrow}
      </button>
    </div>
  );
}
