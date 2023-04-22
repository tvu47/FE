import { ImageProductResponse } from './ImageProductResponse';

export interface CustomerBillResponse {
  imgProducts: ImageProductResponse;
  colorName: string;
  idProduct: number;
  productName: string;
  sizeName: string;
  billId: number;
  quantity: number;
  cost: number;
  saleprice: number;
  valueDiscount: number;
  createTime: string;
  status: boolean;
}
