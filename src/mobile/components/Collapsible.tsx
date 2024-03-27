import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode, useState } from 'react';

const Collapsible = (props: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button
        className="w-10 border-2 border-transparent rounded-sm text-white cursor-pointer bg-green-600 hover:bg-lime-400"
        onClick={handleToggle}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      {open && (
        <div className="w-14 h-96 z-100 text-sm text-black overflow-x-hidden transition transition-opacity bg-gray-200">
          <button
            className="absolute top-0 right-0 text-xl ml-12"
            onClick={handleToggle}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          {props.children}
        </div>
      )}
    </div>
  );
};
export default Collapsible;
