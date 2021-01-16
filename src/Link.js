import React, { useState } from "react";

import { Group } from "@visx/visx";

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
      <line
        x1={link.source.x}
        y1={link.source.y}
        x2={link.target.x}
        y2={link.target.y}
        strokeWidth={4}
        stroke={strokeColor}
        strokeOpacity={0.8}
        strokeDasharray="8,4"
      />
      <text
        textAnchor="middle"
        x={Math.abs(link.source.x + link.target.x) / 2}
        y={Math.abs(link.source.y + link.target.y) / 2}
        dy="0.25em"
      >
        {link.rargname}
      </text>
    </Group>
  );
};

export default Link;
