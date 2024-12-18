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
      server = new StaticServer(0, path, { localOnly: true });
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

export default useStaticServer;
