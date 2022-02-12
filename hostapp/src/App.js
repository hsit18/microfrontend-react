import React from "react";

const Button = React.lazy(() => import("buttonApp/Button"));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Host app</h1>
      </header>
      <React.Suspense fallback="Loading Button">
        <Button />
      </React.Suspense>
    </div>
  );
}

export default App;
