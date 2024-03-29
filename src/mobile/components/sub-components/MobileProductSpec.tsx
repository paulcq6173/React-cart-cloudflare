import { useTranslation } from 'react-i18next';

interface Info {
  gtin: string;
  category: string;
  release_date: string;
  language: string;
  publisher: string;
}

const ProductSpec = ({ props }: { props: Info }) => {
  const { t } = useTranslation();
  const { gtin, category, release_date, language, publisher } = props;
  let fieldGTIN = 'ASIN';
  let fieldPublish = 'Publisher';

  switch (category) {
    case 'Books':
      fieldGTIN = 'ISBN';
      break;
    case 'Videos':
      fieldPublish = 'Studio';
      break;
    case 'Games':
      fieldPublish = 'Manufacturer';
      break;
  }

  return (
    <div className="pl-1 pr-1 grid grid-cols-2 sm:grid-cols-3 gap-0.5">
      <div className="col-span-1 text-sm bg-gray-200 sm:text-base">
        {fieldGTIN}
      </div>
      <div className="text-xs sm:text-sm sm:col-span-2">{gtin}</div>
      <div className="col-span-1 text-sm sm:text-base bg-gray-200">
        {t('Spec.ReleaseDate', { ns: 'product' })}
      </div>
      <div className="text-xs sm:text-sm sm:col-span-2">{release_date}</div>
      <div className="col-span-1 text-sm sm:text-base bg-gray-200">
        {t('Spec.Lang', { ns: 'product' })}
      </div>
      <div className="text-xs sm:text-sm sm:col-span-2">{language}</div>
      <div className="col-span-1 text-sm sm:text-base bg-gray-200">
        {t(`Spec.${fieldPublish}`, { ns: 'product' })}
      </div>
      <div className="text-xs sm:text-sm sm:col-span-2">{publisher}</div>
    </div>
  );
};

export default ProductSpec;
