import {type Size, useCTAState} from '~/contexts';

export function SizeSelect({availableSizes}: {availableSizes: Size[]}) {
  // Dummy data for the size guide table
  const {availableSelectedSizeIs: selectedSizeIs, dispatch} = useCTAState();

  return (
    <tr className="w-full" id="size-select">
      <th className="h-[50px] w-[75px]">
        <h4
          className="text-center text-[#ff4747] text-sm font-bold"
          id="size-select-label"
        >
          SELECT SIZE
        </h4>
      </th>
      {availableSizes.map((size, index) => (
        <th key={index} className={`h-[50px] p-0`}>
          <button
            className={`w-full h-full transition-all ${
              selectedSizeIs === size
                ? 'bg-[#ff4747] text-white'
                : 'text-[#ff4747]'
            }`}
            onClick={() =>
              dispatch({type: 'AVAILABLE_SET_SIZE', butt_stuff: size})
            }
          >
            <h5 className="text-center font-bold">{size}</h5>
          </button>
        </th>
      ))}
    </tr>
  );
}
