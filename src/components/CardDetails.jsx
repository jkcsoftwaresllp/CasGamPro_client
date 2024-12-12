import React from "react";

export const CardDetails = ()=>{
    return(
        <>
        <div className="col-md-3 bordered">
        <div className="player-label text-center">Player 1</div>
        <div className="d-flex justify-content-center" id="player1-cards">
          <div className="card"><img src="placeholder.png" alt="Card"></img></div>
          <div className="card"><img src="placeholder.png" alt="Card"></img></div>
          <div className="card"><img src="placeholder.png" alt="Card"></img></div>
        </div>
        <div className="player-label text-center mt-3">Player 2</div>
        <div className="d-flex mt-2 justify-content-center" id="player2-cards">
          <div className="card"><img src="placeholder.png" alt="Card"></img></div>
          <div className="card"><img src="placeholder.png" alt="Card"></img></div>
          <div className="card"><img src="placeholder.png" alt="Card"></img></div>
        </div>
      </div>

        </>
    )
}

