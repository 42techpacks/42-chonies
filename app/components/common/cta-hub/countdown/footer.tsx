export function Footer() {
  return (
    <div
      className="overflow-hidden transition-[height] duration-500 ease-out w-full bg-white flex flex-col justify-start items-center"
      style={{ height: "50px" }}
      id="hub-footer"
    >
      <button
        className="w-full flex flex-row justify-center items-center"
        id="hub-footer-toggle"
        onClick={() => null}
      >
        <h3
          className="h-[50px] text-center flex items-center pb-[2px] underline text-black text-sm font-bold"
          id="hub-footer-toggle-label"
        >
          LEADERBOARD
        </h3>
      </button>
    </div>
  );
}
