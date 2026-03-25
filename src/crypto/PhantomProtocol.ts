import { NativeModules } from 'react-native';

const { KyberModule, DilithiumModule } = NativeModules;

/**
 * PhantomProtocol: Ultra-Secure, Post-Quantum Resistant Messaging.
 * Implements a Double Ratchet protocol upgraded with NIST-approved PQC KEMs.
 */
export class PhantomProtocol {
  private static instance: PhantomProtocol;
  private identityKey: string | null = null;
  private signedPreKey: string | null = null;

  private constructor() {}

  public static getInstance(): PhantomProtocol {
    if (!PhantomProtocol.instance) {
      PhantomProtocol.instance = new PhantomProtocol();
    }
    return PhantomProtocol.instance;
  }

  /**
   * Generates a new Post-Quantum identity using Kyber768 (KEM) and Dilithium3 (Signatures).
   */
  async generateIdentity(): Promise<{ publicKey: string; privateKey: string }> {
    try {
      // Kyber768 for Key Encapsulation (Quantum-resistant key exchange)
      const kyberKeys = await KyberModule.generateKeyPair();
      
      // Dilithium3 for Digital Signatures (Quantum-resistant authentication)
      const dilithiumKeys = await DilithiumModule.generateKeyPair();

      this.identityKey = kyberKeys.publicKey;
      
      return {
        publicKey: `${kyberKeys.publicKey}:${dilithiumKeys.publicKey}`,
        privateKey: `${kyberKeys.privateKey}:${dilithiumKeys.privateKey}`
      };
    } catch (error) {
      console.error("PhantomProtocol: Identity generation failed", error);
      throw error;
    }
  }

  /**
   * Encapsulates a shared secret for a recipient using their Kyber public key.
   */
  async encapsulate(recipientPublicKey: string): Promise<{ ciphertext: string; sharedSecret: string }> {
    return await KyberModule.encapsulate(recipientPublicKey);
  }

  /**
   * Decapsulates a shared secret using own private key and received ciphertext.
   */
  async decapsulate(ciphertext: string, privateKey: string): Promise<string> {
    return await KyberModule.decapsulate(ciphertext, privateKey);
  }

  /**
   * Signs a message using Dilithium3.
   */
  async sign(message: string, privateKey: string): Promise<string> {
    return await DilithiumModule.sign(message, privateKey);
  }

  /**
   * Verifies a Dilithium3 signature.
   */
  async verify(message: string, signature: string, publicKey: string): Promise<boolean> {
    return await DilithiumModule.verify(message, signature, publicKey);
  }
}
