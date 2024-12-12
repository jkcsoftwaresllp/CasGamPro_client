import React from "react";

export const CustomBetInput = () => {
    return (
      <>
        <div className="row mt-2">
          <div className="col-md-12 d-flex justify-content-center">
            <div>
              <div className="d-flex align-items-center justify-content-center mb-3">
                <button
                  className="btn btn-outline-secondary"
                  id="decrement"
                  style={{ width: '40px', height: '40px', fontSize: '20px' }}
                >
                  -
                </button>
                <input
                  type="number"
                  id="custom-number-input"
                  className="form-control mx-2 text-center"
                  style={{ width: '200px', height: '40px' }}
                  value="0"
                  min="0"
                  readOnly
                />
                <button
                  className="btn btn-outline-secondary"
                  id="increment"
                  style={{ width: '40px', height: '40px', fontSize: '20px' }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  