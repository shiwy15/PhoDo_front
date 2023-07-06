import React, { useState, useEffect } from "react";

function NetworkValue({ style }) {

    const [networkStatus, setNetworkStatus] = useState({
    effectiveType: "N/A",
    rtt: "N/A",
  });

  useEffect(() => {
    const connection =
      navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    const updateNetworkStatus = () => {
      setNetworkStatus({
        effectiveType: connection.effectiveType,
        rtt: connection.rtt,
      });
    };

    connection.addEventListener("change", updateNetworkStatus);

    // Initial update
    updateNetworkStatus();

    // Clean up
    return () => {
      connection.removeEventListener("change", updateNetworkStatus);
    };
  }, []);
  return (
    <div className="text-white" style={style}>      
        <p className="text-4xl">Network Status</p>
        <p className="text-3xl">Effective Type: {networkStatus.effectiveType}</p>
        <p className="text-3xl">RTT: {networkStatus.rtt}</p>
    </div>
  )
}

export default NetworkValue