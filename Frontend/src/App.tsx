// src/App.tsx

import React from "react";
import FileUpload from "./componets/FileUpload";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>ORDR AND RDR1 Sheet Generator</h1>
      <FileUpload />
    </div>
  );
};

export default App;
