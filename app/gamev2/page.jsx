"use client";
import { useState } from "react";
import Chessgame from "./Chessgame";

const storedState = [
  {
    color: "w",
    piece: "p",
    from: "f2",
    to: "f4",
    san: "f4",
    flags: "b",
    lan: "f2f4",
    before: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    after: "rnbqkbnr/pppppppp/8/8/5P2/8/PPPPP1PP/RNBQKBNR b KQkq - 0 1",
  },
  {
    color: "b",
    piece: "p",
    from: "h7",
    to: "h5",
    san: "h5",
    flags: "b",
    lan: "h7h5",
    before: "rnbqkbnr/pppppppp/8/8/5P2/8/PPPPP1PP/RNBQKBNR b KQkq - 0 1",
    after: "rnbqkbnr/ppppppp1/8/7p/5P2/8/PPPPP1PP/RNBQKBNR w KQkq - 0 2",
  },
  {
    color: "w",
    piece: "n",
    from: "g1",
    to: "f3",
    san: "Nf3",
    flags: "n",
    lan: "g1f3",
    before: "rnbqkbnr/ppppppp1/8/7p/5P2/8/PPPPP1PP/RNBQKBNR w KQkq - 0 2",
    after: "rnbqkbnr/ppppppp1/8/7p/5P2/5N2/PPPPP1PP/RNBQKB1R b KQkq - 1 2",
  },
  {
    color: "b",
    piece: "p",
    from: "h5",
    to: "h4",
    san: "h4",
    flags: "n",
    lan: "h5h4",
    before: "rnbqkbnr/ppppppp1/8/7p/5P2/5N2/PPPPP1PP/RNBQKB1R b KQkq - 1 2",
    after: "rnbqkbnr/ppppppp1/8/8/5P1p/5N2/PPPPP1PP/RNBQKB1R w KQkq - 0 3",
  },
  {
    color: "w",
    piece: "n",
    from: "f3",
    to: "h4",
    san: "Nxh4",
    flags: "c",
    lan: "f3h4",
    before: "rnbqkbnr/ppppppp1/8/8/5P1p/5N2/PPPPP1PP/RNBQKB1R w KQkq - 0 3",
    after: "rnbqkbnr/ppppppp1/8/8/5P1N/8/PPPPP1PP/RNBQKB1R b KQkq - 0 3",
    captured: "p",
  },
];
const GameV2 = () => {
  const [status, setStatus] = useState({});
  return (
    <>
      <Chessgame onStatusChange={setStatus} customGameState={storedState} />
      <div className="all-status-props text-center">
        {Object.keys(status).map((prop) => {
          let value = status[prop] || "false";
          if (value === true) value = "true";
          if (prop == "history") value = value.map((move) => move.lan);
          if (Array.isArray(value)) value = value.join(", ");

          return (
            <p key={prop + value}>
              <strong>{prop}</strong>: {value}
            </p>
          );
        })}

        <p>
          <strong>Captured</strong>:{" "}
          {status.history
            ?.filter((moves) => moves.captured)
            .map((moves) => (moves.color == "w" ? "b" : "w") + moves.captured)}
        </p>
      </div>

      <button
        onClick={() => {
          console.log(status);
        }}
      >
        get history
      </button>
    </>
  );
};

export default GameV2;
