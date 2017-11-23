declare module Autodesk {

  export module Viewing {
    export const SELECTION_CHANGED_EVENT;
    export let Viewer3D: any;

    export function Initializer(options: InitializerOptions, callback: () => void): void;

    interface InitializerOptions {
      env: string;
      accessToken?: string;
      getAccessToken?: Function;
      refreshToken?: Function;
    }

    export class Document {
      static load(documentId: string, successCallback: (doc: Document) => void, errorCallback: (msg: string) => void): void;

      static getSubItemsWithProperties(item: Object, properties: Properties, recursive: boolean): Object[];

      getRootItem(): Object;

      getViewablePath(item: Object): string;

      getPropertyDbPath(): any;
    }

    interface Properties {
      type: string;
      role?: string;
    }

    export module Private {
      export let env: any;

      export class GuiViewer3D {
        constructor(container: HTMLElement);

        start(): void;

        load(path: any): void;
      }
    }

    export module ErrorCodes {
      /** An unknown failure has occurred. */
      export const UNKNOWN_FAILURE = 1;

      /** Bad data (corrupted or malformed) was encountered. */
        export const BAD_DATA = 2;

      /** A network failure was encountered. */
        export const NETWORK_FAILURE = 3;

      /** Access was denied to a network resource (HTTP 403) */
        export const NETWORK_ACCESS_DENIED = 4;

      /** A network resource could not be found (HTTP 404) */
        export const NETWORK_FILE_NOT_FOUND = 5;

      /** A server error was returned when accessing a network resource (HTTP 5xx) */
        export const NETWORK_SERVER_ERROR = 6;

      /** An unhandled response code was returned when accessing a network resource (HTTP 'everything else') */
        export const NETWORK_UNHANDLED_RESPONSE_CODE = 7;

      /** Browser error = webGL is not supported by the current browser */
        export const BROWSER_WEBGL_NOT_SUPPORTED = 8;

      /** There is nothing viewable in the fetched document */
        export const BAD_DATA_NO_VIEWABLE_CONTENT = 9;

      /** Browser error = webGL is supported; but not enabled */
        export const BROWSER_WEBGL_DISABLED = 10;

      /** Collaboration server error */
        export const RTC_ERROR = 11;

    }
  }
}
