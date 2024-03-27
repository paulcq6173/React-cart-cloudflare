import { MovieRelated, politicsRelated } from '@/dummyData';
import { createCart, selectCart, updateCart } from '@/reducers/cartSlice';
import { selectUser } from '@/reducers/loginSlice';
import { useAppDispatch, useAppSelector } from '@/reducers/reduxHooks';
import { IData } from '@/utils/types';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ProductSpec from '../sub-components/ProductSpec';
import RelatedItemList from '../sub-components/RelatedItemList';

interface IRelatedItems {
  id: number;
  img: string;
  name: string;
}

const relatedItemfilter = (category: string, type?: string) => {
  let arr: IRelatedItems[] = [];

  switch (category) {
    case 'Books':
      switch (type) {
        case 'Politics':
          arr = politicsRelated;
          break;
      }
      break;
    case 'Videos':
      arr = MovieRelated;
      break;
  }
  return arr;
};

const ProductLayout = ({ props }: { props: IData }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const foundCart = useAppSelector(selectCart);
  const navigate = useNavigate();

  const {
    gtin,
    ratings,
    type,
    listprice,
    discount,
    stock,
    category,
    image,
    title,
    creator,
    description,
    release_date,
    language,
    publisher,
  } = props;

  const productInfo = {
    gtin,
    category,
    release_date,
    language,
    publisher,
  };

  const price: number = Math.floor(listprice * (1 - discount / 100));
  const arr: IRelatedItems[] = relatedItemfilter(category, type);
  let typeStyle: string = 'rounded-sm p-[5px] text-white bg-gray-600';
  let i18nText: string | undefined;
  switch (type) {
    case 'Blu-ray':
      i18nText = t('Format.BD');
      typeStyle = 'rounded-sm p-[5px] text-white bg-blue-500';
      break;
    case 'Philosophy':
      i18nText = t('Genre.Philosophy');
      break;
    case 'Psychology':
      i18nText = t('Genre.Psychology');
      break;
  }

  const StockLayout = () => {
    if (stock > 0) {
      return (
        <span className="text-green-600">
          {t('Info.InStock', { ns: 'product' })}
        </span>
      );
    }

    return (
      <span className="text-red-600">
        {t('Info.Unavail', { ns: 'product' })}
      </span>
    );
  };

  const handleClick = () => {
    if (user) {
      const { gtin } = props;
      const newObj = {
        gtin,
        name: title,
        photo: image,
        price,
        quantity: 1,
      };
      if (foundCart) {
        dispatch(updateCart(newObj));
      } else {
        dispatch(createCart(newObj));
      }
      navigate('/cart', { state: { stock } });
    } else {
      navigate('/login', {
        state: {
          message: t('LoginRequired'),
          success: true,
        },
      });
    }
  };

  return (
    <div className="bg-white m-auto w-3/4 h-auto flex flex-col justify-center">
      <div className="flex pt-12 justify-center gap-2.5 mb-2">
        <div className="h-64 w-auto">
          <img src={image} alt="" className="h-64 w-50" />
        </div>
        <div className="block">
          <h3>{title}</h3>
          <div>
            <button className="items-center justify-center font-bold h-8 w-8 text-base border-none bg-orange-300 rounded-r-md rounded-tl-md">
              {ratings}
            </button>
            <span className="text-orange-400">
              {ratings > 4 ? '★★★★☆' : '★★★☆☆'}
            </span>
          </div>
          <div className="mt-1.5">
            {i18nText && <span className={typeStyle}>{i18nText}</span>}
          </div>
          <div className="flex flex-col gap-1.5">
            {creator && `${t('Info.Author', { ns: 'product' })}: ${creator}`}
            <br />
            <StockLayout />
            {price} TWD
          </div>
          <button
            className="border-none rounded-sm p-1.5 bg-[#ff7f50] no-underline cursor-pointer hover:bg-yellow-300 disabled:cursor-not-allowed"
            onClick={handleClick}
            disabled={stock === 0}
          >
            {t('Info.BuyNow', { ns: 'product' })}
          </button>
        </div>
      </div>
      <hr />
      <div className="flex flex-col">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-xl font-bold">
            {t('Info.Desc', { ns: 'product' })}
          </h3>
          {description}
          <hr />
          <h3 className="text-xl font-bold">
            {t('Info.Title', { ns: 'product' })}
          </h3>
          <ProductSpec props={productInfo} />
        </div>
        {arr.length !== 0 && (
          <div className="mt-4">
            <hr />
            <div className="block">
              <div className="text-xl">
                <h4>{t('Info.RelatedItems', { ns: 'product' })}</h4>
              </div>
              <div className="grid h-75 grid-cols-3 text-base">
                <div className="flex gap-1.5">
                  {arr.map((item) => (
                    <RelatedItemList key={item.id} dataInfo={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductLayout;
