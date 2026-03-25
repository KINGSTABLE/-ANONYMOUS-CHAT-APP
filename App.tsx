import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SetupScreen } from './src/screens/SetupScreen';
import { ChatListScreen } from './src/screens/ChatListScreen';
import { ChatScreen } from './src/screens/ChatScreen';
import { PhantomProtocol } from './src/crypto/PhantomProtocol';
import { TorManager } from './src/network/TorManager';

const Stack = createStackNavigator();

export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize Tor and Protocols on startup
    const init = async () => {
      try {
        await TorManager.getInstance().startTor();
        setIsInitialized(true);
      } catch (error) {
        console.error("App Initialization failed", error);
      }
    };
    init();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerStyle: { backgroundColor: '#050505' },
          headerTintColor: '#00FF88',
          headerTitleStyle: { fontFamily: 'Space Mono' },
        }}
      >
        {!isInitialized ? (
          <Stack.Screen name="Setup" component={SetupScreen} options={{ title: 'PHANTOM IDENTITY' }} />
        ) : (
          <>
            <Stack.Screen name="Mesh" component={ChatListScreen} options={{ title: 'PHANTOM MESH' }} />
            <Stack.Screen name="Stream" component={ChatScreen} options={{ title: 'PHANTOM STREAM' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
