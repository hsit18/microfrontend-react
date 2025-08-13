import PubSub from 'pubsub-js'
import type { EventName, EventData, GlobalPubSub } from '../types/pubsub'

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development' || 
  (typeof window !== 'undefined' && window.location.hostname === 'localhost')

class PubSubService implements GlobalPubSub {
  private static instance: PubSubService
  
  private constructor() {
    // Initialize PubSub settings
    if (isDevelopment) {
      // Enable better error handling in development
      console.log('[PubSub] Development mode enabled')
    }
  }

  public static getInstance(): PubSubService {
    if (!PubSubService.instance) {
      PubSubService.instance = new PubSubService()
    }
    return PubSubService.instance
  }

  public subscribe<T extends EventName>(
    event: T,
    callback: (data: EventData<T>) => void
  ): string {
    const token = PubSub.subscribe(event, (msg, data) => {
      if (isDevelopment) {
        console.log(`[PubSub] Event received: ${msg}`, data)
      }
      callback(data)
    })
    
    if (isDevelopment) {
      console.log(`[PubSub] Subscribed to: ${event}, Token: ${token}`)
    }
    
    return token
  }

  public publish<T extends EventName>(
    event: T,
    data: EventData<T>
  ): boolean {
    if (isDevelopment) {
      console.log(`[PubSub] Publishing event: ${event}`, data)
    }
    
    return PubSub.publish(event, data)
  }

  public unsubscribe(token: string): void {
    PubSub.unsubscribe(token)
    
    if (isDevelopment) {
      console.log(`[PubSub] Unsubscribed token: ${token}`)
    }
  }

  public clearAllSubscriptions(): void {
    PubSub.clearAllSubscriptions()
    
    if (isDevelopment) {
      console.log('[PubSub] All subscriptions cleared')
    }
  }

  // Additional utility methods
  public getSubscriptions(): Record<string, any> {
    return (PubSub as any).getSubscriptions?.() || {}
  }

  public hasSubscriptions(event: EventName): boolean {
    const subscriptions = this.getSubscriptions()
    return event in subscriptions && Array.isArray(subscriptions[event]) && subscriptions[event].length > 0
  }
}

// Initialize and expose on window
const pubSubService = PubSubService.getInstance()

// Expose on window object for microfrontends
if (typeof window !== 'undefined') {
  window.MFE_PubSub = pubSubService
  
  if (isDevelopment) {
    console.log('[PubSub] Service initialized and exposed on window.MFE_PubSub')
    
    // Expose additional debug methods in development
    ;(window as any).MFE_PubSub_Debug = {
      getSubscriptions: () => pubSubService.getSubscriptions(),
      hasSubscriptions: (event: EventName) => pubSubService.hasSubscriptions(event),
      clearAll: () => pubSubService.clearAllSubscriptions()
    }
  }
}

export default pubSubService
