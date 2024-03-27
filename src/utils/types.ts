export interface IData {
  id: number;
  gtin: string;
  category: string;
  type?: string;
  title: string;
  image: string;
  creator?: string;
  description: string;
  release_date: string;
  language: string;
  publisher: string;
  stock: number;
  ratings: number;
  listprice: number;
  discount: number;
  popularItem: boolean;
  comments: number;
}

export interface IArrProps {
  gtin: string;
  quantity: number;
}

type option = {
  creditCard: boolean;
  giftCardPoint: number;
  delivery: string;
};

export interface IOrderData {
  userId?: string;
  purchaseItems: IArrProps[];
  totalPrice: number;
  status: string;
  options: option[];
  note: string;
}
