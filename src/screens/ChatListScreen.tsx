import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const MOCK_CHATS = [
  { id: '1', hexId: 'A9F2-B3C8', lastPulse: '2m ago', active: true },
  { id: '2', hexId: 'E4D1-09FA', lastPulse: '15m ago', active: false },
];

export const ChatListScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.onionText}>v3:phantom...7xyz.onion</Text>
        <Text style={styles.copyText}>COPY IDENTITY</Text>
      </View>

      <FlatList
        data={MOCK_CHATS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.chatItem}
            onPress={() => navigation.navigate('Stream', { hexId: item.hexId })}
          >
            <View style={styles.glyph} />
            <View style={styles.chatInfo}>
              <Text style={styles.hexId}>{item.hexId}</Text>
              <Text style={styles.status}>Last pulse: {item.lastPulse}</Text>
            </View>
            {item.active && <View style={styles.activeDot} />}
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+ SECURE LINK</Text>
      </TouchableOpacity>
      
      <View style={styles.footer}>
        <Text style={styles.contact}>@KINGS_TABLE</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' },
  header: { padding: 20, backgroundColor: '#131313', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  onionText: { color: '#adaaaa', fontFamily: 'Space Mono', fontSize: 12 },
  copyText: { color: '#00FF88', fontSize: 10, fontWeight: 'bold' },
  chatItem: { flexDirection: 'row', padding: 20, borderBottomWidth: 1, borderBottomColor: '#262626', alignItems: 'center' },
  glyph: { width: 40, height: 40, backgroundColor: '#262626', marginRight: 15 }, // Mock for abstract key-based glyph
  chatInfo: { flex: 1 },
  hexId: { color: '#ffffff', fontFamily: 'Space Mono', fontSize: 16 },
  status: { color: '#adaaaa', fontSize: 12 },
  activeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#00FF88' },
  fab: { position: 'absolute', bottom: 80, right: 30, backgroundColor: '#00FF88', padding: 15, borderRadius: 0 },
  fabText: { color: '#050505', fontWeight: 'bold' },
  footer: { padding: 10, alignItems: 'center', backgroundColor: '#0e0e0e' },
  contact: { color: '#00FF88', fontFamily: 'Space Mono', fontSize: 12 }
});
