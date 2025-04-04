// src/components/WebApp/useStaticServer.js
import { useEffect, useState } from "react";
import StaticServer from "react-native-static-server";
import RNFS from "react-native-fs";

const useStaticServer = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    let server = null;

    const startServer = async () => {
      const path = `${RNFS.MainBundlePath}/3d_build`; // Ensure this path exists and contains your web app
      console.log(`Inner webapp path verified: ${path}`);

      // Generate a random port between 8000 and 9000 to avoid caching issues
      const randomPort = Math.floor(Math.random() * 1000) + 8000;

      // Add a cache-busting timestamp query parameter
      const timestamp = Date.now();

      server = new StaticServer(randomPort, path, { localOnly: true });
      try {
        let serverUrl = await server.start();
        // Append cache-busting parameter
        serverUrl = `${serverUrl}?t=${timestamp}`;
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

export default useStaticServer;
