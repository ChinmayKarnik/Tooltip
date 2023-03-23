import { DeviceEventEmitter } from 'react-native';

export const addEventListener = (tag,callback) => {
  const eventTag = `tooltip_manager_${tag}`;
  if (!DeviceEventEmitter.listenerCount(eventTag)) {
    DeviceEventEmitter.addListener(eventTag, e => {
      callback(e);
    });
  }
};

export const removeEventListener = (tag) => {
  const eventTag = `tooltip_manager_${tag}`;
  DeviceEventEmitter.removeAllListeners(eventTag, e => {});
};

export const triggerEvent = (tag, params) => {
   const eventTag = `tooltip_manager_${tag}`;
   DeviceEventEmitter.emit(eventTag, params);
};