import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export const SetupScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>QUANTUM KEY GENERATION</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Post-Quantum Cryptography:</Text>
        <Text style={styles.protocolText}>Kyber768 + Dilithium3 Activated</Text>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={() => {/* Logic to generate keys */}}>
        <Text style={styles.buttonText}>GENERATE PHANTOM IDENTITY</Text>
      </TouchableOpacity>

      <Text style={styles.warning}>
        No servers, no backups. Lose your keys, lose your messages.
      </Text>

      <View style={styles.footer}>
        <Text style={styles.contact}>DEV: @KINGS_TABLE (Telegram/Github)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505', padding: 20, justifyContent: 'center' },
  title: { color: '#00FF88', fontSize: 24, fontFamily: 'Space Mono', textAlign: 'center', marginBottom: 40 },
  infoBox: { backgroundColor: '#131313', padding: 15, borderLeftWidth: 4, borderLeftColor: '#00FF88', marginBottom: 30 },
  infoText: { color: '#adaaaa', fontSize: 14 },
  protocolText: { color: '#00FF88', fontSize: 16, fontWeight: 'bold' },
  button: { backgroundColor: '#00FF88', padding: 20, alignItems: 'center' },
  buttonText: { color: '#050505', fontSize: 18, fontWeight: 'bold' },
  warning: { color: '#FF0055', textAlign: 'center', marginTop: 30, fontSize: 12 },
  footer: { position: 'absolute', bottom: 30, width: '100%', alignSelf: 'center' },
  contact: { color: '#494847', textAlign: 'center', fontSize: 10, letterSpacing: 1 }
});
