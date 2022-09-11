// --- Directions
// Create an 'eventing' library out of the
// Events class.  The Events class should
// have methods 'on', 'trigger', and 'off'.

class Events {
  constructor() {
    this.events = {};
  }

  // Register an event handler
/**
 * It takes an event name and a callback function, and adds the callback to the list of callbacks for
 * that event
 * @param eventName - The name of the event you want to listen for.
 * @param callback - The function that will be called when the event is triggered.
 */
  on(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName].push(callback);
    } else {
      this.events[eventName] = [callback];
    }
  }

  // Trigger all callbacks associated
  // with a given eventName
/**
 * It loops through all the callbacks for the event and calls them
 * @param eventName - The name of the event to trigger.
 */
  trigger(eventName) {
    if (this.events[eventName]) {
      for (const callback of this.events[eventName]) {
        callback();
      }
    }
  }

  // Remove all event handlers associated
  // with the given eventName
/**
 * It deletes the eventName property from the events object
 * @param eventName - The name of the event to listen for.
 */
  off(eventName) {
    delete this.events[eventName];
  }
}

module.exports = Events;
