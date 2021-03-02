import React, { useRef, useEffect, useCallback } from 'react';
import { StyleSheet, View, BackHandler, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import appsFlyer from 'react-native-appsflyer';

/* Initializing the SDK */
appsFlyer.initSdk(
  {
    devKey: 'K2***********99',
    isDebug: false,
    appId: '41*****44',
    onInstallConversionDataListener: true,  // Optional
    onDeepLinkListener: true  // Optional
  },
  (result) => {
    console.log(result);
  },
  (error) => {
    console.error(error);
  }
);

export default function App() {
  const webview = useRef(null);

  const onAndroidBackPress = () => {
    if (webview.current) {
      webview.current.goBack();
      return true;  // prevent default behavior (exit app)
    }
    return false;
  };

  const handleMessage = useCallback((event) => {
    console.log(JSON.parse(event.nativeEvent.data));
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
    };
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'http://172.16.2.60:8000/' }}
        ref={webview}
        onMessage={handleMessage}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
    backgroundColor: '#ffffff'
  }
});

/*
# 웹 뷰에서 실행시켜야 하는 JavaScript
# 웹 뷰에서 RN으로 데이터를 전송하는 메커니즘에 해당한다.
if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(
        JSON.stringify({
            af_revenue: '6.72',
            af_content_type: 'wallets',
            af_content_id: '15854'
        })
    );
}
*/
