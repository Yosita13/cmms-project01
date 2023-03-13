import React, { useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useHistory } from 'react-router-dom';
import LogoOnlineAssest from '../initialpage/Sidebar/img/LogoOnlineAssest.png';

function UploadImage() {

    let history = useHistory()
    const [imageID, setImageID] = useState("");
    const location = useLocation()
    
    const id = location.state

    console.log(id);


    console.log('ID of user', location.state);

    const [isSucces, setSuccess] = useState(null);

    const [picture, setPicture] = useState({
        file: [],
        filepreview: null,
    });

    const [userInfo, setuserInfo] = useState({
        file: [],
        filepreview: null,
    });

    const [postImage, setPostImage] = useState({
        myFile: "",
      });
    
   
    const createImage = (newImage) => console.log('newimg',newImage);;
    
      const createPost = async (post) => {
        try {
          await createImage(post);
        } catch (error) {
          console.log(error.message);
        }
      };
    
      const handleSubmit = (e) => {
        // axios.post("http://localhost:5000/DB/tbl_list_repair2", postImage)
        // .then(res=>console.log(res))
        // e.preventDefault();
        console.log('postImage',postImage);
        
        var blob = new Blob(['1678684514063-8853042000109.jpg'], { type: 'image/jpeg' });
                var blobUrl = URL.createObjectURL(blob);
                console.log('blob',blob);
                console.log('blobURL',blobUrl);
                setPicture({
                    ...picture,
                    file:blob,
                    filepreview:blobUrl,
                });
                setPicture(blobUrl);
        createPost(postImage);
        
      };
      console.log('pic',picture);
      console.log('useinfo',userInfo);
    
      const convertToBase64 = (file) => {
        console.log('file',file);
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };

   

    const handleInputChange = async (event) => {
        setuserInfo({
            ...userInfo,
            file: event.target.files[0],
            filepreview: URL.createObjectURL(event.target.files[0]),
        });
        console.log('event',event.target.files[0]);

        const file = event.target.files[0];
        console.log('file0',file);
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });

    }
    

   
    const submit = async () => {
        const formdata = new FormData();
        var blob = new Blob([userInfo], { type: 'image/jpeg' });
        var blobUrl = URL.createObjectURL(blob);
                console.log('blob',blob);
                console.log('blobURL',blobUrl);
        formdata.append('avatar', userInfo.file);
        formdata.append('id', id);
        const image = { headers: { "Content-Type": "multipart/form-data" } }

        console.log('id');

        // axios.post("http://localhost:5000/DB/tbl_list_repair2", blobUrl, image)
        axios.post("http://localhost:5000/DB/tbl_list_repair2",{
            body:{
                userInfo,
                id
            }
        })
            .then(res => { // then print response status
                console.warn(res);
                console.log('res',res)
                setImageID(res.data.insertId)
                if (res.data.success === 1) {
                    setSuccess("Image upload successfully");
                }
                // console.log('res.data',res.data);
                // const file = new Blob ([res.data],{type:'image/jpeg'})
                
                 history.push({pathname:'/webapp/RepairDetails',state:res.data.insertId})
            })
            
            //history.push({pathname:'/webapp/RepairDetails',state:imageID})
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
                                        <h4 className="page-title">อัปโหลดรูปภาพอุปกรณ์ เพื่อแจ้งซ่อม</h4><br></br>
                                    </div>
                                </div>
                            </div>
                            {/* /Page Header */}
                        
                                <div className="col-lg-2">
                                    {/* <label className="col-lg-12 col-form-label">Selete Image</label> */}
                                </div>
                           
                                    {/* {isSucces !== null ? <h4> {isSucces} </h4> : null} */}
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
                                                    <button type="submit" className="btn btn-greensushi submit-btn" onClick={() => submit ()} > Save </button>
 
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

// import axios from 'axios';
// import React, { useState,useEffect} from 'react';
// import { Helmet } from "react-helmet";
// import AWS from 'aws-sdk';
// import { Link, useLocation } from 'react-router-dom';

// AWS.config.update({
//   accessKeyId: 'AKIASCA774D2ELBG4DKG',
//   secretAccessKey: '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',
//   region: 'us-west-2',
//   signatureVersion: 'v4',
// });

// export default function ImageUploader() {
//   const s3 = new AWS.S3();
//   const [imageUrl, setImageUrl] = useState(null);
//   const [file, setFile] = useState(null);
//   const [count, setCount] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [case_image,setCase_image] = useState('');
//   const [image,setImage] = useState('');
 
//   const[images,setImages] = useState([]);
//   const[URLsImage,setURLsImage] = useState([]);
//   const location = useLocation()


//   console.log( 'ID of user',location.state);
  
  



//   useEffect(()=>{
//     if (images.length < 1) return;
//     const newURLsImage = [];
//     images.forEach(image => newURLsImage.push(URL.createObjectURL(image)))
//     setURLsImage(newURLsImage)
//   },[images]);

//     const onImageChange = (e) => {
//     setImages([...e.target.files]);
//     //console.log(e.target.files)
//     // setImage1(e.target.files[0])
//     setFile(e.target.files[0]);
//   }

//   const uploadToS3 = async  (values) => {
    
//     if (!file) {
//       return;
//     }
//     const params = { 
//       Bucket: 'image-upload-s3-bucket-csae-datail-thing', 
//       Key: `${Date.now()}.${file.name}`, 
//       Body: file 
//     };
//     const { Location } = await s3.upload(params).promise();
//     setImageUrl(Location);
//     console.log('uploading to s3', Location);

//     setOpen(false);
//     // form.resetFields();
//     // console.log('Received values of form: ', values);
//     try {
//        console.log('Received values of form: ', values);
//       const {data} = await axios.post('http://localhost:5000/DB/tbl_list_repair2',{
//         admin_id:values.state,
//         case_image:values.imageUrl
       
//       })
//       console.log(data);

//       alert('success!!')

//     }catch(e){

//     }

//   }
//   console.log('image',imageUrl);

//   const showImage = (Url) =>{

//     console.log('url',Url);
//     setCount(true)
//   }
//   //---------------------------

//     return ( 
//        <div className="page-wrapper">
//        <Helmet>
//            <title>แจ้งซ่อม</title>
//            <meta name="description" content="Login page"/>					
//        </Helmet>
//        {/* Page Content */}
//        <div className="content container-fluid">
//          <div className="row">
//            <div className="col-md-8 offset-md-2">
//              {/* Page Header */}
//              <div className="page-header">
//                <div className="row">
//                  <div className="col-sm-12">
//                    <h3 className="page-title">Theme Settings</h3>
//                  </div>
//                </div>
//              </div>
//              {/* /Page Header */}

//                <div className="form-group row">
                 
//                  <div className="col-lg-2">
                   
//                  </div>
//                </div>
//                <div className="form-group row">
//                  <label className="col-lg-3 col-form-label">Upload image</label>
//                  <div className="col-lg-7">
//                     <input type="file" className="form-control" filename={file} onChange={onImageChange} accept="image/*"/><br></br>
//                     {URLsImage.map((imageSrc,idx) => ( <img key={idx} width = '1080' height='1080' src ={imageSrc}/>)) }
//                     {file && (
  
//                       <div style={{ marginTop: '5px' }} className="submit-section">

//                       {/* <Link to={{
//                         pathname: "/webapp/RepairDetails",
//                         state: location.state}}> */}

//                         <button className="btn btn-greensushi submit-btn" onChange={(event) => { setCase_image(event.target.value) }} onClick={uploadToS3}>Upload</button>
                       
//                       {/* </Link> */}
//                       </div>
                     
//                     )}

//                     {imageUrl && count && (
//                       <div style={{ marginTop: '10px' }}>
//                         <img src={imageUrl} alt="uploaded" />
//                       </div>
//                     )}
                    
//                  </div>
//                  <div className="col-lg-2">
                   
//                  </div>
//                </div>
              
//                {/* <Form
//                 onFinish={onFinish}
//               >
        
//               <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
//                 <Button className="btn btn-primary" type="primary" htmlType="submit">
//                 Submit
//                 </Button>
//                 </Form.Item>
               
//               <Form.Item >
//               <div className="submit-section">
//                   <Button type="primary" className="btn-gray-1000" htmlType="submit" onClick={() => showImage(imageUrl)}>Show Img</Button>
//               </div>
//               </Form.Item>
//           </Form> */}
//                </div>
//          </div>
//        </div>
//        {/* /Page Content */}
//      </div>
//       );
// }
//---------------------------
// import axios from 'axios';
// import React, { useState,useEffect} from 'react';
// import { Helmet } from "react-helmet";
// import AWS from 'aws-sdk';
// import { Link, useLocation } from 'react-router-dom';

// AWS.config.update({
//   accessKeyId: 'AKIASCA774D2ELBG4DKG',
//   secretAccessKey: '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',
//   region: 'us-west-2',
//   signatureVersion: 'v4',
// });

// export default function ImageUploader() {
//   const s3 = new AWS.S3();
//   const [imageUrl, setImageUrl] = useState(null);
//   const [file, setFile] = useState(null);
//   const [count, setCount] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [case_image,setCase_image] = useState('');
//   const [image,setImage] = useState('');
 
//   const[images,setImages] = useState([]);
//   const[URLsImage,setURLsImage] = useState([]);
//   const location = useLocation()


//   console.log( 'ID of user',location.state);
  
  



//   useEffect(()=>{
//     if (images.length < 1) return;
//     const newURLsImage = [];
//     images.forEach(image => newURLsImage.push(URL.createObjectURL(image)))
//     setURLsImage(newURLsImage)
//   },[images]);

//     const onImageChange = (e) => {
//     setImages([...e.target.files]);
//     //console.log(e.target.files)
//     // setImage1(e.target.files[0])
//     setFile(e.target.files[0]);
//   }

//   const uploadToS3 = async  (values) => {
    
//     if (!file) {
//       return;
//     }
//     const params = { 
//       Bucket: 'image-upload-s3-bucket-csae-datail-thing', 
//       Key: `${Date.now()}.${file.name}`, 
//       Body: file 
//     };
//     const { Location } = await s3.upload(params).promise();
//     setImageUrl(Location);
//     console.log('uploading to s3', Location);

//     setOpen(false);
//     // form.resetFields();
//     // console.log('Received values of form: ', values);
//     try {
//        console.log('Received values of form: ', values);
//       const {data} = await axios.post('http://localhost:5000/DB/tbl_list_repair2',{
//         admin_id:values.state,
//         case_image:values.imageUrl
       
//       })
//       console.log(data);

//       alert('success!!')

//     }catch(e){

//     }

//   }
//   console.log('image',imageUrl);

//   const showImage = (Url) =>{

//     console.log('url',Url);
//     setCount(true)
//   }
//   //---------------------------

//     return ( 
//        <div className="page-wrapper">
//        <Helmet>
//            <title>แจ้งซ่อม</title>
//            <meta name="description" content="Login page"/>					
//        </Helmet>
//        {/* Page Content */}
//        <div className="content container-fluid">
//          <div className="row">
//            <div className="col-md-8 offset-md-2">
//              {/* Page Header */}
//              <div className="page-header">
//                <div className="row">
//                  <div className="col-sm-12">
//                    <h3 className="page-title">Theme Settings</h3>
//                  </div>
//                </div>
//              </div>
//              {/* /Page Header */}

//                <div className="form-group row">
                 
//                  <div className="col-lg-2">
                   
//                  </div>
//                </div>
//                <div className="form-group row">
//                  <label className="col-lg-3 col-form-label">Upload image</label>
//                  <div className="col-lg-7">
//                     <input type="file" className="form-control" filename={file} onChange={onImageChange} accept="image/*"/><br></br>
//                     {URLsImage.map((imageSrc,idx) => ( <img key={idx} width = '1080' height='1080' src ={imageSrc}/>)) }
//                     {file && (
  
//                       <div style={{ marginTop: '5px' }} className="submit-section">

//                       {/* <Link to={{
//                         pathname: "/webapp/RepairDetails",
//                         state: location.state}}> */}

//                         <button className="btn btn-greensushi submit-btn" onChange={(event) => { setCase_image(event.target.value) }} onClick={uploadToS3}>Upload</button>
                       
//                       {/* </Link> */}
//                       </div>
                     
//                     )}

//                     {imageUrl && count && (
//                       <div style={{ marginTop: '10px' }}>
//                         <img src={imageUrl} alt="uploaded" />
//                       </div>
//                     )}
                    
//                  </div>
//                  <div className="col-lg-2">
                   
//                  </div>
//                </div>
              
//                {/* <Form
//                 onFinish={onFinish}
//               >
        
//               <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
//                 <Button className="btn btn-primary" type="primary" htmlType="submit">
//                 Submit
//                 </Button>
//                 </Form.Item>
               
//               <Form.Item >
//               <div className="submit-section">
//                   <Button type="primary" className="btn-gray-1000" htmlType="submit" onClick={() => showImage(imageUrl)}>Show Img</Button>
//               </div>
//               </Form.Item>
//           </Form> */}
//                </div>
//          </div>
//        </div>
//        {/* /Page Content */}
//      </div>
//       );
// }

//----------------ใช้จริงโค้ดนี้---------------------------------------------
