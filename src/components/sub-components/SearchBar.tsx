import {
  selectCategory,
  selectKeyword,
  setKeyword,
  setOption,
} from '@/reducers/filterSlice';
import { useAppDispatch, useAppSelector } from '@/reducers/reduxHooks';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { IDropdownOption } from './dropdown/Dropdown';
import SearchOptionBar from './dropdown/SearchMenu';

const SearchBar = () => {
  const { t } = useTranslation();
  const productTypes: IDropdownOption[] = [
    { id: 0, label: t('All'), labelValue: 'All' },
    { id: 1, label: t('Books'), labelValue: 'Books' },
    { id: 2, label: t('Videos'), labelValue: 'Videos' },
    { id: 3, label: t('Games'), labelValue: 'Games' },
    { id: 4, label: t('Toys'), labelValue: 'Toys' },
  ];
  const dispatch = useAppDispatch();
  const keyword = useAppSelector(selectKeyword);
  const category = useAppSelector(selectCategory);
  // To handle current changes
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    if (searchKeyword) {
      dispatch(setKeyword(searchKeyword));
    } else {
      dispatch(setKeyword(''));
    }

    dispatch(setOption({ options: { category } }));

    if (category !== t('All') || searchKeyword) {
      navigate('/products/search');
    }
  };

  return (
    <div className="flex border-2 mt-0.5 text-center rounded border-transparent hover:border-orange-300 hover:rounded">
      <SearchOptionBar options={productTypes} placeHolder={t(`${category}`)} />
      <input
        type="Search"
        className="w-48 border-none outline-none"
        placeholder={t('PH.SearchText')}
        onChange={(e) => setSearchKeyword(e.target.value)}
        value={searchKeyword}
      />
      <button
        className="w-8 h-7 text-white bg-orange-400 border-none rounded-r-sm cursor-pointer hover:bg-orange-200"
        onClick={handleSearchSubmit}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
};

export default SearchBar;
