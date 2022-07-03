export interface PaymentStatusEnumType {
  success: number;
  failed: number;
  denied: number;
  stolen: number;
  pending: number;
}

export const PaymentStatusEnum = {
  success: 0,
  failed: 1,
  denied: 3,
  stolen: 4,
  pending: 5,
};
// export enum PaymentStatusEnummm  {
//   success= 0,
//   failed = 1,
//   denied = 3,
//   stolen = 4,
// };

