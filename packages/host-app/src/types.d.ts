// Type definitions for Module Federation
declare module 'app1/UsersList' {
  const UsersList: React.ComponentType;
  export default UsersList;
}

// Global type augmentations
declare global {
  interface Window {
    __webpack_share_scopes__: any;
    __webpack_init_sharing__: any;
  }
}

export {};
