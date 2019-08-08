import React from "react";

const BackDrop = props => {
  return (
    <React.Fragment>
      <div className="backdrop" onClick={props.click} />
      <style jsx>{`
        .backdrop {
          position: fixed;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.3);
          z-index: 100;
        }
        @media (min-width: 768px) {
          .backdrop {
            display: none;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

export default BackDrop;
