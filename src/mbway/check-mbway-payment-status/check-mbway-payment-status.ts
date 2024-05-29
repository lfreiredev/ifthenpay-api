import { IContext } from '../../common/types/context';
import { ApiResponseException } from '../../common/types/api-response-exception';

export interface ICheckMBWAYPaymentStatusApiDto {
  mbWayKey: string;
  requestId: string; // max 15 chars
}

export interface ICheckMBWAYPaymentStatusApiResponse {
  CreatedAt: string;
  UpdateAt: string;
  Message: string;
  RequestId: string;
  Status: '000' | '020' | '101' | '122';
}

export type CheckMBWAYPaymentStatusResponse = ICheckMBWAYPaymentStatusApiResponse;

export const checkMBWAYPaymentStatus = ({ httpClient, }: IContext) => (requestDto: ICheckMBWAYPaymentStatusApiDto): Promise<Readonly<CheckMBWAYPaymentStatusResponse>> => {
  // TODO: run validations
  const url = `https://api.ifthenpay.com/spg/payment/mbway/status?mbWayKey=${ requestDto.mbWayKey }&requestId=${ requestDto.requestId }`;

  return new Promise((resolve, reject) => {
    httpClient.get<ICheckMBWAYPaymentStatusApiResponse>(url)
      .then(res => {
        switch (res.data.Status) {
          case '000':
            return resolve(res.data);
          case '020':
            return reject(new ApiResponseException(`Operation refused by the user.`, res.data));
          case '101':
            return reject(new ApiResponseException(`Operation expired. (4 minutes)`, res.data));
          case '122':
            return reject(new ApiResponseException(`Operation refused to the user.`, res.data));
        }
      });
  });
};