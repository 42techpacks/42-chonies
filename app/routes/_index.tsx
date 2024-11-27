export default function Homepage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <div className="h-[144px] w-[434px]">
            {/* <fetcher.Form method="post"> */}
            <button
              type="submit"
              className="bg-red-600 font-bold text-white py-8 px-16 rounded text-3xl w-96 mx-auto block mt-8"
            >
              BUY NOW
            </button>
            {/* </fetcher.Form> */}
          </div>
        </header>
      </div>
    </div>
  );
}
