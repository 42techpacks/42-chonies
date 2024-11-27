import { Form } from "@remix-run/react";
import { useCTAState } from "~/contexts";
import { useRef, useEffect } from "react";

export function EmailSignup() {
  const {
    soldoutIsShowingEmailInput: isShowingEmailInput,
    soldoutShouldSubmit: shouldSubmit,
    dispatch,
  } = useCTAState();
  const formRef = useRef<HTMLFormElement>(null);

  const onFormSubmit = () => {
    console.log("Form submitted.");
  };

  const mailIcon = (
    <svg
      width="24"
      height="30"
      viewBox="0 0 17 15"
      fill="black"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.66667 14.5C1.20833 14.5 0.815972 14.3286 0.489583 13.9859C0.163194 13.6432 0 13.2312 0 12.75V2.25C0 1.76875 0.163194 1.35677 0.489583 1.01406C0.815972 0.671354 1.20833 0.5 1.66667 0.5H15C15.4583 0.5 15.8507 0.671354 16.1771 1.01406C16.5035 1.35677 16.6667 1.76875 16.6667 2.25V12.75C16.6667 13.2312 16.5035 13.6432 16.1771 13.9859C15.8507 14.3286 15.4583 14.5 15 14.5H1.66667ZM8.33333 8.375L1.66667 4V12.75H15V4L8.33333 8.375ZM8.33333 6.625L15 2.25H1.66667L8.33333 6.625ZM1.66667 4V2.25V12.75V4Z"
        fill="black"
      />
    </svg>
  );

  useEffect(() => {
    console.log(shouldSubmit);
    if (shouldSubmit) {
      formRef.current?.requestSubmit();
      dispatch({ type: "SOLDOUT_SET_SHOULD_SUBMIT", shouldSubmit: false });
    }
  }, [shouldSubmit, dispatch]);

  return (
    <div
      className="overflow-hidden transition-[height] duration-500 ease-out w-full flex flex-col justify-start items-center border border-[#ff4747] rounded-tl-[15px] rounded-tr-[15px]"
      style={{ height: isShowingEmailInput ? "250px" : "50px" }}
    >
      {/* Header */}
      <div className="w-full h-[50px] flex flex-col justify-center items-center border-b border-[#ff4747]">
        <h2 className="h-[50px] flex justify-center items-center text-xl font-bold text-[#ff4747]">
          SOLD OUT
        </h2>
      </div>
      {/* Email Form */}
      <Form
        className="w-full h-auto flex flex-col justify-center items-center p-[20px] gap-[20px]"
        method="post"
        ref={formRef}
        onSubmit={onFormSubmit}
      >
        <div className="w-full flex flex-col justify-center items-center gap-[5px]">
          <h3 className="font-bold text-black tracking-wide text-xl">
            TIRED OF MISSING OUT?
          </h3>
          <p className="font-normal tracking-wide text-m">
            Sign up for the IONGAF newsletter.
          </p>
        </div>
        <p className="w-full flex justify-start items-center gap-[10px] border border-black rounded-[25px] pl-[15px] pr-[15px]">
          {mailIcon}
          <input
            className="w-full h-[45px] bg-white focus:outline-none placeholder:text-grey placeholder:text-[18px] text-[18px]"
            placeholder="nik@fortytwoco.net"
            type="email"
            name="email"
          />
        </p>
        <p
          className="text-red-500 mt-[-10px] opacity-[0.3]"
          id="validation-error"
        >
          Please enter a valid email.
        </p>
      </Form>
    </div>
  );
}
