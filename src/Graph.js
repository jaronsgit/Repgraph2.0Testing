import React, { useState, useRef, useCallback, useReducer } from "react";

import ZoomPortal from "./ZoomPortal";
import { Node } from "./Node";
import { Link } from "./Link";

import { localPoint } from "@visx/event";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.id];
    case "remove":
      return state.filter((item) => item !== action.id);
    default:
      throw new Error();
  }
};

export const Graph = ({ graph, height, width, selectMultiple }) => {
  const { nodes, links } = graph;
  const [tooltipData, setTooltipData] = useState("");
  //const [selectedNodes, setSelectedNodes] = useState([]);

  const [selectedNodes, dispatchSelectedNodes] = useReducer(reducer, []);
  const [selectedLinks, dispatchSelectedLinks] = useReducer(reducer, []);
  //console.log(selectedNodes);

  const {
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip
  } = useTooltip();

  const { containerRef, containerBounds, TooltipInPortal } = useTooltipInPortal(
    {
      // use TooltipWithBounds
      detectBounds: true,
      // when tooltip containers are scrolled, this will correctly update the Tooltip position
      scroll: true
    }
  );

  const handleMouseOver = useCallback(
    (event) => {
      // coordinates should be relative to the container in which Tooltip is rendered
      const containerX =
        ("clientX" in event ? event.clientX : 0) - containerBounds.left;
      const containerY =
        ("clientY" in event ? event.clientY : 0) - containerBounds.top;
      showTooltip({
        tooltipLeft: containerX,
        tooltipTop: containerY,
        tooltipData
      });
    },
    [showTooltip, containerBounds, tooltipData]
  );

  return (
    <div ref={containerRef}>
      <h2>selectedNodes:{JSON.stringify(selectedNodes)}</h2>
      <h2>selectedLinks:{JSON.stringify(selectedLinks)}</h2>
      <ZoomPortal width={width} height={height}>
        {links.map((link, i) => (
          <Link
            key={`link-${i}`}
            link={link}
            selectMultiple={selectMultiple}
            dispatchSelectedLinks={dispatchSelectedLinks}
          />
        ))}
        {nodes.map((node, i) => (
          <Node
            key={`node-${i}`}
            node={node}
            handleMouseOver={handleMouseOver}
            hideTooltip={hideTooltip}
            setTooltipData={setTooltipData}
            selectMultiple={selectMultiple}
            dispatchSelectedNodes={dispatchSelectedNodes}
          />
        ))}
        {tooltipOpen && (
          <TooltipInPortal
            // set this to random so it correctly updates with parent bounds
            key={Math.random()}
            top={tooltipTop}
            left={tooltipLeft}
          >
            <strong>{tooltipData}</strong>
          </TooltipInPortal>
        )}
      </ZoomPortal>
    </div>
  );
};

export default Graph;
