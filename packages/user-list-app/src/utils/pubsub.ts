/**
 * Utility class for pub/sub operations in the User List App
 */
export class PubSubUtils {
  private static get pubsub() {
    return window.MFE_PubSub;
  }

  /**
   * Publish a user selection event
   */
  static publishUserSelected(userId: number, userData?: any): boolean {
    if (!this.pubsub) {
      console.error('MFE_PubSub is not available on window object');
      return false;
    }

    return this.pubsub.publish('user.selected', { userId, userData });
  }

  /**
   * Publish a user update event
   */
  static publishUserUpdated(userId: number, userData: any): boolean {
    if (!this.pubsub) {
      console.error('MFE_PubSub is not available on window object');
      return false;
    }

    return this.pubsub.publish('user.updated', { userId, userData });
  }

  /**
   * Subscribe to navigation events
   */
  static subscribeToNavigation(callback: (data: { path: string; params?: Record<string, any> }) => void): string | null {
    if (!this.pubsub) {
      console.error('MFE_PubSub is not available on window object');
      return null;
    }

    return this.pubsub.subscribe('navigation.change', callback);
  }

  /**
   * Subscribe to user update events
   */
  static subscribeToUserUpdates(callback: (data: { userId: number; userData: any }) => void): string | null {
    if (!this.pubsub) {
      console.error('MFE_PubSub is not available on window object');
      return null;
    }

    return this.pubsub.subscribe('user.updated', callback);
  }

  /**
   * Subscribe to data refresh events
   */
  static subscribeToDataRefresh(callback: (data: { source: string; timestamp: number }) => void): string | null {
    if (!this.pubsub) {
      console.error('MFE_PubSub is not available on window object');
      return null;
    }

    return this.pubsub.subscribe('data.refresh', callback);
  }

  /**
   * Publish app loaded event
   */
  static publishAppLoaded(): boolean {
    if (!this.pubsub) {
      console.error('MFE_PubSub is not available on window object');
      return false;
    }

    return this.pubsub.publish('app.loaded', { 
      appName: 'user-list-app', 
      timestamp: Date.now() 
    });
  }

  /**
   * Publish app error event
   */
  static publishAppError(error: Error | string): boolean {
    if (!this.pubsub) {
      console.error('MFE_PubSub is not available on window object');
      return false;
    }

    return this.pubsub.publish('app.error', { 
      appName: 'user-list-app', 
      error 
    });
  }

  /**
   * Unsubscribe from an event
   */
  static unsubscribe(token: string): void {
    if (!this.pubsub) {
      console.error('MFE_PubSub is not available on window object');
      return;
    }

    this.pubsub.unsubscribe(token);
  }

  /**
   * Clear all subscriptions
   */
  static clearAllSubscriptions(): void {
    if (!this.pubsub) {
      console.error('MFE_PubSub is not available on window object');
      return;
    }

    this.pubsub.clearAllSubscriptions();
  }
}
