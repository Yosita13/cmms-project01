// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import LogoOnlineAssest from '../initialpage/Sidebar/img/LogoOnlineAssest.png';
// import CmmsOnline from '../webapp/CmmsOnline.png';
// import { Button, Form, Input } from 'antd';
// import { Link } from 'react-router-dom';



// function RepairDetails() {

//     const [open, setOpen] = useState(false);
//     const [case_detail, setCase_detail] = useState("");
//     const [detail, setDetail] = useState("");


//     const layout = {
//         labelCol: { span: 8 },
//         wrapperCol: { span: 16 },
//     };

//     /* eslint-disable no-template-curly-in-string */
//     const validateMessages = {
//         required: '${label} is required!',
//         types: {
//             email: '${label} is not a valid email!',
//             number: '${label} is not a valid number!',
//         },
//         number: {
//             range: '${label} must be between ${min} and ${max}',
//         },
//     };
//     /* eslint-enable no-template-curly-in-string */

//     const onFinish = async (values) => {
//         setOpen(false);
//         console.log('Received values of form: ', values);
//         try {
//             console.log('Received values of form: ', values);
//             const { data } = await axios.post('http://localhost:5000/DB/tbl_list_repair', {

//                 case_detail: values.case_detail
//             })
//             console.log(data);
//         } catch (e) {

//         }
//     };

//     const hideModal = () => {
//         setOpen(false);
//     };


//     const getRepailDeail = async () => {
//         try {
//             const { data } = await axios.get('http://localhost:5000/DB/tbl_list_repair')
//             // console.log(data.length)
//             setDetail(data)
//         } catch (error) {

//         }
//     }

//     useEffect(() => {
//         getRepailDeail()
//     }, [])

//     return (
//         <>
//          <section className="comp-section comp-cards" id="comp_cards">
//                 <div className="content container-fluid">
//                     <div className="page-header">
//                         <div className="row">
//                             <div className="col-sm-12">
//                                 <div className="col-md-6 text-center">

//                                 <div classname="col-sm-6 col-md-4">
//                                     <div className="content container-fluid">
//                                         <div className="page-header">
//                                             <div className="form-header">
//                                                 <div className="row align-items-center">
//                                     {/* Account Logo */}

//                                     <div className="account-logo">
//                                         <img src={CmmsOnline} alt="" />
//                                     </div>

//                                     {/* /Account Logo */}
//                                     <br></br>
//                                     <h3 className="card-title">รายละเอียดการแจ้งซ่อม</h3>
//                                 </div>


//                                     <div className="row">
//                                             <div className="card flex-fill">
//                                                 <img alt="" src={LogoOnlineAssest} className="card-img-top" />
//                                                 <div className="card-header">
//                                                     <h5 className="card-title mb-0"></h5>
//                                                 </div>

//                                                 <div className="card-body">
//                                                     <Form
//                                                         {...layout}
//                                                         name="nest-messages"
//                                                         onFinish={onFinish}
//                                                         style={{ width: 400}}
//                                                         validateMessages={validateMessages}
//                                                     >
//                                                         <Form.Item name={['case_detail', 'case_detail']} label="รายละเอียดการแจ้งซ่อม"
//                                                             onChange={(event) => {
//                                                                 setCase_detail(event.target.value)
//                                                             }}
//                                                         ><br></br><br></br>
//                                                             <Input.TextArea />
//                                                         </Form.Item>

//                                                         {/* <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
//                                                             <Button className="btn btn-primary" type="primary" htmlType="submit">
//                                                                 Submit
//                                                             </Button>
//                                                         </Form.Item>
//                                                         */}

//                                                         <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
//                                                             <Link to="/webapp/TakePhoto">
//                                                                 <Button type="primary" className='btn-gray-1000' onClick={hideModal}>Cancle</Button>
//                                                             </Link>
//                                                             <Button type="primary" className="btn-greensushi" htmlType="submit">Save</Button>
//                                                         </Form.Item>
//                                                     </Form>

//                                                                         {/* Account Logo */}
//                                                                         <div className="account-logo">
//                                                                             <img src={LogoOnlineAssest} alt="Dreamguy's Technologies" />
//                                                                         </div>
//                                                                         {/* /Account Logo */}
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                     </div>




//                             </div>
//                         </div>
//                     </div>
//                 </div>

//             </section>

//         </>
//     )
// }

// export default RepairDetails


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogoOnlineAssest from '../initialpage/Sidebar/img/LogoOnlineAssest.png';
import CmmsOnline from '../webapp/CmmsOnline.png';
import cat from '../webapp/cat.png';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';



function RepairDetails() {

    let history = useHistory()
    const [open, setOpen] = useState(false);
    const [case_detail, setCase_detail] = useState("");
    const [detail, setDetail] = useState("");
    const [pic,setPic] = useState();
    const [dataImg,setDataImg] = useState();
    const [initialValues, setInitialValues] = useState();
    const [id,setID] = ('')
   
    const { Meta } = Card;
    const location = useLocation()
    
    
    

    console.log('location',location.state);
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const onFinish = async (values) => {
        setOpen(false);
        console.log('Received values of form: ', values);
        console.log('id front',location.state);
        try {
            console.log('Received values of form: ', values);
            const { data } = await axios.put(`http://localhost:5000/DB/put/repair/${location.state}}`, {
                case_detail: values.case_detail,
                id:location.state
                
            })
            history.push({pathname:'/webapp/sendRepairFinish'})
            
           
        } catch (e) {

        }
    };

    useEffect(() => {
        getDataImage()
      }, [])

    const getDataImage = async (values) => {

        try {
        const { data } = await axios.get(`http://localhost:5000/DB/gat/tbl_tastimg/${location.state}`)
          console.log('123',data);
          setID(data)
        }catch(error){

        }
          
            
          //console.log('222',defaultValue);
        
      }
      

   
    useEffect(() => {
        getImage()
      }, [])
    
      const getImage = async () => {
        try {
          const { data } = await axios.get(`http://localhost:5000/DB/getImage/${location.state}`)
           console.log('data',data)
          setPic(data)
        } catch (error) {
    
        }
      }

     

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };
    /* eslint-enable no-template-curly-in-string */

   
    
    const hideModal = () => {
        setOpen(false);
    };

   

    
    return (
        <>

            <section className="comp-section comp-cards" id="comp_cards">
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

                                                        {/* Account Logo */}

                                                        <div className="account-logo">
                                                            <img src={CmmsOnline} alt="" />
                                                        </div>

                                                        {/* /Account Logo */}
                                                        <br></br>

                                                        <h3 className="page-title">รายละเอียดการแจ้งซ่อม</h3>




                                                        {/* Content Starts */}
                                                       <Card>
                                                       {pic&&<img alt="" src={pic.image} />}

                                                        


                                                            <Form
                                                                {...layout}
                                                                name="nest-messages"
                                                                onFinish={onFinish}
                                                               
                                                                validateMessages={validateMessages}
                                                            >
                                                                <Form.Item name={['case_detail']} label="รายละเอียดการแจ้งซ่อม"
                                                                    onChange={(event) => {
                                                                        setCase_detail(event.target.value)
                                                                    }}
                                                                >
                                                                    <Input.TextArea />
                                                                </Form.Item>

                                                                {/* <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                                                    <Button className="btn btn-primary" type="primary" htmlType="submit">
                                                                        Submit
                                                                    </Button>
                                                                </Form.Item>
                                                                */}

                                                                <Form.Item >
                                                                    <Link to="/webapp/QR">
                                                                        <Button type="primary" className='btn-gray-1000' onClick={hideModal}>Cancle</Button>
                                                                    </Link>
                                                                    <Button type="primary" className="btn-greensushi"   htmlType="submit">Save</Button>
                                                                </Form.Item>
                                                            </Form>
                                                      </Card>

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

export default RepairDetails


