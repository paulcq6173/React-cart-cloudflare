import { MovieRelated, politicsRelated } from '@/dummyData';
import ProductSpec from '@/mobile/components/sub-components/MobileProductSpec';
import RelatedItemList from '@/mobile/components/sub-components/MobileRelatedItemList';
import { addCartItem, selectCart, updateItemQty } from '@/reducers/cartSlice';
import { selectUser } from '@/reducers/loginSlice';
import { useAppDispatch, useAppSelector } from '@/reducers/reduxHooks';
import { IData } from '@/utils/types';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

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
      let newObj = {
        gtin,
        name: title,
        photo: image,
        price,
        quantity: 1,
      };
      const foundItem = foundCart.find((e) => e.gtin === gtin);
      if (foundItem) {
        newObj = { ...foundItem, quantity: foundItem.quantity + 1 };
        dispatch(updateItemQty(newObj));
      } else {
        dispatch(addCartItem(newObj));
      }

      navigate('/cart');
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
    <div className="w-screen m-auto w-3/4 h-auto flex flex-col justify-center">
      <button className="mt-1 ml-1 flex w-16 justify-start text-sm font-medium bg-green-600 rounded-sm text-white focus:bg-lime-400 focus:text-black">
        <Link
          className="flex w-full justify-center text-center"
          to="/mobile/products/search"
        >
          Back
        </Link>
      </button>
      <div className="w-full flex pt-2 gap-1 sm:gap-2.5 sm:pt-4 mb-2">
        <div className="ml-1 bg-gray-200 items-center">
          <img
            src={image}
            alt=""
            className="object-cover h-32 w-28 sm:h-64 sm:w-48"
          />
        </div>
        <div className="block w-1/2">
          <h3 className="text-sm sm:text-base">{title}</h3>
          <div>
            <button className="items-center justify-center text-sm sm:font-bold h-6 w-6 sm:text-base border-none bg-orange-300 rounded-r-sm rounded-tl-sm">
              {ratings}
            </button>
            <span className="text-sm text-orange-400 cursor-none">
              {ratings > 4 ? '★★★★☆' : '★★★☆☆'}
            </span>
          </div>
          <div className="mt-1.5">
            {i18nText && <span className={typeStyle}>{i18nText}</span>}
          </div>
          <div className="flex flex-col gap-1 sm:gap-1.5">
            {creator && `${t('Info.Author', { ns: 'product' })}: ${creator}`}
            <br />
            <StockLayout />
            {price} TWD
          </div>
          <button
            className="border-none w-20 h-auto text-sm rounded-sm p-1.5 bg-[#ff7f50] no-underline cursor-pointer hover:bg-yellow-300 disabled:cursor-not-allowed"
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
          <h3 className="text-sm sm:text-base font-medium sm:text-xl sm:font-bold">
            {t('Info.Desc', { ns: 'product' })}
          </h3>
          <p className="text-sm text-center">{description}</p>
          <hr />
          <h3 className="text-sm sm:text-base font-medium sm:text-xl sm:font-bold">
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
              <div className="grid h-auto grid-cols-1 sm:grid-cols-3 text-sm sm:text-base">
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
