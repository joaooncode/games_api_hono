export type NewOrder = {
  gameId: number;
  orderDate: Date | string;
  orderQuantity: number;
  orderStatus?: boolean;
  orderReturnDate?: Date | string;
};
