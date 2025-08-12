// Utility function to load remote modules with retry logic
export const loadRemoteModule = async (
  remoteName: string, 
  moduleName: string, 
  retries: number = 3,
  delay: number = 1000
): Promise<any> => {
  for (let i = 0; i < retries; i++) {
    try {
      // @ts-ignore
      const container = window[remoteName];
      
      if (!container) {
        throw new Error(`Remote container ${remoteName} not found`);
      }

      // Initialize the container
      await container.init(__webpack_share_scopes__.default);
      
      // Get the module factory
      const factory = await container.get(moduleName);
      
      // Get the module
      const module = factory();
      
      return module;
    } catch (error) {
      console.warn(`Attempt ${i + 1} failed to load ${remoteName}/${moduleName}:`, error);
      
      if (i === retries - 1) {
        throw error;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// Helper to dynamically import a remote module
export const importRemoteModule = (remoteName: string, moduleName: string) => {
  return loadRemoteModule(remoteName, moduleName);
};
