interface UmamiTracker {
  track: (eventName: string, eventData?: Record<string, unknown>) => void;
}

declare global {
  var umami: UmamiTracker;
}

export {};
