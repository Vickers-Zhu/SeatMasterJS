import React, { useRef, useEffect } from "react";
import { Animated, TouchableWithoutFeedback } from "react-native";
// Import both style sets (default and alternate)
import * as DefaultStyles from "./Switch.styles";
import * as AltStyles from "./SwitchAlternate.styles";

const SwitchContainer = ({
  isOn,
  setIsOn,
  leftLabel,
  rightLabel,
  variant = "default", // "default" or "alternate"
}) => {
  // Select the style set based on the variant prop.
  const Styles = variant === "alternate" ? AltStyles : DefaultStyles;

  // The capsule position animates based on the isOn state.
  const capsulePosition = useRef(new Animated.Value(isOn ? 96 : 0)).current;

  useEffect(() => {
    Animated.timing(capsulePosition, {
      toValue: isOn ? 96 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOn]);

  return (
    <Styles.Container>
      <Styles.SwitchBackground>
        <Styles.Capsule style={{ left: capsulePosition }} />
        <TouchableWithoutFeedback onPress={() => setIsOn(false)}>
          <Styles.TextWrapper>
            {/* Left label is active when isOn is false */}
            <Styles.Label active={!isOn}>{leftLabel}</Styles.Label>
          </Styles.TextWrapper>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setIsOn(true)}>
          <Styles.TextWrapper>
            {/* Right label is active when isOn is true */}
            <Styles.Label active={isOn}>{rightLabel}</Styles.Label>
          </Styles.TextWrapper>
        </TouchableWithoutFeedback>
      </Styles.SwitchBackground>
    </Styles.Container>
  );
};

export default SwitchContainer;
