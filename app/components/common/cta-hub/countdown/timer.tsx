import {useState, useEffect, useRef} from 'react';
import {useCTAState} from '~/contexts';
import {Form} from '@remix-run/react';

export function Timer() {
  const [timeRemaining, setTimeRemaining] = useState<string>('00:00:00:00');
  const formRef = useRef(null);

  const {countdownIsShowingLeaderboardInput: isShowingLeaderboardInput} =
    useCTAState();

  const productData = {
    price: '42',
    description: [
      '1 free chonie',
      'random color',
      'ships next day',
      'we love you guys!',
    ],
    releaseDate: '2024-11-28T12:00-08:00',
  };

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const release = new Date(productData.releaseDate).getTime();
      const difference = release - now;

      if (difference <= 0) {
        setTimeRemaining('00:00:00:00');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeRemaining(
        `${days.toString().padStart(2, '0')}:${hours
          .toString()
          .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}`,
      );
    };

    calculateTimeRemaining(); // Initial calculation
    const interval = setInterval(calculateTimeRemaining, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [productData.releaseDate]);

  return (
    <div
      className="overflow-hidden transition-[height] duration-500 ease-out w-full flex flex-col justify-start items-center border border-[#ff4747] rounded-tl-[15px] rounded-tr-[15px]"
      style={{height: isShowingLeaderboardInput ? '250px' : '50px'}}
    >
      {/* Header */}
      <div className="w-full min-h-[50px] flex flex-col justify-center items-center text-[#ff4747] box-border border-b border-[#ff4747]">
        <h4
          className="text-[12px] h-auto font-bold tracking-wide flex flex-col justify-center items-center"
          id="timer-subtitle"
        >
          WEBSITE OPENS IN
          <span className="text-[15px]" id="timer-title">
            {timeRemaining}
          </span>
        </h4>
      </div>
      {/* Email Form */}
      <Form
        className="w-full h-auto flex flex-col justify-center items-center gap-[20px]"
        method="post"
        ref={formRef}
        onSubmit={() => console.log('Form Submitted.')}
      >
        <div className="w-full flex flex-col justify-center items-center gap-[5px] pt-[20px]">
          <h3 className="font-bold text-black tracking-wide text-xl">
            DO YOU SUCK?
          </h3>
          <p className="font-normal tracking-wide text-m">
            Enter your name to save your score.
          </p>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-[20px] pl-[15px] pr-[15px]">
          <p className="w-full flex h-[50px] justify-start items-center gap-[10px] border border-black rounded-[25px] pl-[15px] pr-[15px]">
            <input
              className="w-full h-[40px] border-0 bg-white focus:outline-none placeholder:text-grey placeholder:text-[18px] text-[18px]"
              placeholder="notnik"
              type="email"
              name="email"
            />
          </p>
          <p
            className="text-red-500 mt-[-10px] opacity-[1]"
            id="validation-error"
          >
            Please enter a valid name.
          </p>
        </div>
      </Form>
    </div>
  );
}
