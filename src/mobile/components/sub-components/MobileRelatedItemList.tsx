interface IItemList {
  dataInfo: {
    id: number;
    img: string;
    name: string;
  };
}

const RelatedItemList = ({ dataInfo }: IItemList) => {
  const NoData: boolean = dataInfo === undefined;

  return (
    <div className="flex">
      {!NoData && (
        <div className="w-28 h-32 sm:w-52 sm:h-60">
          <img
            className="w-24 h-32 sm:w-48 sm:h-52 object-contain"
            src={dataInfo.img}
            alt="itemPhoto"
          />
          <div className="text-sm sm:text-base text-center">
            {dataInfo.name}
          </div>
        </div>
      )}
    </div>
  );
};

export default RelatedItemList;
