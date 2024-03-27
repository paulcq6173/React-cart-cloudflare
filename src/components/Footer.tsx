import NotByAI from './sub-components/NotByAI';

const Footer = () => {
  return (
    <div className="w-full w-screen flex flex-col text-white bg-sky-900 italic text-base items-center">
      <p>Vite-React Web App</p>
      <div className="mb-3 flex space-x-4">
        <NotByAI />
      </div>
      <div className="mb-8 flex space-x-2 text-sm text-gray-500 transition-colors dark:text-gray-400">
        <div>{`Copyright © 2023 - ${new Date().getFullYear()}`}</div>
      </div>
    </div>
  );
};

export default Footer;
