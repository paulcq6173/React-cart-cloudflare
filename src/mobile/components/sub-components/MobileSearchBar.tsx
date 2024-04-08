import {
  selectCategory,
  selectKeyword,
  setKeyword,
} from '@/reducers/filterSlice';
import { useAppDispatch, useAppSelector } from '@/reducers/reduxHooks';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const MobileSearchBar = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const keyword = useAppSelector(selectKeyword);
  const category = useAppSelector(selectCategory);
  // To handle current changes
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    if (searchKeyword) {
      dispatch(setKeyword(searchKeyword));
    }

    if (category !== t('All') || searchKeyword) {
      navigate('/mobile/products/search');
    }
  };

  return (
    <div>
      <div className="w-48 flex jusity-center m-auto border-2 text-center rounded border-transparent hover:border-orange-300 hover:rounded">
        <input
          type="Search"
          className="w-40 border-none outline-none"
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
    </div>
  );
};

export default MobileSearchBar;
