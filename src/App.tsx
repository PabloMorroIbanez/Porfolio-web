import React, { useState } from "react";
import Loader from "@/components/Loader";
import Index from "@/pages/Index";

const App: React.FC = () => {
  const [showHome, setShowHome] = useState(true);

  return (
    <>
      {showHome && <Loader onFinish={() => setShowHome(false)} />}
      {!showHome && <Index />}
    </>
  );
};

export default App;