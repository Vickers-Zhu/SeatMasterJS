// components/WebApp/WebApp.js
import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview"; // Ensure correct import
import StaticServer from "react-native-static-server";
import RNFS from "react-native-fs";
import styled from "styled-components/native";

const Container = styled.View`
  width: 100%;
  height: ${({ height }) => height}px;
  background-color: ${({ theme }) => theme.colors.bg.primary};
`;

const StyledWebView = styled(WebView)`
  flex: 1;
  width: 100%;
`;

const useStaticServer = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    let server = null;

    const startServer = async () => {
      const path = `${RNFS.MainBundlePath}/build`; // Ensure this path exists and contains your web app
      server = new StaticServer(9001, path, { localOnly: true });
      try {
        const serverUrl = await server.start();
        setUrl(serverUrl);
        console.log(`Server hosting at: ${serverUrl}`);
      } catch (error) {
        console.error("Failed to start server:", error);
      }
    };

    startServer();

    // Cleanup: stop the server when the component unmounts
    return () => {
      if (server) {
        server.stop();
      }
    };
  }, []);

  return url;
};

const WebApp = () => {
  const serverUrl = useStaticServer();
  const webViewRef = useRef(null);
  const [webViewHeight, setWebViewHeight] = useState(800); // Increased initial height for better visibility

  useEffect(() => {
    if (webViewRef.current && serverUrl) {
      webViewRef.current.reload();
    }
  }, [serverUrl]); // Reload WebView when server URL changes

  const handleWebViewMessage = (event) => {
    try {
      const messageData = JSON.parse(event.nativeEvent.data);
      console.log("Received message from WebView:", messageData);

      if (messageData.type === "chairClicked") {
        console.log("Chair clicked:", messageData.name);
        // Handle the chair click event here
      } else if (messageData.type === "contentHeight") {
        const height = messageData.height;
        if (height > 0 && height !== webViewHeight) {
          setWebViewHeight(height);
        }
      }
    } catch (error) {
      console.error("Failed to parse message from WebView:", error);
    }
  };

  return (
    <Container height={webViewHeight}>
      <StyledWebView
        ref={webViewRef}
        source={{ uri: serverUrl }}
        scrollEnabled={false} // Disable WebView internal scrolling
        cacheEnabled={false}
        cacheMode="LOAD_NO_CACHE"
        originWhitelist={["*"]} // Consider restricting this for security
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn("WebView error: ", nativeEvent);
        }}
        onMessage={handleWebViewMessage}
      />
    </Container>
  );
};

export default WebApp;
