import React from "react";
import Letter from "./Letter";

function Board({ rowRef }) {
  return (
    <div className="w-[450px] h-[550px] border border-solid border-black flex flex-col">
      {[0, 1, 2, 3, 4, 5].map((_, i) => (
        <div
          ref={(el) => (rowRef.current[i] = el)}
          key={i}
          id={`row-${i}`}
          className="flex-[33%] flex flex-row m-[5px] "
        >
          {[0, 1, 2, 3, 4].map((_, j) => (
            <Letter key={j} row={i} position={j} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
