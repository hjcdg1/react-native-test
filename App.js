import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const webview = useRef(null);

  const onAndroidBackPress = () => {
    if (webview.current) {
      webview.current.goBack();
      return true;  // prevent default behavior (exit app)
    }
    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
    };
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://www.opengallery.co.kr/luna/' }}
        ref={webview}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
    backgroundColor: '#ffffff'
  }
});
