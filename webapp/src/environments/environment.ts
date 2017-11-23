import {TransportType} from "@aspnet/signalr-client";

export const environment = {
  production: false,
  signalrTransport: TransportType.LongPolling,
  apiEndpoint: '/api'
};
