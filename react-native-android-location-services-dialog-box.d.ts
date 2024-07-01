declare module 'react-native-android-location-services-dialog-box' {
  interface LocationServicesDialogBoxOptions {
    message: string;
    ok: string;
    cancel: string;
    enableHighAccuracy: boolean;
    showDialog: boolean;
    openLocationServices: boolean;
    preventOutSideTouch: boolean;
    preventBackClick: boolean;
    providerListener: boolean;
  }

  interface LocationServicesDialogBoxResponse {
    enabled: boolean;
    status: string;
  }

  export function checkLocationServicesIsEnabled(
    options: LocationServicesDialogBoxOptions
  ): Promise<LocationServicesDialogBoxResponse>;

  export function forceCloseDialog(): void;

  export function stopListener(): void;

  export default {
    checkLocationServicesIsEnabled,
    forceCloseDialog,
    stopListener,
  };
}
