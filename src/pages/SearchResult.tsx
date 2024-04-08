import Footer from '@/components/Footer';
import SearchList from '@/components/SearchList';
import TopNaviBar from '@/components/TopNaviBar';
import useFetch from '@/hooks/useFetch';
import MobileSearchList from '@/mobile/components/MobileSearchList';
import MobileTopNav from '@/mobile/components/MobileTopNav';
import { selectCategory, selectKeyword } from '@/reducers/filterSlice';
import { useAppSelector } from '@/reducers/reduxHooks';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const SearchResult = () => {
  const pathname = useLocation().pathname;
  const mobileMode = pathname.includes('mobile');
  const { t } = useTranslation();
  const keyword = useAppSelector(selectKeyword);
  const category = useAppSelector(selectCategory);

  const MixSearchList = () => {
    if (mobileMode) {
      return (
        <div>
          {data.map((item) => (
            <MobileSearchList key={item.id} dataDetail={item} />
          ))}
        </div>
      );
    }

    return (
      <div>
        {data.map((item) => (
          <SearchList key={item.id} dataDetail={item} />
        ))}
      </div>
    );
  };

  const baseUrl: string = '/api/products?';
  let searchUrl = baseUrl;
  // Neither keyword and category changed
  if (!keyword && category === 'All') {
    searchUrl = '/api/products/popularItem';
    // Either keyword and category changed
  } else if (keyword && category !== 'All') {
    searchUrl += `c=${category}&k=${keyword}`;
  } else {
    if (category !== 'All') {
      searchUrl += `c=${category}`;
    } else if (keyword) {
      searchUrl += `k=${keyword}`;
    }
  }

  const [fetchDataUrl, setFetchDataUrl] = useState(searchUrl);
  const { data, loading } = useFetch(fetchDataUrl);
  const NoResult: boolean = data.length === 0;

  useEffect(() => {
    setFetchDataUrl(searchUrl);
  }, [searchUrl, t]);

  return (
    <div className="w-screen flex flex-col justify-center">
      {mobileMode ? <MobileTopNav /> : <TopNaviBar />}
      <div className="w-full lg:max-w-[1024px] block m-auto">
        <div>
          <h3 className="text-sm sm:text-xl sm:font-bold">
            {keyword
              ? `${t('SearchResults', { ns: 'searchResult' })} '${keyword}'`
              : t('PopularItems', { ns: 'searchResult' })}
          </h3>
        </div>
        <hr />
        <div className="gap-5 flex">
          <div>
            <h2 className="text:sm sm:text-base sm:font-bold">
              {t('ResultList', { ns: 'searchResult' })}
            </h2>
            {NoResult ? (
              <div>
                {t('NoResultSorry', { ns: 'searchResult' })}
                {`'${keyword}'`}
              </div>
            ) : (
              <div className="items-center">
                {loading ? (
                  <div>{t('SearchLoading', { ns: 'searchResult' })}</div>
                ) : (
                  <MixSearchList />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchResult;
