import { setOption } from '@/reducers/filterSlice';
import { useAppDispatch } from '@/reducers/reduxHooks';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { IDropdownOption } from './Dropdown';

interface IDropdownProps {
  options: IDropdownOption[];
  type?: string;
  placeHolder?: string;
}

const SearchOptionBar = ({ options, placeHolder }: IDropdownProps) => {
  const dispatch = useAppDispatch();
  const [isFocused, setIsFocused] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | string>();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        setIsFocused(false);
      }
    }
    // attaches an eventListener to listen when componentDidMount
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // optionally returning a func in useEffect runs like
      // componentWillUnmount to cleanup
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const onValueChange = (
    label: string | number,
    selectedValue: string | number
  ) => {
    setSelectedItem(label);
    setIsFocused(false);
    if (typeof selectedValue == 'string') {
      dispatch(setOption({ options: { category: selectedValue } }));
    }
  };
  useEffect(() => {
    setIsFocused(false);
  }, [selectedItem]);

  return (
    <div className="relative inline-block z-50" ref={wrapperRef}>
      <span
        className="relative w-20 h-7 pt-0 pl-1 text-base text-white bg-sky-300 flex justify-around items-center rounded-l-sm cursor-pointer hover:bg-blue-200 focus:border-2 focus:border-orange-300"
        onClick={() => setIsFocused(!isFocused)}
      >
        {selectedItem ?? placeHolder}
        <FontAwesomeIcon icon={faCaretDown} />
      </span>
      {isFocused && (
        <ul className="absolute block m-0 p-0 items-center list-none">
          {options.map(({ id, label, labelValue }) => (
            <li
              key={id}
              onClick={() => {
                onValueChange(label, labelValue);
              }}
              className="min-w-20 text-start items-start pl-1 text-base text-slate-500 bg-slate-100 hover:bg-slate-300 hover:text-amber-400 hover:font-bold hover:cursor-pointer"
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchOptionBar;
