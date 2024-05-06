import React, { useContext, useEffect } from "react";
import { SocketContext } from "../../contexts/SocketContext";

const ClientCount = () => {
  const { connectedClients } = useContext(SocketContext);

  return (
    <div className="spectatorCount">
      <div id="redDot"></div> LIVE : {connectedClients}
    </div>
  );
};

export default ClientCount;
