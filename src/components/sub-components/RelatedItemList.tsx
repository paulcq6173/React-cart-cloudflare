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
        <div className="w-52 h-auto">
          <img
            className="w-48 h-52 object-contain"
            src={dataInfo.img}
            alt="itemPhoto"
          />
          <div className="text-base text-center">{dataInfo.name}</div>
        </div>
      )}
    </div>
  );
};

export default RelatedItemList;
