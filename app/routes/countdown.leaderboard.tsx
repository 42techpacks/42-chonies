import {useState} from 'react';
import head_icon from '~/assets/head-icon.png';

export default function LeaderboardRoute() {
  const leaderboardData = [
    { score: 69, name: "ricky" },
    { score: 69, name: "faizan" },
    { score: 69, name: "kenny" },
    { score: 69, name: "milo" },
    { score: 50, name: "jonpork" },
    { score: 49, name: "steve" },
    { score: 48, name: "deshealuvr123" },
    { score: 48, name: "the_diddler" },
    { score: 45, name: "not_nik" },
    { score: 43, name: "still_not_nik" },
    { score: 42, name: "neymar" },
    { score: 42, name: "kenjaminfranklin" },
    { score: 30, name: "alex_caruso24" },
    { score: 21, name: "tacofalls69" },
    { score: 15, name: "anuelaaaaaaaaaaa" },
    { score: 115, name: "anuelaa" },
    { score: 115, name: "anuelaa" }
  ].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="w-full h-full flex flex-col items-center p-[20px] justify-start" id="leaderboard-container">
      {/* Fixed header section */}
      <div className="h-[110px] py-5 bg-white justify-between items-center inline-flex w-full px-8">
        <div className="flex-col justify-start items-start inline-flex">
          <div className="text-black text-[19px] font-bold leading-tight tracking-wide mb-1">
            LEADERBOARD
          </div>
          <div className="text-black text-[40px] font-bold leading-none tracking-wide">
            ALL-TIME
          </div>
        </div>
        <img className="w-[71px] h-[68px]" src={head_icon} alt="Head Icon" />
      </div>

      {/* Scrollable leaderboard content */}
      <div className="w-full flex-1 overflow-y-auto px-[60px] mt-8 pb-[350px]">
        {leaderboardData.map(({score, name}, index) => (
          <div key={index} className="self-stretch justify-between items-center inline-flex w-full ">
            <div className="text-center text-black text-lg font-normal font-['Montserrat'] leading-loose tracking-wide">
              {score}
            </div>
            <div className="text-center text-black text-lg font-normal font-['Montserrat'] leading-loose tracking-wide">
              {name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}