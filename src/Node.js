import React from "react";
import { useState } from "react";
import { Group } from "@visx/visx";

export const Node = ({
  node,
  handleMouseOver,
  hideTooltip,
  setTooltipData,
  selectMultiple,
  dispatchSelectedNodes
}) => {
  const [highlighted, setHighlighted] = useState(false);
  const [selected, setSelected] = useState(false);
  let label = (
    <text textAnchor="middle" alignmentBaseline="baseline" fill="white">
      {node.label}
    </text>
  );

  let bb = {
    x: 0,
    y: 0,
    width: 80,
    height: 40
  };

  const margin = 5;
  bb.x -= bb.width / 2;
  bb.y -= bb.height / 2 + margin;

  const fillColor = highlighted ? "yellow" : selected ? "green" : "blue";

  const outline = (
    <rect
      x={bb.x}
      y={bb.y}
      rx={8}
      ry={8}
      width={bb.width}
      height={bb.height}
      className="labeloutline"
      fill={fillColor}
    ></rect>
  );

  const handleOnClick = (event) => {
    if (selectMultiple) {
      console.log(node.id);
      if (!selected) {
        dispatchSelectedNodes({ type: "add", nodeID: node.id });
        setSelected(true);
      } else {
        dispatchSelectedNodes({ type: "remove", nodeID: node.id });
        setSelected(false);
      }
    }
  };

  return (
    <g>
      <Group
        onMouseEnter={(event) => {
          //console.log(node.label);
          setHighlighted(true);
          setTooltipData(node.label);
        }}
        onMouseLeave={(event) => {
          //console.log(node.label);
          setHighlighted(false);
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={hideTooltip}
        onClick={handleOnClick}
        top={node.y}
        left={node.x}
      >
        {outline}
        {label}
      </Group>
    </g>
  );
};

export default Node;
