import React, { useState } from "react";
import { Zoom } from "@visx/zoom";
import { RectClipPath } from "@visx/clip-path";
import { localPoint } from "@visx/event";

const initialTransform = {
  scaleX: 1.25,
  scaleY: 1.25,
  translateX: 0,
  translateY: 0,
  skewX: 0,
  skewY: 0
};

const bg = "#D9D9D6";

const ZoomPortal = (props) => {
  const { width, height } = props;

  return (
    <>
      <Zoom
        width={width}
        height={height}
        scaleXMin={1 / 2}
        scaleXMax={4}
        scaleYMin={1 / 2}
        scaleYMax={4}
        transformMatrix={{
          scaleX: 1,
          scaleY: 1,
          translateX: 0,
          translateY: 0,
          skewX: 0,
          skewY: 0
        }}
      >
        {(zoom) => (
          <svg
            width={width}
            height={height}
            style={{ cursor: zoom.isDragging ? "grabbing" : "grab" }}
          >
            <rect width={width} height={height} rx={8} ry={8} fill={bg} />
            <rect
              width={width}
              height={height}
              rx={14}
              fill="transparent"
              onTouchStart={zoom.dragStart}
              onTouchMove={zoom.dragMove}
              onTouchEnd={zoom.dragEnd}
              onMouseDown={zoom.dragStart}
              onMouseMove={zoom.dragMove}
              onMouseUp={zoom.dragEnd}
              onMouseLeave={() => {
                if (zoom.isDragging) zoom.dragEnd();
              }}
              onDoubleClick={(event) => {
                const point = localPoint(event) || { x: 0, y: 0 };
                zoom.scale({ scaleX: 1.1, scaleY: 1.1, point });
              }}
            />
            <g transform={zoom.toString()}>{props.children}</g>
          </svg>
        )}
      </Zoom>
    </>
  );
};

export default ZoomPortal;
