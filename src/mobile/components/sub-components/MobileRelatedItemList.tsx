interface IItemList {
  dataInfo: {
    id: number;
    img: string;
    name: string;
  };
}

const RelatedItemList = ({ dataInfo }: IItemList) => {
  if (!dataInfo) {
    return null;
  }

  return (
    <div className="flex w-11/12 m-auto">
      <div className="grid grid-cols-2">
        <div className="cols-span-1">
          <img
            className="object-cover p-1"
            src={dataInfo.img}
            alt="itemPhoto"
          />
        </div>
        <div>
          <h3 className="text-sm sm:text-base text-wrap">{dataInfo.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default RelatedItemList;
