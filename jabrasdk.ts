import * as jabra from "@gnaudio/jabra-js";
import { JabraDevice } from "./jabradevice.ts";

export class JabraSDKContainer {
  sdk: jabra.IApi | undefined;
  devices: JabraDevice[] = [];
  async init() {
    // Initialize Jabra core SDK library using a config object
    // Using createApi() instead of init() to avoid timing issue with SDK initialization.
    let sdk = await jabra.init({
      partnerKey: "your-partner-key", // For production use, please obtain a partner key from developer.jabra.com
      appId: "my-app-id", // Unique identifier for your application used in logging output
      appName: "My app name", // end-user friendly name for your application
      logger: {
        write(logEvent: { message: string; layer: any }) {
          console.log(
            "Jabra SDK log event: " + logEvent.message,
            logEvent.layer,
          );
        },
      },
    });
    this.sdk = sdk;
    // Subscribe to Jabra devices being attached/detected by the SDK.
    this.sdk.deviceAdded.subscribe((device: jabra.IDevice) => {
      this.handleDeviceAdded(device, sdk);
    });
    // Finalize initialization of the Jabra SDK core library. After this, the SDK will start detecting and connecting to devices.
    // await this.sdk.start();
  }

  handleDeviceAdded(device: jabra.IDevice, sdk: jabra.IApi) {
    console.log(
      `Jabra SDK: Device attached/detected: Name: ${device.name}, Product ID: ${device.productId}, Serial #: ${device.serialNumber}`,
    );
    let jdevice = new JabraDevice(device, sdk);
    jdevice.easycall();
    this.devices.push(jdevice);
  }
}
