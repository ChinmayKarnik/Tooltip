import React, { useState, useEffect, FC, PropsWithChildren } from "react";
import { View, StyleSheet, BackHandler, ViewStyle } from "react-native";
import { addEventListener, removeEventListener } from "./Utils";

type TooltipConfig = {
  backgroundColor?: String;
  customContainerStyle?: ViewStyle;
  position?: {
    top: number;
    left: number;
  };
  tooltipArrowOffset?: number;
  popover?: JSX.Element;
  arrowHeight?: number;
  offsetHorizontal?: number;
  zIndex?: number;
};

const TooltipProvider: FC<PropsWithChildren> = (props) => {
  const [tipVisible, setTipVisible] = useState<boolean>(false);
  const [config, setConfig] = useState<TooltipConfig>({});

  const DEFAULT_STATE = {
    triangleHeight: 8,
    triangleOffset: 25,
    zIndex: 999999,
  };

  const showToolTip = (data: TooltipConfig) => {
    setConfig(data);
    setTipVisible(true);
  };

  const hideToolTip = () => {
    if (tipVisible) {
      setTipVisible(false);
    }
    return null;
  };

  useEffect(() => {
    addEventListener("showTooltip", showToolTip);
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      hideToolTip
    );
    return () => {
      removeEventListener("showTooltip");
      backHandler.remove();
    };
  });

  const getToolTipTriangle = (height, offset = 0) => {
    const side = (2.0 * height) / 1.732;
    const triangleStyle = {
      width: 0,
      height: 0,
      backgroundColor: "transparent",
      borderStyle: "solid",
      borderLeftWidth: (side / 2.0) * 1.4,
      borderRightWidth: (side / 2.0) * 1.4,
      borderBottomWidth: height,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderBottomColor:
        config?.backgroundColor ||
        config?.customContainerStyle?.backgroundColor,
      marginLeft: offset,
    };
    return <View style={triangleStyle} />;
  };

  const renderToolTip = () => {
    const toolTipStyle = {
      topWrapper: {
        position: "absolute",
        top: config?.position?.top || 0,
        left: (config?.position?.left || 0) + (config?.offsetHorizontal || 0),
        zIndex: config?.zIndex || DEFAULT_STATE.zIndex,
      },
      triangle: {
        height: DEFAULT_STATE.triangleHeight,
        backgroundColor: "transparent",
      },
      container: [
        {
          backgroundColor: config?.backgroundColor,
        },
        config?.customContainerStyle,
      ],
    };
    return (
      <View style={toolTipStyle.topWrapper}>
        <View style={toolTipStyle.triangle}>
          {getToolTipTriangle(
            config?.arrowHeight || DEFAULT_STATE.triangleHeight,
            config?.tooltipArrowOffset || DEFAULT_STATE.triangleOffset
          )}
        </View>
        <View style={toolTipStyle.container}>{config?.popover}</View>
      </View>
    );
  };

  return (
    <View style={styles.wrapperView} onTouchStart={hideToolTip}>
      {tipVisible && renderToolTip()}
      {props?.children}
    </View>
  );
};

export default TooltipProvider;

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
  },
});
