import React from "react";

export const Link = ({ link }) => {
  return (
    <>
      <line
        x1={link.source.x}
        y1={link.source.y}
        x2={link.target.x}
        y2={link.target.y}
        strokeWidth={2}
        stroke="black"
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
    </>
  );
};

export default Link;
