// Type definitions for accessing the global pub/sub system
declare global {
  interface Window {
    MFE_PubSub?: {
      subscribe: <T extends string>(
        event: T,
        callback: (data: any) => void
      ) => string
      
      publish: <T extends string>(
        event: T,
        data: any
      ) => boolean
      
      unsubscribe: (token: string) => void
      clearAllSubscriptions: () => void
    }
  }
}

export {}
