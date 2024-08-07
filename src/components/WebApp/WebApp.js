import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import StaticServer from 'react-native-static-server';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';


const useStaticServer = () => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    let server = null;

    const startServer = async () => {
      const path = `${RNFS.MainBundlePath}/public`; // Path to the directory to serve
      server = new StaticServer(9090, path, { localOnly: true, keepAlive : true });
      try {
        const serverUrl = await server.start();
        setUrl(serverUrl);
        console.log(`Server hosting at:${path}`);
      } catch (error) {
        console.error('Failed to start server:', error);
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

  return <WebView originWhitelist={['*']} source={{ uri: serverUrl }} style={{ flex: 1 }} />;
};

export default WebApp;