import * as jabra from "@gnaudio/jabra-js";
import {JabraDevice} from "./jabradevice.ts";

export class JabraSDKContainer {

  sdk:jabra.IApi | undefined;
  devices:JabraDevice[] = [];
  async init() {
    // Initialize Jabra core SDK library using a config object
    // Using createApi() instead of init() to avoid timing issue with SDK initialization.
    this.sdk = await jabra.createApi({
      partnerKey: "shut-up", // For production use, please obtain a partner key from developer.jabra.com
      appId: "jabra-lva", // Unique identifier for your application used in logging output
      appName: "Jabra + LVA", // end-user friendly name for your application
      logger: {
        write(logEvent: { message: string; layer: any }) {
          console.log(
            "Jabra SDK log event: " + logEvent.message,
            logEvent.layer,
          );
        },
      },
    });
    // Subscribe to Jabra devices being attached/detected by the SDK.
    this.sdk.deviceAdded.subscribe(this.handleDeviceAdded);
    // Finalize initialization of the Jabra SDK core library. After this, the SDK will start detecting and connecting to devices.
    await this.sdk.start();
  }

  handleDeviceAdded(device: jabra.IDevice) {
    console.log(`Jabra SDK: Device attached/detected: Name: ${device.name}, Product ID: ${device.productId}, Serial #: ${device.serialNumber}`);
    let jdevice = new JabraDevice(device, this.sdk!);
    this.devices.push(jdevice);
  }
}
