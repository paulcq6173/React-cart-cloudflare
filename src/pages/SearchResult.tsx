import SearchList from '@/components/SearchList';
import TopNaviBar from '@/components/TopNaviBar';
import useFetch from '@/hooks/useFetch';
import { selectCategory, selectKeyword } from '@/reducers/filterSlice';
import { useAppSelector } from '@/reducers/reduxHooks';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const SearchResult = () => {
  const { t } = useTranslation();
  const keyword = useAppSelector(selectKeyword);
  const category = useAppSelector(selectCategory);

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
      <TopNaviBar />
      <div className="w-full lg:max-w-[1024px] lg:min-h-[600px] block m-auto">
        <div>
          <h3 className="text-xl font-bold">
            {keyword
              ? `${t('SearchResults', { ns: 'searchResult' })} '${keyword}'`
              : t('PopularItems', { ns: 'searchResult' })}
          </h3>
        </div>
        <hr />
        <div className="gap-5 flex">
          <div className="h-max">
            <div className="list-none no-underline"></div>
          </div>

          <div>
            <h2 className="font-bold">
              {t('ResultList', { ns: 'searchResult' })}
            </h2>
            {NoResult ? (
              <div>
                {t('NoResultSorry', { ns: 'searchResult' })}
                {`'${keyword}'`}
              </div>
            ) : (
              <div>
                {loading ? (
                  <div>{t('SearchLoading', { ns: 'searchResult' })}</div>
                ) : (
                  data.map((item) => (
                    <SearchList key={item.id} dataDetail={item} />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
