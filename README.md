# TooltipHandler

# Light-Weight React Native Tooltip

<p>Tooltip is a UI which is shown when the user clicks on a particular compoment. After that 
when the user clicks(touches) anywhere outside the component, the tooltip vanishes. This tooltip 
is lightweight, easy to use and very performance-efficient as it doesn't use any type of modal. 
</p>

## Table of Contents

- [Quickstart ⚡️](#quickstart-⚡️)
- [Behaviour](#behaviour)
- [Screenshot](#screenshot)
- [Props](#props)
- [How it works](#how-it-works)

## Quickstart ⚡️

**1. Install**

```console
npm install rn-tooltip
```

```console
yarn add rn-tooltip
```

**2. Imports**

```javascript
import { TooltipProvider, Toolitp } from "rn-tooltip";
```

**3. Usage**

- Enable the Tooltip feature by wrapping your app-content with `<TooltipProvider>` at the App level.
  ex:

  ```javascript
  import { TooltipProvider } from "rn-tooltip";
  . . .
  function App(): JSX.Element {
    return <TooltipProvider>. . .</TooltipProvider>;
  }
  ```

- Wrap the component for which you want tooltip functionality with `<Tooltip>`.
  Pass appropriate props.
  ex:
  ```javascript
  <Tooltip
    popover={<Text> This is a tooltip. Click outside to dismiss.</Text>}
    backgroundColor={"blue"}
  >
    <Text>Click on me to show tooltip.</Text>
  </Tooltip>
  ```

## Behaviour

If the user does nothing, the text component(Click on me to show tooltip) is shown as it is. When the user clicks on the component, a tooltip is visible right below the component with an arrow pointing towards the component. The tooltip has a container which wraps the popover text component(This is a tooltip....). We can set the style of this wrapper container by using the customContainerStyle prop. Now whenever the user clicks(touches) anywhere else on the screen, the
tooltip vanishes.

## Screnshot

## Props

| Prop Name            | Type            | Default value                            | Description                                                                                                                                   |
| -------------------- | --------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| popover              | JSX.element     | <></>                                    | The tooltip component which is shown when user clicks on the component wrapped under Tooltip.                                                 |
| customContainerStyle | React.ViewStyle | {backgroundColor:props?.backgroundColor} | The style of the container which covers the popover component                                                                                 |
| backgroundColor      | String          | 'white'                                  | Color of the arrow which points towards the clickable component. Also the default background color of the container of the popover component. |
| offsetHorizontal     | Number          | 0                                        | Used to adjust the position of the tooltip horizontally. A positive offset will shift the tooltip towards the right                           |
| tooltipArrowOffset   | Number          | 25                                       | The distance of the arrow from the left-most end of the popover container                                                                     |
| arrowHeight          | Number          | 8                                        | The height of the arrow which points towards the clickable component.                                                                         |
| zIndex               | Number          | 999999                                   | The z-Index of the popover component                                                                                                          |

## How it works

When the user clicks on the wrapped component, the absolute position of the component is calculated using React native's [measure](https://facebook.github.io/react-native/docs/direct-manipulation.html#measurecallback). An event is triggered which passes this position along with other props to the TooltipProvider component which operates at the app level. Here we render the tooltip at the specified position and detect for any touches on the screen. We dismiss the tooltip whenever any such touch is detected.
