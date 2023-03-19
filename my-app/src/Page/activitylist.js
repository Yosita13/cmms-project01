import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MoreOutlined, EditOutlined, MailOutlined } from '@ant-design/icons';
import Header from '../initialpage/Sidebar/header'
import Sidebar from '../initialpage/Sidebar/sidebar'
import {Form,Input,Select,Row,DatePicker,Dropdown, Button, Col, Modal, Space, Table, Tag} from 'antd';
import { itemRender, onShowSizeChange } from "../Page/paginationfunction"
import { useLocation } from 'react-router-dom';


const { Option } = Select;

const Activity = ({ID}) => {


  const [menu, setMenu] = useState(false)
  const [open, setOpen] = useState(false)
  const [Admin, setAdmin] = useState([])
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [admin_id, setAdmin_id] = useState("");
  const [dataEmployee, setDataEmployee] = useState();
  const [initialValues, setInitialValues] = useState();
  const [Status, setStatus] = useState(false);
  const [data, setData] = useState([]);
  const location = useLocation()


  

  console.log('data is ', data)

 
  // useEffect(() => {
  //   getAdmin()
  // }, [])

  // const getAdmin = async () => {
  //   try {
  //     const { data } = await axios.get('http://localhost:5000/DB/get/activity')

  //     // console.log('help',data.length)
  //     setData(data)
  //   } catch (error) {

  //   }
  // }

   
  useEffect(() => {
    getAdmin()
  }, [])

  const getAdmin = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/DB/get/get/for/join')

      // console.log('help',data.length)
      setData(data)
    } catch (error) {

    }
  }


  
  const onReset = () => {
    form.resetFields();
    getAdmin();
  };
  const onFinish = async (values) => {
    setOpen(false);
    form.resetFields();
    console.log('Received values of form: ', values);
    try {
      const { data } = await axios.put(`http://localhost:5000/DB/update/status${values.ID}`,
        {
          status: values.status,
        })
      // console.log(data.length)
      alert('success!!')

    } catch (error) {

    }
  };

 
 
  const getActivity = (values) => {
    
    //console.log(values);
    const { data } =  axios.get(`http://localhost:5000/DB/get/status/${values.id}`).then((response) => {
        //console.log('123',response.data.admin_name);
        setData(data)
        console.log(response.data);
        setDataEmployee(response.data);
        const defaultValue = {
            id: response.data.ID,
            employee_name: response.data.employee_name,
            device_serial: response.data.device_serial,
            device_model: response.data.device_model,
            case_detail: response.data.case_detail,
            status:response.data.status
        
        }
        //console.log('222',defaultValue);
        setInitialValues(defaultValue);

        
      })
      // showModal()
      setOpen(true);
      console.log(initialValues);
      console.log(dataEmployee);
      
    
  }
  //console.log('id',id)

  const items = [
    {
      label: <a onClick={getActivity}>edit</a>,
      key: '0' , 
      icon: <EditOutlined />,
      
     
    },
    {
      label: <a href="/app/profile/employee-profile">send email</a>,
      key: '1',
      icon: <MailOutlined />,
    },
  ];

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };



  
  const toggleMobileMenu = () => {
    setMenu(!menu)
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };


  

  
  const columns = [

    {
      title: 'ID',
      dataIndex: 'id',

      sorter: (a, b) => a.ID.length - b.ID.length,
    },
    {
      title: 'User',
      dataIndex: 'employee_name',
      sorter: (a, b) => a.admin_name.length - b.admin_name.length,
    },
    {
      title: 'Device_id',
      dataIndex: 'device_id',
      sorter: (a, b) => a.device_id.length - b.device_id.length,
    },

    {
      title: 'device_serial',
      dataIndex: 'device_serial',
      sorter: (a, b) => a.admin_email.length - b.admin_email.length,
    },

    {
      title: 'Model',
      dataIndex: 'device_model',
      sorter: (a, b) => a.admin_phone.length - b.admin_phone.length,
    },

    {
      title: 'Note',
      dataIndex: 'case_detail',
      sorter: (a, b) => a.case_detail.length - b.case_detail.length,
    },

   
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) =>
        <div>
          <span className={text === ":success" ? "badge bg-inverse-success" : "badge bg-inverse-info"}>{text}</span>
          <div className="dropdown profile-action">

            <div >

              <Dropdown   
                
                menu={{
                  items,
                }}
                placement="bottomRight"
              >
                <Button type='text'   ><MoreOutlined /></Button>
              </Dropdown>


            </div>

            <Modal
                  width={650}
                  title="Update Status"
                  open={open}
                  // onOk={hideModal}
                  footer={null}
                  onCancel={hideModal}
                  okText="submit"
                  cancelText="cancle"
                >
                  <Form
                    {...formItemLayout}
                    form={form}
                    name="save"
                    onFinish={onFinish}
                    initialValues={{
                      residence: ['zhejiang', 'hangzhou', 'xihu'],
                      prefix: '86',
                    }}
                    scrollToFirstError
                  >
                    
              
                    <Form.Item
                      name="Status"
                      label="Status"
                      rules={[{ required: true, message: 'Please select status!' }]}
                      onChange={(event) => {
                        setStatus(event.target.value)
                      }}
                    >
                      <Select placeholder="select status device">
                        <Option value="success">success</Option>
                        <Option value="in progress">in progress</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item  {...tailFormItemLayout}>
                      <Row>
                        <Col span={12} style={{ textAlign: 'left' }}>
                          <Button type="primary" htmlType="submit">
                            save
                          </Button></Col>
                        <Col span={12} style={{ textAlign: 'right' }}>
                          <Button type="primary" danger onClick={hideModal}>
                            Cancle
                          </Button>
                        </Col>
                      </Row>

                    </Form.Item>
                  </Form>
                </Modal>
          </div>
        </div>


      // render: (text, record) => <Tag>{text}</Tag>
    },



  ]



  return (
    <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>

      <Header onMenuClick={(value) => toggleMobileMenu()} />
      {/* <Navbar/> */}
      <Sidebar />
      <div className="page-wrapper">
        <Helmet>
          <title>Activity</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Activity</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/Page/admindashboard">Dashboard</Link></li>
                  <li className="breadcrumb-item active">Activity</li>
                </ul>
              </div>
              <div className="col-sm-6 col-md-2">
              </div>
            </div>
          </div>

          <Form

            form={form2}
            name="control-hooks"
            onFinish={''}

          >
            <div className="row filter-row">
              <Form.Item
                style={{
                  marginBottom: 0,
                }}
              >
                <Form.Item
                  name="id"

                  style={{
                    display: 'inline-block',
                    width: 'calc(50% - 8px)',
                  }}
                >
                  <input className="form-control floating" placeholder="Employee ID" />
                </Form.Item>
                <Form.Item
                  name="name"

                  style={{
                    display: 'inline-block',
                    width: 'calc(50% - 8px)',
                    margin: '0 8px',
                  }}
                >
                  <input className="form-control floating" placeholder="Employee Name" />
                </Form.Item>
              </Form.Item>
            </div>

            <Form.Item >

              <div className="col-sm-6 col-md-4" style={{ textAlign: 'left' }}>
                <Button type="primary" htmlType="submit" className="btn btn-success btn-block w-20">
                  Search
                </Button>
                <Button htmlType="button" className="btn btn-danger btn-block w-20 " style={{ marginLeft: '5px' }} onClick={onReset}>
                  Reset
                </Button>

                <div></div>
              </div>

            </Form.Item>


          </Form>


        </div>

        <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>


          <Header onMenuClick={(value) => toggleMobileMenu()} />
          <Sidebar />

          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table className="table-striped"
                  pagination={{
                    total: data?.length,
                    showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                  }}
                  style={{ overflowX: 'auto' }}
                  columns={columns}

                  dataSource={data}
                  rowKey={record => record.id}

                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activity;
