import React from "react";

const TooltipContentCustom: React.FC<{ content: string }> = ({ content }) => (
  <div className="tooltip-content">{content}</div>
);

export default TooltipContentCustom;
