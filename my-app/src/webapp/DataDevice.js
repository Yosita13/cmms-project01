import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogoOnlineAssest from '../initialpage/Sidebar/img/LogoOnlineAssest.png';
import CmmsOnline from '../webapp/CmmsOnline.png';
import { Button, Form } from 'antd';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Card } from 'antd';



function DataDevice() {

    let history = useHistory()
   
    const [detail, setDetail] = useState("");
    const { Meta } = Card;

    const location = useLocation()

    console.log( '55555',location.state);

    useEffect(() => {
        getStatus()
    }, [])

    const getStatus = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/DB/getstatus/${location.state}`)
            // console.log(data.length)
            setDetail(data)
        } catch (error) {

        }
    }
    //console.log(detail)



    return (
        <>

            <section className="comp-section comp-cards" >
                <div className="container">
                    <div className="content container-fluid">
                        <div className="form-header">
                            <div className="content container-fluid">
                                {/* Account Logo */}

                                <div className="account-logo">
                                    <img src={CmmsOnline} alt="" />
                                </div>

                                {/* /Account Logo */}
                                <br></br>

                                <h4 className="page-title">ข้อมูลอุปกรณ์</h4>


                                <div className="card dash-widget">
                                    <div className="card-body">
                                        <span ><i className="fa fa-usd" /></span>
                                        <div className="dash-widget-info">
                                            <h5><div class="font-weight-bold" >ID  :</div> {detail[0]?.id}</h5>
                                            <h5>Name : {detail[0]?.server_name}</h5>
                                            <h5>Status : {detail[0]?.status}</h5>
                                            <h5>Type : {detail[0]?.case_type}</h5>
                                            <h5>Mainboard : {detail[0]?.mainboard}</h5>
                                            <h5>CPU : {detail[0]?.cpu}</h5>
                                            <h5>ram : {detail[0]?.ram}</h5>
                                            <h5>HD : {detail[0]?.hd}</h5>
                                            <h5>License : {detail[0]?.license}</h5>
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
            </section>


        </>
    )
}

export default DataDevice


