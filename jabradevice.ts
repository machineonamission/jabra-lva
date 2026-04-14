import * as jabra from "@gnaudio/jabra-js";

export class JabraDevice {
  device: jabra.IDevice;
  sdk: jabra.IApi;
  callcontrol: jabra.ICallControl | undefined;
  constructor(jdevice: jabra.IDevice, sdk: jabra.IApi) {
    this.device = jdevice;
    this.sdk = sdk;
  }

  async easycall() {
    const easyCallControlFactory = new jabra.CallControlFactory(
      this.sdk,
    );
    // If the device supports Easy Call Control, enable it.
    if (!easyCallControlFactory.supportsCallControl(this.device)) {
      throw new Error("Device does not support Easy Call Control");
    }
    this.callcontrol = await easyCallControlFactory.createCallControl(
      this.device,
    );

    this.callcontrol.deviceSignals.subscribe(console.log);
    this.callcontrol.onDisconnect.subscribe(console.log);

    console.log(await this.callcontrol.takeCallLock());
    this.callcontrol.offHook(false);
  }
}
