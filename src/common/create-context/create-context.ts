import { AxiosStatic } from 'axios';
import { IContext } from '../types/context';

export interface ICreateContextInput {
  axios: AxiosStatic;
  requestTimeoutInMs?: number;
  mbWayKey?: string;
}

export const createContext = ({
                                axios,
                                requestTimeoutInMs = 1000 * 10, /// 10 seconds
                                mbWayKey,
                              }: ICreateContextInput): Readonly<IContext> => {
  const headers = Object.freeze({
    'Content-Type': 'application/json',
  });
  const httpClient = axios.create({
    headers,
    timeout: requestTimeoutInMs,
  });

  return Object.freeze({ httpClient, mbWayKey });
};