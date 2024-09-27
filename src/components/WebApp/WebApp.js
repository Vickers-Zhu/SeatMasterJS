// src/components/WebApp/WebApp.js
import React, { useEffect, useRef, useState, useCallback } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import RNFS from "react-native-fs";
import { WebView } from "react-native-webview";
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
  const [webViewHeight, setWebViewHeight] = useState(200); // Increased initial height for better visibility
  const [selectedChairs, setSelectedChairs] = useState([]); // State to track selected chairs

  // Reload WebView when server URL changes
  useEffect(() => {
    if (webViewRef.current && serverUrl) {
      webViewRef.current.reload();
    }
  }, [serverUrl]);

  // Function to send selected chairs to WebView
  const sendSelectedChairsToWebView = useCallback(() => {
    if (webViewRef.current) {
      const script = `
        (function() {
          if (window.updateSelectedChairs) {
            window.updateSelectedChairs(${JSON.stringify(selectedChairs)});
          }
        })();
        true;
      `;
      webViewRef.current.injectJavaScript(script);
    }
  }, [selectedChairs]);

  // Send the updated selected chairs to WebView whenever it changes
  useEffect(() => {
    sendSelectedChairsToWebView();
  }, [selectedChairs, sendSelectedChairsToWebView]);

  const handleWebViewMessage = useCallback(
    (event) => {
      try {
        const messageData = JSON.parse(event.nativeEvent.data);

        switch (messageData.type) {
          case "chairClicked":
            setSelectedChairs((prevSelected) => {
              if (prevSelected.includes(messageData.name)) {
                return prevSelected.filter((name) => name !== messageData.name);
              } else {
                return [...prevSelected, messageData.name];
              }
            });
            console.log("Chair clicked:", messageData.name);
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
    [webViewHeight, onInteractionStart, onInteractionEnd]
  );

  // Function to cancel all selections
  const cancelSelection = () => {
    setSelectedChairs([]);
  };

  return (
    <View style={{ flex: 1 }}>
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
