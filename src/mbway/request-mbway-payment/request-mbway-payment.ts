import { IContext } from '../../common/types/context';
import { ApiResponseException } from '../../common/types/api-response-exception';

export interface IRequestMBWAYPaymentApiDto {
  orderId: string; // max 15 chars
  amount: string; // decimal separator "."
  mobileNumber: string;
  email?: string; // max 100 chars
  description?: string; // max 100 chars
}

export interface IRequestMBWAYPaymentApiResponse {
  Amount: string;
  Message: string;
  OrderId: string;
  RequestId: string;
  Status: '000' | '100' | '122' | '999';
}

export type RequestMBWAYPaymentResponse = IRequestMBWAYPaymentApiResponse;

export const requestMBWAYPayment = ({
                                      httpClient,
                                      mbWayKey
                                    }: IContext) => (requestDto: IRequestMBWAYPaymentApiDto): Promise<Readonly<RequestMBWAYPaymentResponse>> => {
  // TODO: run validations
  const url = `https://api.ifthenpay.com/spg/payment/mbway`;

  return new Promise((resolve, reject) => {
    httpClient.post<IRequestMBWAYPaymentApiResponse>(url, { ...requestDto, mbWayKey })
      .then(res => {
        switch (res.data.Status) {
          case '000':
            return resolve(res.data);
          case '100':
            return reject(new ApiResponseException(`Payment request failed. Please try again.`, res.data));
          case '122':
            return reject(new ApiResponseException(`Operation refused to the user`, res.data));
          case '999':
            return reject(new ApiResponseException(`Payment request failed. Please try again`, res.data));
        }
      })
      .catch(err => reject(new ApiResponseException('Payment request failed', err)));
  });
};