import React, { useState, useEffect } from "react";
import Loader from "./loader";
import Home from "./home";

function App() {
  const [loading, setLoading] = useState(true);
  const [lastFrame, setLastFrame] = useState(null);
  return (
    <div>
      {loading ? (
        <Loader
          onComplete={() => setLoading(false)}
          setLastFrame={setLastFrame}
        />
      ) : (
        <Home lastFrame={lastFrame} />
      )}
    </div>
  );
}
export default App;
