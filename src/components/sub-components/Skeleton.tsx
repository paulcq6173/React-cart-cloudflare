interface IProps {
  i?: number;
  type?: string;
  length?: number;
}

export const PopularItemSkeleton = ({ length }: IProps): React.JSX.Element => {
  const num = length;

  const PopularItemSKLoading = ({ i }: IProps) => (
    <div className="relative" key={i}>
      <div className="w-60 h-32 mb-2 bg-[#ECECEC] animate-pulse" />
      <div className="flex flex-col animate-pulse">
        <div className="w-56 h-6 animate-pulse" />
        <div className="w-40 h-5 animate-pulse" />
        <div className="w-48 h-6 animate-pulse" />
      </div>
    </div>
  );
  return (
    <>
      {
        // fragment needs to be the single root element
        Array(num)
          .fill(undefined)
          .map((_item, i) => (
            <PopularItemSKLoading key={i} />
          ))
      }
    </>
  );
};

export const CategorySkeleton = (): React.JSX.Element => {
  const CategorySKLoading = (/*{ i }: IProps*/) => (
    <div className="w-60 h-32 mb-2 bg-[#ECECEC] animate-pulse" />
  );

  return <CategorySKLoading />;
};

export const SearchItemSkeleton = ({ length }: IProps): React.JSX.Element => {
  const num = length;

  const SearchItemSKLoading = ({ i }: IProps) => (
    <div className="SearchItemSK" key={i}>
      <div className="w-60 h-32 mb-2 rounded-md animate-pulse bg-[#d8d8d8]" />
      <div className="relative flex flex-col h-52 w-96">
        <div className="w-72 h-11 animate-pulse bg-[#d8d8d8]" />
        <div className="w-48 h-7 animate-pulse bg-[#d8d8d8]" />
        <div className="w-36 h-8 animate-pulse bg-[#d8d8d8]" />
        <div className="w-48 h-8 animate-pulse bg-[#d8d8d8]" />
        <div className="absolute right-0 bottom-0 w-52 h-11 animate-pulse bg-[#d8d8d8]" />
      </div>
    </div>
  );

  return (
    <>
      {
        // fragment needs to be the single root element
        Array(num)
          .fill(undefined)
          .map((_item, i) => (
            <SearchItemSKLoading key={i} />
          ))
      }
    </>
  );
};
