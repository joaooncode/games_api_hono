export type Order = {
  id: number;
  userId: number;
  gameId: number;
  orderDate: Date | string;
  orderQuantity: number;
  orderStatus?: boolean;
  orderReturnDate?: Date | string;
};
