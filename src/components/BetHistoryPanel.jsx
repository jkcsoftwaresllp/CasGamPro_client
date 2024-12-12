import React from "react";
import { UserStake } from "./UserStake";

export const BetHistoryPannel =()=>{
    return(
        <>
        <div class="col-md-3">
        <div class="bordered mb-3">
          <h6>History</h6>
          <button class="btn btn-outline-secondary btn-sm" style={{margin: '3px'}}>P1</button>
          <button class="btn btn-outline-secondary btn-sm" style={{margin: '3px'}}>P2</button>
          <button class="btn btn-outline-secondary btn-sm" style={{margin: '3px'}}>P1</button>
        </div>
        <UserStake/>
      </div>
      
        </>
    )
}