/**
 * Utility class for pub/sub operations in the User Details App
 */
export class PubSubUtils {
  private static get pubsub() {
    return window.MFE_PubSub;
  }

  /**
   * Subscribe to user selection events
   */
  static subscribeToUserSelection(callback: (data: { userId: number; userData?: any }) => void): string | null {
    if (!this.pubsub) {
      console.error('MFE_PubSub is not available on window object');
      return null;
    }

    return this.pubsub.subscribe('user.selected', callback);
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
   * Publish navigation back event
   */
  static publishNavigationBack(previousPath?: string): boolean {
    if (!this.pubsub) {
      console.error('MFE_PubSub is not available on window object');
      return false;
    }

    return this.pubsub.publish('navigation.back', { previousPath });
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
   * Publish data refresh event
   */
  static publishDataRefresh(source: string): boolean {
    if (!this.pubsub) {
      console.error('MFE_PubSub is not available on window object');
      return false;
    }

    return this.pubsub.publish('data.refresh', { 
      source, 
      timestamp: Date.now() 
    });
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
      appName: 'user-details-app', 
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
      appName: 'user-details-app', 
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
