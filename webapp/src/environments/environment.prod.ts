import {TransportType} from "@aspnet/signalr-client";

export const environment = {
  production: true,
  signalrTransport: TransportType.LongPolling,
  apiEndpoint: '/api'
};
