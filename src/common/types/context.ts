import { AxiosInstance } from 'axios';

export interface IContext {
  httpClient: AxiosInstance;
  mbWayKey?: string;
}