import React, { useEffect, useState, useRef } from "react";
import { WebView } from "react-native-webview";
import StaticServer from "react-native-static-server";
import { Platform } from "react-native";
import RNFS from "react-native-fs";

const useStaticServer = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    let server = null;

    const startServer = async () => {
      const path = `${RNFS.MainBundlePath}/build`; // Path to the directory to serve
      server = new StaticServer(9000, path, { localOnly: true });
      try {
        const serverUrl = await server.start();
        setUrl(serverUrl);
        console.log(`Server hosting at:${path}`);
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

  useEffect(() => {
    if (webViewRef.current && serverUrl) {
      webViewRef.current.reload();
    }
  }, [serverUrl]); // Reload WebView when server URL changes

  const handleWebViewMessage = (event) => {
    try {
      const messageData = JSON.parse(event.nativeEvent.data);
      if (messageData.type === "chairClicked") {
        console.log("Chair clicked:", messageData.name);
        // Handle the chair click event here
      }
    } catch (error) {
      console.error("Failed to parse message from WebView:", error);
    }
  };

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: serverUrl }}
      style={{ flex: 1 }}
      nestedScrollEnabled={true}
      cacheEnabled={false}
      cacheMode="LOAD_NO_CACHE"
      originWhitelist={["*"]}
      onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.warn("WebView error: ", nativeEvent);
      }}
      onMessage={handleWebViewMessage}
    />
  );
};

export default WebApp;
