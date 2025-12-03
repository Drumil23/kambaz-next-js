"use client"
import React from "react";

export default function EventObject() {
  return (
    <div id="wd-event-object">
      <h2>Event Object</h2>
      <button
        onClick={(e) => console.log(e)}
        className="btn btn-primary"
        id="wd-log-event-object"
      >
        Log Event Object
      </button>
      <hr />
    </div>
  );
}
