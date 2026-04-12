import * as jabra from "@gnaudio/jabra-js";

export class JabraDevice {
  device: jabra.IDevice;
  sdk: jabra.IApi;
  callcontrol: jabra.IMultiCallControl|undefined;
  constructor(jdevice: jabra.IDevice, sdk: jabra.IApi) {
    this.device = jdevice;
    this.sdk = sdk;
  }

  async easycall() {
    const easyCallControlFactory = new jabra.EasyCallControlFactory(
      this.sdk,
    );
    // If the device supports Easy Call Control, enable it.
    if (!easyCallControlFactory.supportsEasyCallControl(this.device)) {
      throw new Error("Device does not support Easy Call Control");
    }
    this.callcontrol = await easyCallControlFactory.createMultiCallControl(
      this.device,
    );

    /* TODO

    // OngoingCalls is the number of ongoing calls on the device. This includes active and held calls.

    easyCallControl.ongoingCalls.subscribe((ongoingCalls) =>
    {
        // (...)
    });

    // MuteState is the microphone mute state of the device.
    easyCallControl.muteState.subscribe((muteState) =>
    {
        // (...)
    });

    // HoldState indicates if call is on hold or not.
    easyCallControl.holdState.subscribe((holdState) =>
    {
        // (...)
    });

    // SwapRequest is called when the user wants to swap between two calls.
    easyCallControl.swapRequest.subscribe(() =>
    {
        // (...)
    });
     */
  }
}
