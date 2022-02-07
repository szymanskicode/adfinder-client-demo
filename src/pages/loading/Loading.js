import React from "react";

import { Demo } from "../../components/demo/Demo";

/* Style CSS */
import "./Loading.css";

const Loading = () => {
  return (
    <div id="loading-screen">
      <h1>Loading...</h1>
      <Demo
        title="DEMO"
        message="Trwa wybudzanie serwera wersji demonstracyjnej..."
      />
    </div>
  );
};

export default Loading;
