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
    <div className="w-2/3 grid grid-cols-3 gap-0.5 justify-start">
      <div className="list-none bg-gray-200">{fieldGTIN}</div>
      <div className="col-span-2">{gtin}</div>
      <div className="list-none bg-gray-200">
        {t('Spec.ReleaseDate', { ns: 'product' })}
      </div>
      <div className="col-span-2">{release_date}</div>
      <div className="list-none bg-gray-200">
        {t('Spec.Lang', { ns: 'product' })}
      </div>
      <div className="col-span-2">{language}</div>
      <div className="list-none bg-gray-200">
        {t(`Spec.${fieldPublish}`, { ns: 'product' })}
      </div>
      <div className="col-span-2">{publisher}</div>
    </div>
  );
};

export default ProductSpec;
