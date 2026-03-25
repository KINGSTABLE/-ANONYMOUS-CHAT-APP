import { NativeModules } from 'react-native';

const { NitroTorModule } = NativeModules;

/**
 * TorManager: Manages the lifecycle of the Tor daemon and Onion Services.
 * Each user is identified by a unique .onion address.
 */
export class TorManager {
  private static instance: TorManager;
  private onionAddress: string | null = null;

  private constructor() {}

  public static getInstance(): TorManager {
    if (!TorManager.instance) {
      TorManager.instance = new TorManager();
    }
    return TorManager.instance;
  }

  /**
   * Starts the Tor daemon and initializes the Onion Service.
   */
  async startTor(): Promise<string> {
    try {
      // Start Tor Daemon
      await NitroTorModule.startDaemon();
      
      // Create or Retrieve Onion Service (Hidden Service)
      // This address is the user's permanent ID.
      const address = await NitroTorModule.createOnionService(8080);
      this.onionAddress = address;
      
      console.log("TorManager: Onion Service started at", address);
      return address;
    } catch (error) {
      console.error("TorManager: Failed to start Tor", error);
      throw error;
    }
  }

  /**
   * Sends an encrypted message to another .onion address.
   */
  async sendMessage(recipientOnion: string, payload: string): Promise<void> {
    try {
      // Use Tor's SOCKS5 proxy to route the request through the network
      await NitroTorModule.post(`http://${recipientOnion}/message`, payload);
    } catch (error) {
      console.error("TorManager: Failed to send message", error);
      throw error;
    }
  }

  /**
   * Checks the status of the Tor connection.
   */
  async getStatus(): Promise<'CONNECTING' | 'CONNECTED' | 'DISCONNECTED'> {
    return await NitroTorModule.getStatus();
  }
}
