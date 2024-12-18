// src/components/WebApp/WebApp.js
import React, { useEffect, useRef, useState, useCallback } from "react";
import { View, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import styled from "styled-components/native";
import useStaticServer from "./useStaticServer";

import {
  Container,
  StyledWebView,
  Footer,
  SelectedText,
  CancelButton,
  CancelButtonText,
} from "./styles";

const WebApp = ({ onInteractionStart, onInteractionEnd }) => {
  const serverUrl = useStaticServer();
  const webViewRef = useRef(null);
  const [webViewHeight, setWebViewHeight] = useState(200);
  const [selectedChairs, setSelectedChairs] = useState([]);
  const [occupiedChairs, setOccupiedChairs] = useState(["CHAIR2", "CHAIR4"]);
  const [isServerReady, setIsServerReady] = useState(false);

  // Monitor server readiness and only load the WebView when ready
  useEffect(() => {
    if (serverUrl) {
      setIsServerReady(true);
    }
  }, [serverUrl]);

  const sendChairsToWebView = useCallback(() => {
    if (webViewRef.current) {
      const script = `
        (function() {
          if (window.updateChairs) {
            window.updateChairs({
              selectedChairs: ${JSON.stringify(selectedChairs)},
              occupiedChairs: ${JSON.stringify(occupiedChairs)}
            });
          }
        })();
        true;
      `;
      webViewRef.current.injectJavaScript(script);
    }
  }, [selectedChairs, occupiedChairs]);

  useEffect(() => {
    sendChairsToWebView();
  }, [selectedChairs, occupiedChairs, sendChairsToWebView]);

  const handleWebViewMessage = useCallback(
    (event) => {
      try {
        const messageData = JSON.parse(event.nativeEvent.data);

        switch (messageData.type) {
          case "chairClicked":
            if (occupiedChairs.includes(messageData.name)) {
              return;
            }
            setSelectedChairs((prevSelected) => {
              if (prevSelected.includes(messageData.name)) {
                return prevSelected.filter((name) => name !== messageData.name);
              } else {
                return [...prevSelected, messageData.name];
              }
            });
            break;

          case "contentHeight":
            const height = Number(messageData.height);
            if (height > 0 && height !== webViewHeight) {
              setWebViewHeight(height);
            }
            break;

          case "interactionStart":
            if (onInteractionStart) {
              onInteractionStart();
            }
            break;

          case "interactionEnd":
            if (onInteractionEnd) {
              onInteractionEnd();
            }
            break;

          default:
            console.warn("Unhandled message type:", messageData.type);
        }
      } catch (error) {
        console.error("Failed to parse message from WebView:", error);
      }
    },
    [occupiedChairs, webViewHeight, onInteractionStart, onInteractionEnd]
  );

  const cancelSelection = () => {
    setSelectedChairs([]);
  };

  return (
    <View style={{ flex: 1 }}>
      {isServerReady ? (
        <Container height={webViewHeight}>
          <StyledWebView
            ref={webViewRef}
            source={{ uri: serverUrl }}
            scrollEnabled={false}
            cacheEnabled={false}
            cacheMode="LOAD_NO_CACHE"
            originWhitelist={["*"]}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn("WebView error: ", nativeEvent);
            }}
            onMessage={handleWebViewMessage}
            onLoadEnd={() => {
              sendChairsToWebView();
            }}
          />
        </Container>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <Footer>
        <SelectedText>
          Selected Chairs: {selectedChairs.join(", ") || "None"}
        </SelectedText>
        <CancelButton onPress={cancelSelection}>
          <CancelButtonText>Cancel Selection</CancelButtonText>
        </CancelButton>
      </Footer>
    </View>
  );
};

export default WebApp;
