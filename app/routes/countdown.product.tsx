import {useState} from 'react';
import black_chonie from '~/assets/black-chonie.png';

export default function CountdownProduct() {
  return (
    <>
      <div
        className="w-full h-[500px] flex flex-col justify-center items-center"
        id="countdown-game-container"
      >
        <img
          className="w-[214px] h-[154px] blur-[3px]"
          src={black_chonie}
          alt="Black Chonies"
        />
      </div>
    </>
  );
}
