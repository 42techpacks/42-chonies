// import type {MetaFunction} from '@remix-run/node';
// import {json, redirect} from '@remix-run/node';
// import Countdown from "./countdown";
import black_chonie from '~/assets/black-chonie.png';
import type {MetaFunction} from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    {title: 'IONGAF HOME'},
    {name: 'description', content: 'IONGAF IONGAF IONGAF IONGAF'},
  ];
};

// export const loader = async () => {
//   console.log('loader');
//   return json({});
// };

// export const action = async () => {
//   console.log('action');
//   return json({});
// };

export default function Available() {
  // Dummy Images
  const images = [
    {src: black_chonie, alt: 'Black Chonie 1'},
    {src: black_chonie, alt: 'Black Chonie 2'},
    {src: black_chonie, alt: 'Black Chonie 3'},
    {src: black_chonie, alt: 'Black Chonie 4'},
    {src: black_chonie, alt: 'Black Chonie 1'},
    {src: black_chonie, alt: 'Black Chonie 2'},
    {src: black_chonie, alt: 'Black Chonie 3'},
    {src: black_chonie, alt: 'Black Chonie 4'},
    {src: black_chonie, alt: 'Black Chonie 1'},
    {src: black_chonie, alt: 'Black Chonie 2'},
    {src: black_chonie, alt: 'Black Chonie 3'},
    {src: black_chonie, alt: 'Black Chonie 4'},
  ];

  /* Load 'AVAILABLE' state by default */
  return (
    <div
      className="flex flex-col h-screen items-center justify-start text-black"
      id="available"
    >
      <div
        className="w-full flex flex-col justify-center items-center pt-[150px] pb-[350px]"
        id="available-main"
      >
        {images.map((image) => (
          <div
            key={image.alt}
            className="w-full h-[430px] flex justify-center items-center"
            id="image-container"
          >
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
    </div>
  );
}
