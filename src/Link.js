import React, { useState } from "react";

import { Group, Line } from "@visx/visx";
import {
  MarkerArrow,
  MarkerCross,
  MarkerX,
  MarkerCircle,
  MarkerLine
} from "@visx/marker";

export const Link = ({ link, selectMultiple, dispatchSelectedLinks }) => {
  const [highlighted, setHighlighted] = useState(false);
  const [selected, setSelected] = useState(false);

  const handleOnClick = (event) => {
    if (selectMultiple) {
      if (!selected) {
        dispatchSelectedLinks({ type: "add", id: link.id });
        setSelected(true);
      } else {
        dispatchSelectedLinks({ type: "remove", id: link.id });
        setSelected(false);
      }
    }
  };

  const strokeColor = highlighted ? "grey" : selected ? "green" : "black";

  const H = Math.sqrt(
    (link.source.x - link.target.x) ** 2 + (link.source.y - link.target.y) ** 2
  );
  //console.log(link.id, H);
  // const sinTheta = Math.abs(link.target.y - link.source.y) / H;
  // //console.log(link.id, sinTheta);

  // const h = 20 / sinTheta;
  // console.log("h", h);
  const deltaY = link.source.y - link.target.y;
  const deltaX = link.source.x - link.target.x;
  const theta = Math.atan(deltaY / deltaX);

  return (
    <Group
      onMouseEnter={(event) => {
        setHighlighted(true);
      }}
      onMouseLeave={(event) => {
        setHighlighted(false);
      }}
      onClick={handleOnClick}
    >
      <MarkerArrow id="marker-arrow" fill="#333" refX={12} size={6} />
      <Line
        // x1={link.source.x}
        // y1={link.source.y}
        // x2={link.target.x}
        // y2={link.target.y}
        from={{ x: link.source.x, y: link.source.y }}
        to={{ x: link.target.x, y: link.target.y }}
        strokeWidth={4}
        stroke={strokeColor}
        strokeOpacity={0.8}
        strokeDasharray="8,4"
        markerEnd={"url(#marker-arrow)"}
      />
      <text
        textAnchor="middle"
        x={Math.abs(link.source.x + link.target.x) / 2}
        y={Math.abs(link.source.y + link.target.y) / 2}
        dy="0.25em"
      >
        {link.label}
        {/* {"from" + JSON.stringify({ x: link.source.x, y: link.source.y })}
        {"to" + JSON.stringify({ x: link.target.x, y: link.target.y })} */}
        {/* {"theta " + theta * (180 / Math.PI)} */}
      </text>
    </Group>
  );
};

export default Link;
