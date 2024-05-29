import axios from 'axios';

export interface ICreateApiClientInput {
  requestTimeoutInMs?: number;
  mbWayKey?: string;
}

export const createApiClient = ({ createContext, modules }: {
  createContext: typeof import('../create-context/create-context').createContext;
  modules: typeof import('../../modules')
}) => ({ requestTimeoutInMs, mbWayKey, }: ICreateApiClientInput) => {
  const context = createContext({
    axios,
    requestTimeoutInMs,
    mbWayKey,
  });

  const _options = Object.freeze({
    requestTimeoutInMs,
  });
  const mbWay = Object.freeze({
    requestMBWAYPayment: modules.mbWay.requestMBWAYPayment(context),
    checkMBWAYPaymentStatus: modules.mbWay.checkMBWAYPaymentStatus(context),
  });

  return Object.freeze({
    _options,
    mbWay,
  });
};