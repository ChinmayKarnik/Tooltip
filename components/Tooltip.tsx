import React, { Component, createRef, ReactNode } from "react";
import { View, ViewStyle, Platform, TouchableOpacity } from "react-native";
import { triggerEvent } from "./Utils";

type TooltipProps = {
  backgroundColor?: String;
  customContainerStyle?: ViewStyle;
  popover?: JSX.Element;
  offsetHorizontal?: Number;
  tooltipArrowOffset?: Number;
  children?: ReactNode;
  arrowHeight?: number;
  zIndex?: number;
};

type VoidFunction = (...args: any[]) => void;

class Tooltip extends Component<TooltipProps> {
  constructor() {
    super();
    this.ref = createRef();
  }
  calculateView = (callback?: VoidFunction) => {
    this.ref.current.measure((x, y, width, height, pageX, pageY) => {
      if (callback instanceof Function) {
        callback(pageX, pageY, height);
      }
    });
  };

  osSpecificVerticalOffset = Platform.OS === "ios" ? 47 : 0;

  triggerShowTooltip = (pageX: number, pageY: number, height: number) => {
    triggerEvent("showTooltip", {
      position: {
        top: pageY + height - this.osSpecificVerticalOffset,
        left: pageX,
      },
      backgroundColor: this.props?.backgroundColor,
      customContainerStyle: this.props?.customContainerStyle,
      popover: this.props?.popover,
      offsetHorizontal: this.props?.offsetHorizontal,
      tooltipArrowOffset: this.props?.tooltipArrowOffset,
      arrowHeight: this.props?.arrowHeight,
      zIndex: this.props?.zIndex,
    });
  };

  onShowTooltip = () => {
    this.calculateView(this.triggerShowTooltip);
  };
  onComponentLayout = () => {
    this.calculateView();
  };

  render() {
    return (
      <View ref={this.ref} onLayout={this.onComponentLayout}>
        <TouchableOpacity onPress={this.onShowTooltip}>
          {this.props?.children}
        </TouchableOpacity>
      </View>
    );
  }
}

export default Tooltip;
