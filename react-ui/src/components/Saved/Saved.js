import React from "react";
import "./Saved.css";

export const Saved = ({children}) => (
  <div className="list-overflow-container">
      <ul className="list-group">
        {children}
      </ul>
    </div>
);