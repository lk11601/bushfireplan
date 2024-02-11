import React from "react";
import { Animated, View } from "react-native";
import { colors } from "./colors";

const Loading = ({ type, size, color, children, spaceRatio }) => {
  const fadeOpacity1 = React.useRef(new Animated.Value(0.2)).current;
  const fadeOpacity2 = React.useRef(new Animated.Value(0.2)).current;
  const fadeOpacity3 = React.useRef(new Animated.Value(0.2)).current;
  const fadeOpacity4 = React.useRef(new Animated.Value(0.2)).current;

  React.useEffect(() => {
    Animated.stagger(200, [
      // make sure that there is a delay between the animations
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeOpacity1, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(fadeOpacity1, {
            toValue: 0.2,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeOpacity2, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(fadeOpacity2, {
            toValue: 0.2,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeOpacity3, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(fadeOpacity3, {
            toValue: 0.2,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeOpacity4, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(fadeOpacity4, {
            toValue: 0.2,
            duration: 700,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, []);

  return (
    <View style={{ flexDirection: "row" }}>
      <Animated.View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color ? colors[color] : colors["accents_6"],
          opacity: fadeOpacity1,
          marginHorizontal: size / 2 / spaceRatio,
        }}
      />
      <Animated.View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color ? colors[color] : colors["accents_6"],
          opacity: fadeOpacity2,
          marginHorizontal: size / 2 / spaceRatio,
        }}
      />
      <Animated.View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color ? colors[color] : colors["accents_6"],
          opacity: fadeOpacity3,
          marginHorizontal: size / 2 / spaceRatio,
        }}
      />
    </View>
  );
};

Loading.defaultProps = {
  type: "default",
  size: 4,
  spaceRatio: 1,
};

export { Loading };
