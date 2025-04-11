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
  const [selectedItems, setSelectedItems] = useState([]);
  const [occupiedItems, setOccupiedItems] = useState(["CHAIR1", "CHAIR4"]);
  const [isServerReady, setIsServerReady] = useState(false);
  const [currentModel, setCurrentModel] = useState("kitchen") ;
  const [availableItems, setAvailableItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (serverUrl) {
      setIsServerReady(true);
    }
  }, [serverUrl]);

  const cancelSelection = () => {
    setSelectedItems([]);
  };

  // This function sends data to the WebView
  const sendItemsToWebView = useCallback(() => {
    if (webViewRef.current) {
      const script = `
        (function() {
          if (window.updateItems) {
            window.updateItems({
              selectedItems: ${JSON.stringify(selectedItems)},
              occupiedItems: ${JSON.stringify(occupiedItems)}
            });
          }
        })();
        true;
      `;
      webViewRef.current.injectJavaScript(script);
    }
  }, [selectedItems, occupiedItems]);

  // Send items to WebView whenever selected or occupied items change
  useEffect(() => {
    if (isInitialized) {
      sendItemsToWebView();
    }
  }, [selectedItems, occupiedItems, sendItemsToWebView, isInitialized]);

  // Handle initialization after WebView loads
  const handleWebViewLoaded = useCallback(() => {
    // Set isInitialized to true and trigger initial data send
    setIsInitialized(true);
    // Short delay to ensure WebView is fully loaded before sending data
    setTimeout(() => {
      sendItemsToWebView();
    }, 300);
  }, [sendItemsToWebView]);

  const changeRestaurantModel = useCallback((modelKey) => {
    if (webViewRef.current) {
      const script = `
        (function() {
          if (window.changeRestaurantModel) {
            window.changeRestaurantModel('${modelKey}');
          }
        })();
        true;
      `;
      webViewRef.current.injectJavaScript(script);
      setCurrentModel(modelKey);
      setSelectedItems([]);
    }
  }, []);

  const handleWebViewMessage = useCallback(
    (event) => {
      try {
        const messageData = JSON.parse(event.nativeEvent.data);
        switch (messageData.type) {
          case "itemClicked":
            if (occupiedItems.includes(messageData.id)) {
              return;
            }
            setSelectedItems((prevSelected) => {
              if (prevSelected.includes(messageData.id)) {
                return prevSelected.filter((id) => id !== messageData.id);
              } else {
                return [...prevSelected, messageData.id];
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
          case "modelChanged":
            setAvailableItems(messageData.availableItems || []);
            setCurrentModel(messageData.modelKey);
            setSelectedItems([]);
            break;
          case "webViewReady":
            // Handle ready message from WebView
            handleWebViewLoaded();
            console.log("WebView is ready");
            break;
          default:
            console.warn("Unhandled message type:", messageData.type);
        }
      } catch (error) {
        console.error("Failed to parse message from WebView:", error);
      }
    },
    [occupiedItems, webViewHeight, onInteractionStart, onInteractionEnd]
  );

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
            incognito={true}
            thirdPartyCookiesEnabled={false}
            originWhitelist={["*"]}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn("WebView error: ", nativeEvent);
            }}
            onMessage={handleWebViewMessage}
            onLoadEnd={() => {
              sendItemsToWebView();
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
          Selected Items: {selectedItems.join(", ") || "None"}
        </SelectedText>
        <CancelButton onPress={cancelSelection}>
          <CancelButtonText>Cancel Selection</CancelButtonText>
        </CancelButton>
      </Footer>
    </View>
  );
};

export default WebApp;
