import { useState, useEffect } from "react";

export function Timer() {
  const [timeRemaining, setTimeRemaining] = useState<string>("00:00:00:00");

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

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const release = new Date(productData.releaseDate).getTime();
      const difference = release - now;

      if (difference <= 0) {
        setTimeRemaining("00:00:00:00");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeRemaining(
        `${days.toString().padStart(2, "0")}:${hours
          .toString()
          .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      );
    };

    calculateTimeRemaining(); // Initial calculation
    const interval = setInterval(calculateTimeRemaining, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [productData.releaseDate]);

  return (
    <div
      className="w-full h-50 flex flex-col justify-center items-center p-[10px] bg-white text-[#ff4747] rounded-tl-[15px] rounded-tr-[15px] border border-[#ff4747]"
      id="timer"
    >
      <h4
        className="text-xs leading-snug font-bold tracking-wide"
        id="timer-subtitle"
      >
        WEBSITE OPENS IN
      </h4>
      <h4
        className="text-[28px] leading-9 font-bold tracking-wide"
        id="timer-title"
      >
        {timeRemaining}
      </h4>
    </div>
  );
}
