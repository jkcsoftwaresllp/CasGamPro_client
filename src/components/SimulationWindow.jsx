import React from "react";
import { Simulation } from './Simulation'
export const SimulationWindow = () => {
    return (
      <>
        <div className="col-md-6 bordered vsh" style={{ backgroundColor: '#dfffe0' }}>
          <h4 className="text-center">Teen Patti</h4>
          <Simulation/>
        </div>
      </>
    );
  };
  