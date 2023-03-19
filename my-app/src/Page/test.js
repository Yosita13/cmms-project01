import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import axios from 'axios';
import $, { event } from "jquery";
import {
  Avatar_01, Avatar_02, Avatar_03, Avatar_04, Avatar_05, Avatar_11, Avatar_12, Avatar_09,
  Avatar_10, Avatar_08, Avatar_13, Avatar_16
} from "../Entryfile/imagepath"
import Addemployee from "../_components/modelbox/Addemployee"
import Editemployee from "../_components/modelbox/Editemployee"
import { DownOutlined } from '@ant-design/icons';
import Header from '../initialpage/Sidebar/header'
import Sidebar from '../initialpage/Sidebar/sidebar'
import { Dropdown, Button, Col, Modal, Space, Table, Tag } from 'antd';
import {
  Form,
  Input,
  Select,
  Row,
  DatePicker,

} from 'antd';
import Activitylist from '../Page/activitylist';
import { itemRender, onShowSizeChange } from "../Page/paginationfunction"


const { Option } = Select;

const AllEmployees = () => {


  const [menu, setMenu] = useState(false)
  const [open, setOpen] = useState(false)
  const [admin, setAdmin] = useState()
  const [Edit, setEdit] = useState([])
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [admin_name, setAdmin_name] = useState("");
  const [admin_email, setAdmin_email] = useState("");
  const [admin_password, setAdmin_password] = useState("");
  const [admin_phone, setAdmin_phone] = useState("");
  const [admin_designation, setAdmin_designation] = useState("");
  const [created_timestamp, setCreated_timestamp] = useState("");
  const [updated_timestamp, setUpdated_timestamp] = useState("");
  const [admin_address, setAdmin_address] = useState("");
  const [admin_newphone, setAdmin_newphone] = useState("");
  const [admin_id, setAdmin_id] = useState("");
  const [dataEmployee, setDataEmployee] = useState();
  const [initialValues, setInitialValues] = useState();
  const [newPassword, setNewPassword] = useState();
  const [EmployeeID, setEmployeeID] = useState(null);
  const [EmployeeName, setEmployeeName] = useState(null);
  const [id, setID] = useState(null);

  console.log('employeeID', EmployeeID);

  

  
  // const onReset = () => {
  //   form.resetFields();
  //   getAdmin();
  // };
 

  // useEffect(() => {
  //   getAdmin()
  // }, [])

  // const getAdmin = async () => {
  //   try {
  //     const { data } = await axios.get('http://localhost:5000/DB/tbl_admin')
  //     // console.log(data.length)
  //     setAdmin(data)
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
      setAdmin(data)
    } catch (error) {

    }
  }


  console.log('อะไรก็ไม่รู้',admin)

  const toggleMobileMenu = () => {
    setMenu(!menu)
  }


  return (
    <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>

      <Header onMenuClick={(value) => toggleMobileMenu()} />
      {/* <Navbar/> */}
      <Sidebar />
      <div className="page-wrapper">
    
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
         
         
        

        </div>
        {/* /employee */}
        <Activitylist admin={admin} />
        {/* Add Employee Modal */}
        <Addemployee />
        {/* /Add Employee Modal */}


      </div>
    </div>
  );
}

export default AllEmployees;
