import React, { useState } from "react";

import "./styles.css";
import { janDMRS, layoutGraph } from "./data.js";

import { Graph } from "./Graph";

export default function App() {
  const width = 1000;
  const height = 500;

  const [selectMultiple, setSelectMultiple] = useState(false);

  const test = layoutGraph(janDMRS);
  //console.log(test);

  const nodes = [
    { x: 50, y: 20 },
    { x: 200, y: 300 },
    { x: 300, y: 40 }
  ];

  const links = [
    { source: nodes[0], target: nodes[1] },
    { source: nodes[1], target: nodes[2] },
    { source: nodes[2], target: nodes[0] }
  ];

  const dataSample = {
    nodes,
    links
  };

  return (
    <div className="App">
      <h1>Repgraph 2.0</h1>
      <input
        type="checkbox"
        id="myCheck"
        onClick={() => setSelectMultiple(!selectMultiple)}
      />
      <span>select multiple</span>
      <Graph
        width={width}
        height={height}
        graph={{ nodes: test.finalGraph.nodes, links: test.finalGraph.links }}
        selectMultiple={selectMultiple}
      />
    </div>
  );
}
