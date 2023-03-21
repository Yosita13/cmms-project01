
/**
 * Signin Firebase
 */
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import {User,Avatar_19,Avatar_07,Avatar_06,Avatar_14} from '../Entryfile/imagepath';
import '../Entryfile/imagepath';
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';
import "../Page/index.css"
import axios from 'axios';
import {
  BarChart, Bar, Cell, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


const barchartdata = [
  { y: '2006', "Total Income": 100, 'Total Outcome': 90 },
  { y: '2007', "Total Income": 75, 'Total Outcome': 65 },
  { y: '2008', "Total Income": 50, 'Total Outcome': 40 },
  { y: '2009', "Total Income": 75, 'Total Outcome': 65 },
  { y: '2010', "Total Income": 50, 'Total Outcome': 40 },
  { y: '2011', "Total Income": 75, 'Total Outcome': 65 },
  { y: '2012', "Total Income": 100, 'Total Outcome': 90 }
];
const linechartdata = [
  { y: '2006', "Total Sales": 50, 'Total Revenue': 90 },
  { y: '2007', "Total Sales": 75, 'Total Revenue': 65 },
  { y: '2008', "Total Sales": 50, 'Total Revenue': 40 },
  { y: '2009', "Total Sales": 75, 'Total Revenue': 65 },
  { y: '2010', "Total Sales": 50, 'Total Revenue': 40 },
  { y: '2011', "Total Sales": 75, 'Total Revenue': 65 },
  { y: '2012', "Total Sales": 100, 'Total Revenue': 50 }
];
const AdminDashboard = () => {

  const [menu, setMenu] = useState(false)
  const [IT, setIt] = useState()
  const [License, setLicense] = useState()
  const [Admin, setAdmin] = useState()
  const [activity,setActivity] = useState()
  const [editStatus, setEditStatus] = useState();
  const [open, setOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMenu(!menu)
  }

  useEffect(() => {
    let firstload = localStorage.getItem("firstload")
    if (firstload === "true") {
      setTimeout(function () {
        window.location.reload(1)
        localStorage.removeItem("firstload")
      }, 1000)
    }
  });

  useEffect(() => {
    getAdmin()
  }, [])

  const getAdmin = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/DB/tbl_admin')
       console.log(data.length)
      setAdmin(data)
    } catch (error) {

    }
  }
  //console.log(IT.length)

 
  useEffect(() => {
    getActivity()
  }, [])
  const getActivity = () => {

    console.log('editstatus', editStatus);
    const { data } = axios.get(`http://localhost:5000/DB/get/status/${editStatus}`).then((response) => {
      setActivity(data)
    })
    //showModal()
    setOpen(true);

  }

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

  return (
    <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>

      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar /> 
      <div className="page-wrapper">
        <Helmet>
          <title>Dashboard </title>
          <meta name="description" content="Dashboard" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Welcome Admin!</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item active">Dashboard</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><i className="fa fa-cubes" /></span>
                  <div className="dash-widget-info">
                    {/* <h3>{Admin.length}</h3> */}
                    <span>IT</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><i className="fa fa-usd" /></span>
                  <div className="dash-widget-info">
                    <h3>SOON!</h3>
                    {/* <h3>{License.length}</h3> */}
                    <span>License</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><i className="fa fa-diamond" /></span>
                  <div className="dash-widget-info">
                    <h3>SOON!</h3>
                    <span>Network</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><i className="fa fa-user" /></span>
                  <div className="dash-widget-info">
                    <h3>SOON!</h3>
                    <span>User</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
          <div className="row">
            <div className="col-md-6 d-flex">
              <div className="card card-table flex-fill">
                <div className="card-header">
                  <h3 className="card-title mb-0">Activity</h3>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table custom-table mb-0">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Status</th>
                          <th className="text-end">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              
                              <Link to = "/app/profile/client-profile">ttt<span>CEO</span></Link>
                            </h2>
                          </td>
                          <td>barrycuda@example.com</td>
                          <td>
                            <div className="dropdown action-label">
                              <a className="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-dot-circle-o text-success" /> Active
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success" /> Active</a>
                                <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-danger" /> Inactive</a>
                              </div>
                            </div>
                          </td>
                          <td className="text-end">
                            <div className="dropdown dropdown-action">
                              <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#"><i className="fa fa-pencil m-r-5" /> Edit</a>
                                <a className="dropdown-item" href="#"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              <a href="#" className="avatar"><img alt="" src={Avatar_19} /></a>
                              <Link to = "/app/profile/client-profile">Tressa Wexler <span>Manager</span></Link>
                            </h2>
                          </td>
                          <td>tressawexler@example.com</td>
                          <td>
                            <div className="dropdown action-label">
                              <a className="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-dot-circle-o text-danger" /> Inactive
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success" /> Active</a>
                                <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-danger" /> Inactive</a>
                              </div>
                            </div>
                          </td>
                          <td className="text-end">
                            <div className="dropdown dropdown-action">
                              <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#"><i className="fa fa-pencil m-r-5" /> Edit</a>
                                <a className="dropdown-item" href="#"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              <Link to = "/app/profile/client-profile" className="avatar"><img alt="" src={Avatar_07} /></Link>
                              <Link to = "/app/profile/client-profile">Ruby Bartlett <span>CEO</span></Link>
                            </h2>
                          </td>
                          <td>rubybartlett@example.com</td>
                          <td>
                            <div className="dropdown action-label">
                              <a className="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-dot-circle-o text-danger" /> Inactive
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success" /> Active</a>
                                <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-danger" /> Inactive</a>
                              </div>
                            </div>
                          </td>
                          <td className="text-end">
                            <div className="dropdown dropdown-action">
                              <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#"><i className="fa fa-pencil m-r-5" /> Edit</a>
                                <a className="dropdown-item" href="#"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              <Link to = "/app/profile/client-profile" className="avatar"><img alt="" src={Avatar_06} /></Link>
                              <Link to = "/app/profile/client-profile"> Misty Tison <span>CEO</span></Link>
                            </h2>
                          </td>
                          <td>mistytison@example.com</td>
                          <td>
                            <div className="dropdown action-label">
                              <a className="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-dot-circle-o text-success" /> Active
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success" /> Active</a>
                                <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-danger" /> Inactive</a>
                              </div>
                            </div>
                          </td>
                          <td className="text-end">
                            <div className="dropdown dropdown-action">
                              <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#"><i className="fa fa-pencil m-r-5" /> Edit</a>
                                <a className="dropdown-item" href="#"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              <Link to = "/app/profile/client-profile" className="avatar"><img alt="" src={Avatar_14} /></Link>
                              <Link to = "/app/profile/client-profile"> Daniel Deacon <span>CEO</span></Link>
                            </h2>
                          </td>
                          <td>danieldeacon@example.com</td>
                          <td>
                            <div className="dropdown action-label">
                              <a className="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-dot-circle-o text-danger" /> Inactive
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success" /> Active</a>
                                <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-danger" /> Inactive</a>
                              </div>
                            </div>
                          </td>
                          <td className="text-end">
                            <div className="dropdown dropdown-action">
                              <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#"><i className="fa fa-pencil m-r-5" /> Edit</a>
                                <a className="dropdown-item" href="#"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer">
                  <Link to = "/app/employees/clients">View all clients</Link>
                </div>
              </div>
            </div>
            </div>
        </div>
      </div>
    </div>

  );
}

export default withRouter(AdminDashboard);


