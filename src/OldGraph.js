import React from "react";
import { useCallback, useState } from "react";

import { Graph as VisGraph } from "@visx/network";
import { Group } from "@visx/group";

import { useTooltip, useTooltipInPortal } from "@visx/tooltip";

const Node = ({ node, setTooltipData }) => {
  const [highlighted, setHighlighted] = useState(false);

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

  const outline = (
    <rect
      x={bb.x}
      y={bb.y}
      rx={8}
      ry={8}
      width={bb.width}
      height={bb.height}
      className="labeloutline"
      fill={highlighted ? "yellow" : "blue"}
    ></rect>
  );

  return (
    <Group
      onMouseEnter={(event) => {
        //setTooltipData(node.label);
        console.log(node.label);
        setHighlighted(true);
      }}
      onMouseLeave={(event) => {
        //console.log(node.label);
        setHighlighted(false);
      }}
    >
      {outline}
      {label}
    </Group>
  );
};

const Link = ({ link }) => {
  //console.log(link);
  return (
    <>
      <line
        x1={link.source.x}
        y1={link.source.y}
        x2={link.target.x}
        y2={link.target.y}
        strokeWidth={2}
        stroke="purple"
        strokeOpacity={0.1}
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

export const Graph = ({ graph, height, width, zoom = {} }) => {
  const [tooltipData, setTooltipData] = useState("");
  const { containerRef, containerBounds, TooltipInPortal } = useTooltipInPortal(
    {
      scroll: true,
      detectBounds: true
    }
  );

  const tooltip = useTooltip({
    // initial tooltip state
    tooltipOpen: false,
    tooltipLeft: width / 3,
    tooltipTop: height / 3
  });

  const handlePointerMove = useCallback(
    (event) => {
      // coordinates should be relative to the container in which Tooltip is rendered
      const containerX =
        ("clientX" in event ? event.clientX : 0) - containerBounds.left;
      const containerY =
        ("clientY" in event ? event.clientY : 0) - containerBounds.top;
      tooltip.showTooltip({
        tooltipLeft: containerX,
        tooltipTop: containerY,
        tooltipData
      });
    },
    [tooltip, containerBounds, tooltipData]
  );

  return (
    <div
      ref={containerRef}
      style={{ height, width }}
      onPointerMove={handlePointerMove}
    >
      {tooltip.tooltipOpen && (
        <TooltipInPortal
          key={Math.random()} // needed for bounds to update correctly
          left={tooltip.tooltipLeft}
          top={tooltip.tooltipTop}
          style={tooltip.tooltipStyles}
        >
          {tooltip.tooltipData}
          <strong>left</strong> {tooltip.tooltipLeft?.toFixed(0)}
          px&nbsp;&nbsp;
          <strong>top</strong> {tooltip.tooltipTop?.toFixed(0)}px
        </TooltipInPortal>
      )}
      <svg
        width={width}
        height={height}
        style={{ cursor: zoom.isDragging ? "grabbing" : "grab" }}
      >
        <rect
          width={width}
          height={height}
          stroke="black"
          strokeWidth="1"
          rx="8"
          ry="8"
          fill="transparent"
          onTouchStart={zoom.dragStart}
          onTouchMove={zoom.dragMove}
          onTouchEnd={zoom.dragEnd}
          onMouseDown={zoom.dragStart}
          onMouseMove={zoom.dragMove}
          onMouseUp={zoom.dragEnd}
          onMouseLeave={() => {
            if (zoom.isDragging) {
              zoom.dragEnd();
            }
          }}
        />
        <Group transform={zoom.toString()}>
          <VisGraph
            graph={graph}
            nodeComponent={(node) => {
              return <Node {...node} setTooltipData={setTooltipData}></Node>;
            }}
            //nodeComponent={Node}
            linkComponent={Link}
          />
        </Group>
      </svg>
    </div>
  );
};
