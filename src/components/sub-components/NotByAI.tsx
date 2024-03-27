import NotByAIIcon from '../../assets/Written-By-Human-Not-By-AI-Badge-white.svg?react';

type SVGComponent = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

const NotByAI = () => {
  const NotByAIComponent: SVGComponent = NotByAIIcon;

  return (
    <a href="https://notbyai.fyi" target="_blank" rel="noopener noreferrer">
      <NotByAIComponent className="fill-current text-gray-700" />
    </a>
  );
};

export default NotByAI;
