// versi "react-qr-reader" 1.0.0. component API harus disesuaikan dengan yg baru

import "../assets/css/style.css";
import { useState } from "react";
import QrReader from 'react-qr-scanner'
import { useHistory } from 'react-router-dom';
import LogoOnlineAssest from '../initialpage/Sidebar/img/LogoOnlineAssest.png';

const ReadQr = () => {
  let history = useHistory()
  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");



  const handleScan = async (scanData) => {
    setLoadingScan(true);

    
    const location = {
      pathname: '/webapp/userhome',
      state:  data 
    }
    //console.log(`loaded data data`, scanData);
    if (scanData && scanData !== "") {
      const data=scanData.text;

      console.log(`loaded >>>`, scanData);
      
      setData(scanData);
      setStartScan(false);
      setLoadingScan(false);
      history.push({pathname:'/webapp/userhome',state:data})
     //await history.push(location)
      // setPrecScan(scanData);
    }
    
  };
  const handleError = (err) => {
    console.error(err);
  };
  return (
    <div className="account-content">
      <div className="container">
        <div classname="col-sm-6 col-md-4">
          <div className="content container-fluid">
            <div className="page-header">
              <div className="form-header">
                <div className="row align-items-center">
                  {/* Page Content */}
                  <div className="content container-fluid">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="App">
                          {/* Account Logo */}
                          <div className="account-logo">
                            <img src={LogoOnlineAssest} alt="" />
                          </div>
                          {/* /Account Logo */}

                          {/* <h2>
                            Last Scan:
                            {selected}
                          </h2> */}

                          <button
                            onClick={() => {
                              setStartScan(!startScan);
                            }}
                          >
                            {startScan ? "Stop Scan" : "Start Scan"}
                          </button>
                          {startScan && (
                            <>
                              <select onChange={(e) => setSelected(e.target.value)}>
                                <option value={"environment"}>Back Camera</option>
                                <option value={"user"}>Front Camera</option>
                              </select>
                              <QrReader
                                facingMode={selected}
                                delay={1000}
                                onError={handleError}
                                onScan={handleScan}
                                // chooseDeviceId={()=>selected}
                                style={{ width: "300px" }}
                              />
                            </>
                          )}
                          {loadingScan && <p>Loading</p>}
                          {data !== "" && <p>{data}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ReadQr;
