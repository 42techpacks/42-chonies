import {SizeSelect} from './size-select';
import {type Size, useCTAState} from '~/contexts';

export function SizeGuide({availableSizes}: {availableSizes: Size[]}) {
  const {availableIsShowingSizeGuide: isShowingSizeGuide} = useCTAState();

  const sizeGuideData = [
    {
      label: 'Waist',
      sizes: ['28-30"', '30-32"', '32-34"', '34-36"', '36-38"'],
    },
    {
      label: 'Outseam',
      sizes: ['9.25"', '9.75"', '10.25"', '11.25"', '11.75"'],
    },
  ];
  return (
    <div
      className={`overflow-hidden transition-[height] duration-500 ease-out w-full bg-white flex justify-center items-start text-[#ff4747]`}
      style={{height: isShowingSizeGuide ? '150px' : '50px'}}
    >
      <table className="overflow-hidden w-full h-full border-separate border border-[#ff4747] border-spacing-0 rounded-tl-[15px] rounded-tr-[15px]">
        <thead>
          <SizeSelect availableSizes={availableSizes} />
        </thead>
        <tbody className="align-top">
          {sizeGuideData.map((row) => (
            <tr key={row.label}>
              <td className="w-[75px] p-[10px] text-center">
                <p className="text-xs">{row.label}</p>
              </td>
              {row.sizes.map((size, index) => (
                <td key={index} className="text-center">
                  <p className="text-xs p-[10px]">{size}</p>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
