import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'antd';
import LogoOnlineAssest from '../initialpage/Sidebar/img/LogoOnlineAssest.png';

const Userhome = () => {

    const [menu, setMenu] = useState(false)
    const [open, setOpen] = useState(false);
    const location = useLocation()
    
    console.log(location.state);

    const showModal = () => {
        setOpen(true);
    };

    return (

        <div className="account-content">
            <div className="container">
                {/* Page Content */}
                <div className="content container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <Helmet>
                                <title>Employee</title>
                                <meta name="description" content="Login page" />
                            </Helmet>
                            {/* Page Content */}
                            <div classname="col-sm-6 col-md-4">
                                <div className="content container-fluid">
                                    <div className="page-header">
                                        <div className="form-header">
                                            <div className="row align-items-center">
                                                {/* Account Logo */}
                                                <div className="account-logo">
                                                    <img src={LogoOnlineAssest} alt="Dreamguy's Technologies" />
                                                </div>
                                                {/* /Account Logo */}

                                                <Link to={{
                                                    pathname: "/webapp/uploadImage",
                                                    state: location.state
                                                }}>
                                                    <Button type="primary" onClick={showModal} shape='round'
                                                        className="btn-greensushi" data-bs-toggle="modal" data-bs-target="#add_employee"><i className="fa fa-plus" />
                                                        แจ้งซ่อม</Button></Link><br></br>

                                                <Link to={{
                                                    pathname: "/webapp/DataDevice",
                                                    state: location.state
                                                }}>
                                                    <Button type="primary" onClick={showModal} shape='round'
                                                        className="btn-greensushi" data-bs-toggle="modal" data-bs-target="#add_employee"><i className="fa fa-plus" />
                                                        ตรวจสอบข้อมูลอุปกรณ์
                                                    </Button></Link>


                                                <Link to={{pathname:"/webapp/status",
                                                    state: location.state }}>
                                                    <Button type="primary" onClick={showModal} shape='round'
                                                        className="btn-greensushi" data-bs-toggle="modal" data-bs-target="#add_employee"><i className="fa fa-plus" />
                                                        ตรวจสอบสถานะการซ่อม
                                                    </Button></Link>

                                                
                                                <Link to="/webapp/QR">
                                                    <Button type="primary" onClick={showModal} shape='round'
                                                        className="btn-greensushi" data-bs-toggle="modal" data-bs-target="#add_employee"><i className="fa fa-plus" />
                                                        back home</Button></Link>


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

export default Userhome;
