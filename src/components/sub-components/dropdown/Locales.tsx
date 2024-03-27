import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IDropdownOption {
  // Each child in a list should have a unique "key" prop.
  id: number;
  emoji: string;
  label: string | number;
  labelValue: 'EN' | 'zh-TW';
}

interface IDropdownProps {
  locales?: IDropdownOption[];
  placeHolder?: string;
}

function Locales({ placeHolder, locales }: IDropdownProps) {
  const { i18n } = useTranslation();
  const langCodes = ['zh-TW', 'EN'] as const;
  type Lang = (typeof langCodes)[number];
  const isLang = (lng: Lang): lng is Lang => langCodes.includes(lng);
  const chLang = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  placeHolder = i18n.language;
  locales = [
    {
      id: 0,
      emoji: '🇹🇼',
      label: '繁體中文',
      labelValue: 'zh-TW',
    },
    {
      id: 1,
      emoji: '🇬🇧',
      label: 'English',
      labelValue: 'EN',
    },
  ];
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

  const onValueChange = (selectedValue: 'EN' | 'zh-TW') => {
    setSelectedItem(selectedValue);
    setIsFocused(false);
    if (isLang(selectedValue)) {
      chLang(selectedValue);
    }
  };
  useEffect(() => {
    setIsFocused(false);
  }, [selectedItem]);

  return (
    <div className="relative inline-block" ref={wrapperRef}>
      <div
        className="flex w-24 h-7 items-center rounded-sm pl-2 cursor-pointer text-white focus:bg-orange-200 hover:text-green-600 hover:bg-green-300"
        onClick={() => setIsFocused(!isFocused)}
      >
        {selectedItem ?? placeHolder}
        <div className="absolute right-3.5 text-green-700">
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
      </div>
      {isFocused && (
        <ul className="absolute block text-center list-none m-0 p-0">
          {locales.map(({ id, emoji, label, labelValue }) => (
            <li
              key={id}
              onClick={() => {
                onValueChange(labelValue);
              }}
              className="relative min-w-24 text-center pl-1 text-md text-gray-500 bg-gray-300 hover:bg-orange-200 hover:font-bold hover:bg-gray-600 cursor-pointer"
            >
              <span className="w-full flex justify-start">
                {emoji} {label}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Locales;
