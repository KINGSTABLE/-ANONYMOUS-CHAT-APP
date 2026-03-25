import { NativeModules } from 'react-native';

const { SQLCipherModule } = NativeModules;

/**
 * StorageManager: Manages encrypted local data using SQLCipher (AES-256).
 * Ensures that even if the physical device is seized, data remains inaccessible without the key.
 */
export class StorageManager {
  private static instance: StorageManager;
  private db: any = null;

  private constructor() {}

  public static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  /**
   * Initializes the encrypted database.
   * @param passphrase The master key derived from the user's private identity.
   */
  async init(passphrase: string): Promise<void> {
    try {
      this.db = await SQLCipherModule.openDatabase({
        name: 'phantom.db',
        key: passphrase, // AES-256 Encryption Key
        location: 'default'
      });

      // Create Tables
      await this.db.executeSql(`
        CREATE TABLE IF NOT EXISTS messages (
          id TEXT PRIMARY KEY,
          senderId TEXT,
          recipientId TEXT,
          content TEXT,
          timestamp INTEGER,
          status TEXT
        );
      `);
      
      await this.db.executeSql(`
        CREATE TABLE IF NOT EXISTS contacts (
          onionId TEXT PRIMARY KEY,
          alias TEXT,
          publicKey TEXT,
          lastSeen INTEGER
        );
      `);
    } catch (error) {
      console.error("StorageManager: Initialization failed", error);
      throw error;
    }
  }

  async saveMessage(msg: any): Promise<void> {
    await this.db.executeSql(
      'INSERT INTO messages (id, senderId, recipientId, content, timestamp, status) VALUES (?, ?, ?, ?, ?, ?)',
      [msg.id, msg.senderId, msg.recipientId, msg.content, msg.timestamp, 'SENT']
    );
  }

  async getMessages(contactId: string): Promise<any[]> {
    const [results] = await this.db.executeSql(
      'SELECT * FROM messages WHERE senderId = ? OR recipientId = ? ORDER BY timestamp ASC',
      [contactId, contactId]
    );
    return results.rows.raw();
  }
}
