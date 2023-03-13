import React, { useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";
import LogoOnlineAssest from '../initialpage/Sidebar/img/LogoOnlineAssest.png';

function UploadImage() {

    const [imageID, setImageID] = useState("");

    const location = useLocation()
    const id = location.state
    console.log(id);


    console.log('ID of user', location.state);


    const [userInfo, setuserInfo] = useState({
        file: [],
        filepreview: null,
    });

    const handleInputChange = (event) => {
        setuserInfo({
            ...userInfo,
            file: event.target.files[0],
            filepreview: URL.createObjectURL(event.target.files[0]),
        });

    }

    const [isSucces, setSuccess] = useState(null);

    const submit = async () => {
        const formdata = new FormData();
        formdata.append('avatar', userInfo.file);
        formdata.append('id', id);
        const image = { headers: { "Content-Type": "multipart/form-data" } }

        console.log('id');

        axios.post("http://localhost:5000/DB/tbl_list_repair2", formdata, image)
            .then(res => { // then print response status
                console.warn(res);
                console.log(res)
                setImageID(res.data.insertId)
                if (res.data.success === 1) {
                    setSuccess("Image upload successfully");
                }

            })
    }

    return (
       
            <div className="container mr-60">
                <Helmet>
                    <title>แจ้งซ่อม</title>
                    <meta name="description" content="Login page" />
                </Helmet>
                {/* Page Content */}
                <div className="content container-fluid">
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            {/* Page Header */}
                            <div className="page-header">
                                <div className="form-header">
                                    <div className="row align-items-center">
                                        <div className="account-logo">
                                            <img src={LogoOnlineAssest} alt="Dreamguy's Technologies" />
                                        </div>
                                    
                                <div className="row">
                                    <div className="col-sm-12">
                                        <h4 className="page-title">Upload Image</h4><br></br>
                                    </div>
                                </div>
                            </div>
                            {/* /Page Header */}
                        
                                <div className="col-lg-2">
                                    {/* <label className="col-lg-12 col-form-label">Selete Image</label> */}
                                </div>
                           



                           
                                    {isSucces !== null ? <h4> {isSucces} </h4> : null}
                                    <div className="form-group row">
                                        <div className="form-row">
                                        {/* <label className="col-lg-12 col-form-label">Selete Image</label> */}
                                            <div className="col-lg-14">
                                                <input type="file" className="form-control" name="upload_file" onChange={handleInputChange} /><br></br>
                                            </div>

                                            <div style={{ marginTop: '5px' }} className="submit-section">
                                                <div className="form-row">
                                                {userInfo.filepreview !== null ?
                                            <img className="previewimg" src={userInfo.filepreview} alt="UploadImage" />
                                            : null}
                                                    {/* <Link to={{
                                                    pathname: "/webapp/RepairDetails",
                                                    state: location.state
                                                }}> */}
                                                    <button type="submit" className="btn btn-greensushi submit-btn" onClick={() => submit()} > Save </button>
                                                    {/* </Link> */}

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
}

export default UploadImage;