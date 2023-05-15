export class EventManager {
  constructor() {
    const originalAddEventListener = EventTarget.prototype.addEventListener;

    EventTarget.prototype.addEventListener = function (type, listener, options) {
      if (typeof options === 'object' && options !== null) {
        options.passive = options.passive || false;
      }
      else {
        options = {passive: false, capture: options};
      }
      originalAddEventListener.call(this, type, listener, options);
    };
  }
}
