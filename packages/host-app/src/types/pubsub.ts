// Global pub/sub event types
export interface PubSubEvents {
  // User selection events
  'user.selected': { userId: number; userData?: any }
  'user.updated': { userId: number; userData: any }
  
  // Navigation events  
  'navigation.change': { path: string; params?: Record<string, any> }
  'navigation.back': { previousPath?: string }
  
  // Application state events
  'app.loaded': { appName: string; timestamp: number }
  'app.error': { appName: string; error: Error | string }
  
  // Data synchronization events
  'data.refresh': { source: string; timestamp: number }
  'data.cache.clear': { scope?: string }
}

// Type for event names
export type EventName = keyof PubSubEvents

// Type for event data based on event name
export type EventData<T extends EventName> = PubSubEvents[T]

// Pub/Sub interface exposed on window
export interface GlobalPubSub {
  subscribe: <T extends EventName>(
    event: T,
    callback: (data: EventData<T>) => void
  ) => string
  
  publish: <T extends EventName>(
    event: T,
    data: EventData<T>
  ) => boolean
  
  unsubscribe: (token: string) => void
  
  clearAllSubscriptions: () => void
}

// Global window interface extension
declare global {
  interface Window {
    MFE_PubSub: GlobalPubSub
  }
}
