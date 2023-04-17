import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogoOnlineAssest from '../initialpage/Sidebar/img/LogoOnlineAssest.png'
import { Button, Form } from 'antd';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Card,Col } from 'antd';
import { Helmet } from "react-helmet";
import WebappHeader from '../webapp/webappHeader';


function Status() {

    let history = useHistory()
    const [open, setOpen] = useState(false);
    const [case_detail, setCase_detail] = useState("");
    const [detail, setDetail] = useState("");
    const [id_device,setId_device] = useState("");
    const { Meta } = Card;
    const [forComfirmDelete,setForComfirmDelete] = useState();
    const [form] = Form.useForm();


    const location = useLocation()

    console.log('666', location.state);

    useEffect(() => {
        getStatus()
    }, [])

    const getStatus = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/DB/get/status/device/${location.state}`)
            console.log('data', data);
            // console.log(data.length)
            setDetail(data)
            setId_device(data.id)
            console.log('dataId', data.id);
        } catch (error) {

        }
    }
    console.log(detail)

    //edit 17/04/2023
  const onFinish = async (values) => {
    setOpen(false);
    //form.resetFields();
    console.log('Received values of form: ', values);
    try {
      const { data } = await axios.put(`http://localhost:5000/DB/update/statusComplete/${id_device}`,
        {
          id:values.id_device,
        
        })
       //console.log(values.Responsible)
      //alert('success!!')
      window.location.reload();

    } catch (error) {

    }
  };
  //edit 17/04/2023

    return (
        <>

            <div >
                <WebappHeader />
                <div className="account-content">
                    <div className="container">
                        {/* Page Content */}
                        <div className="content container-fluid">
                            <div className="row">
                                <div className="col-sm-12">
                                    <Helmet>
                                        <title>UserHome</title>
                                        {/* <meta name="description" content="Login page" /> */}
                                    </Helmet>
                                    {/* Page Content */}
                                    
                                    <div className="page-wrapper-webapp">
                                        <div className="content container-fluid">
                                            <div className="form-header">

                                            {detail.case_detail && detail.status && (
                                                <>
                                                <h3 >รายละเอียดการซ่อม</h3>


                                                <div className="card">
                                                            <div className="card-body">
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


                                                <div className="card ">
                                                    <div className="card-body">
                                                        <div className="dash-widget-info">
                                                            <h5>{detail.status}</h5>
                                                            {/* <h3>{License.length}</h3> */}
                                                            {/* <span>License</span> */}

                                                            <Col>
                                                                <Button type="primary" htmlType="submit" onClick={onFinish}>ยืนยันการรับเครื่อง </Button>
                                                            </Col>
                                                        </div>
                                                    </div>
                                                </div>
                                                </>
                                                )}
                                                
                                                {/* {detail.case_detail && detail.status && (
                                                    
                                                    <div className="card ">
                                                        <div className="card-body">
                                                            <div className="dash-widget-info">
                                                            
                                                                <h5>{detail.case_detail}</h5>
                                                             
                                                                <h5>{detail.status}</h5>
                                                                <Col>
                                                                    <Button type="primary" htmlType="submit" onClick={onFinish}>ยืนยันการรับเครื่อง</Button>
                                                                </Col>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
 */}

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

            

        </>
    )
}

export default Status


