import * as jabra from "@gnaudio/jabra-js";

class JabraHandler {
  async initializeSdk() {
    // Initialize Jabra core SDK library using a config object
    // Using createApi() instead of init() to avoid timing issue with SDK initialization.
    const jabraSdk = await jabra.createApi({
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
    jabraSdk.deviceAdded.subscribe(handleDeviceAdded);
    // Initialize Jabra SDK PropertyModule.
    propertyModule = new PropertyModule();
    propertyFactory = await propertyModule.createPropertyFactory(
      propertiesDefinition,
    );
    // Finalize initialization of the Jabra SDK core library. After this, the SDK will start detecting and connecting to devices.
    await jabraSdk.start();
  }

  handleDeviceAdded(device: jabra.IDevice) {
  }
}
