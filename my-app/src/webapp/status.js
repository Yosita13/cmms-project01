import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogoOnlineAssest from '../initialpage/Sidebar/img/LogoOnlineAssest.png';
import CmmsOnline from '../webapp/CmmsOnline.png';
import { Button, Form } from 'antd';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Card } from 'antd';
import { Helmet } from "react-helmet";


function Status() {

    let history = useHistory()
    const [open, setOpen] = useState(false);
    const [case_detail, setCase_detail] = useState("");
    const [detail, setDetail] = useState("");
    const { Meta } = Card;

    const location = useLocation()

    console.log('666', location.state);

    useEffect(() => {
        getStatus()
    }, [])

    const getStatus = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/DB/get/status/device/${location.state}`)
            console.log('data',data);
            // console.log(data.length)
            setDetail(data)
        } catch (error) {

        }
    }
    console.log(detail)

    return (
        <>

            <section className="comp-section comp-cards" id="comp_cards">
                <div className="account-content">
                    <div className="container">
                        <div classname="col-sm-6 col-md-4">
                        <Helmet>
                                <title>Status</title>
                                <meta name="description" content="Login page" />
                            </Helmet>
                            <div className="content container-fluid">
                                <div className="page-header">
                                    <div className="form-header">
                                        <div className="row align-items-center">
                                            {/* Page Content */}
                                            <div className="content container-fluid">
                                                <div className="row">
                                                    <div className="col-sm-8">

                                                        {/* Account Logo */}

                                                        <div className="account-logo">
                                                            <img src={CmmsOnline} alt="" />
                                                        </div>

                                                        {/* /Account Logo */}
                                                        <br></br>

                                                        <h3 >รายละเอียดการซ่อม</h3>


                                                        <div className="card dash-widget">
                                                            <div className="card-body">
                                                                <span ><i className="fa fa-usd" /></span>
                                                                <div className="dash-widget-info">
                                                                    <h5>{detail.case_detail}</h5>
                                                                    {/* <h5>{detail[0]?.case_detail}</h5> */}
                                                                    {/* <h3>{License.length}</h3> */}
                                                                    {/* <span>License</span> */}
                                                                </div>
                                                            </div>
                                                        </div>



                                                        <h3 >สถานะการซ่อม</h3>
                                                        {/* <h3 className="page-title">สถานะการซ่อม</h3> */}


                                                        <div className="card dash-widget">
                                                            <div className="card-body">
                                                                <span ><i className="fa fa-usd" /></span>
                                                                <div className="dash-widget-info">
                                                                    <h5>{detail.status}</h5>
                                                                    {/* <h3>{License.length}</h3> */}
                                                                    {/* <span>License</span> */}
                                                                </div>
                                                            </div>
                                                        </div>



                                                        {/* Content Starts */}

                                                        <Form.Item >

                                                            <Link to={{
                                                                pathname: "/webapp/userhome",
                                                                state: location.state
                                                            }}>
                                                                <Button type="primary" className="btn-greensushi" htmlType="submit">BACK</Button></Link>
                                                        </Form.Item>


                                                        {/* Account Logo */}

                                                        <img src={LogoOnlineAssest} />

                                                        {/* /Account Logo */}

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

            </section>


        </>
    )
}

export default Status


