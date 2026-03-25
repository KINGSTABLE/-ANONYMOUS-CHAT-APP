import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export const ChatScreen = ({ route }: any) => {
  const { hexId } = route.params;
  const [messages, setMessages] = useState([
    { id: '1', text: 'PHANTOM STREAM ESTABLISHED', type: 'system' },
    { id: '2', text: 'Waiting for packet sync...', type: 'incoming' },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{hexId}</Text>
        <TouchableOpacity style={styles.wipeButton}>
          <Text style={styles.wipeText}>WIPE</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[
            styles.bubble,
            item.type === 'incoming' ? styles.incoming : 
            item.type === 'outgoing' ? styles.outgoing : styles.system
          ]}>
            <Text style={[
              styles.messageText,
              item.type === 'outgoing' ? styles.outgoingText : styles.incomingText
            ]}>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputArea}>
        <Text style={styles.prompt}>{">"}</Text>
        <TextInput 
          style={styles.input} 
          placeholder="SEND SECURE PACKET..." 
          placeholderTextColor="#494847" 
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.latency}>Packet Latency: 124ms | @KINGS_TABLE</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' },
  header: { padding: 15, backgroundColor: '#131313', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: '#00FF88', fontFamily: 'Space Mono', fontSize: 18 },
  wipeButton: { padding: 5, borderWidth: 1, borderColor: '#FF0055' },
  wipeText: { color: '#FF0055', fontSize: 12 },
  bubble: { padding: 15, margin: 10, maxWidth: '80%' },
  incoming: { alignSelf: 'flex-start', borderWidth: 1, borderColor: '#ffffff' },
  outgoing: { alignSelf: 'flex-end', backgroundColor: '#00FF88' },
  system: { alignSelf: 'center', backgroundColor: '#262626' },
  messageText: { fontFamily: 'Space Mono', fontSize: 14 },
  incomingText: { color: '#ffffff' },
  outgoingText: { color: '#050505' },
  inputArea: { flexDirection: 'row', padding: 15, backgroundColor: '#131313', alignItems: 'center' },
  prompt: { color: '#00FF88', marginRight: 10, fontSize: 18 },
  input: { flex: 1, color: '#ffffff', fontFamily: 'Space Mono' },
  footer: { padding: 5, backgroundColor: '#0e0e0e' },
  latency: { color: '#494847', fontSize: 10, textAlign: 'center' }
});
