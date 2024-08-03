import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Header = () => {
  const { t } = useTranslation();
  const [sliderIndex, setSiderIndex] = useState(0);
  const slideDirection = (direction: string) => {
    let newSliderIndex;
    const lastPicutre = dummyData.length - 1;
    if (direction === 'left') {
      sliderIndex === 0
        ? (newSliderIndex = lastPicutre)
        : (newSliderIndex = sliderIndex - 1);
      setSiderIndex(newSliderIndex);
    } else {
      sliderIndex === lastPicutre
        ? (newSliderIndex = 0)
        : (newSliderIndex = sliderIndex + 1);
      setSiderIndex(newSliderIndex);
    }
  };

  const dummyData = [
    {
      src: '/images/11066456_4650509.jpg',
      artitle: 'Books Autumn Sales 2024',
      desc: '2024/09/04 - 2024/11/30',
    },
    {
      src: '/images/realistic-coming-soon-background_91128-1644.jpg',
      artitle: 'Next Event',
      desc: 'Coming Soon',
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="slider">
        <div>
          <div className="lg:max-w-5xl flex justify-center top-5 m-auto w-2/3 h-48 bg-[#ff884d]">
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="relative z-0 top-20 right-10 text-xl font-bold hover:text-white hover:cursor-pointer"
              onClick={() => slideDirection('left')}
            />
            <img
              src={dummyData[sliderIndex].src}
              alt="Event"
              className="pt-4 w-36 h-40 sm:w-32"
            />
            <span className="relative z-0 top-10 left-5 text-xl font-bold">
              <h2>{dummyData[sliderIndex].artitle}</h2>
              <p>{dummyData[sliderIndex].desc}</p>
              <Link to="/event" className="relative top-10 hover:text-white">
                {t('SeeMore')}
              </Link>
            </span>
            <FontAwesomeIcon
              icon={faAngleRight}
              className="relative z-0 top-20 left-10 text-xl font-bold hover:text-white hover:cursor-pointer"
              onClick={() => slideDirection('right')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
