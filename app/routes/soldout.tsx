import {useCTAState} from '~/contexts';
import {useEffect} from 'react';
import deshea_needs_to_pee from '~/assets/deshea2.png'

export default function Soldout() {
  const {soldoutIsShowingEmailInput: isShowingEmailInput} = useCTAState();

  return (
    <div
      className=" w-[100vw] h-[100vh] flex justify-center items-start transition-[padding-top] ease-out duration-[500ms]"
      style={{paddingTop: isShowingEmailInput ? '175px' : '275px'}}
    >
      <img src={deshea_needs_to_pee} alt="Deshea Wanting To Use The Bathroom" />
    </div>
  );
}
