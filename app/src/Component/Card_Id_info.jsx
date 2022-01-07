import React from "react";

const CardIdinfo = ({ CommunityLevel, UplineIncome, trx }) => {
  return (
    <>
    
        <div className="col-lg-4 col-md-4 col-sm-12">
          <div className="Personal_Details_inner">
            <h4>{CommunityLevel}</h4>
            <p>{UplineIncome}</p>
            <h5>{trx+" TRX"}</h5>
          </div>
        </div>
     
    </>
  );
};

export default CardIdinfo;
