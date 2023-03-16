const { request } = require('express')
const express = require('express')
const connect = require('../Database/DB')
const router = require('express-promise-router')()
const multer = require('multer');
const path = require('path');



//get Admin
router.get('/tbl_admin',async (req,res,next) => {
    try {
        connect.query('SELECT * FROM device_asset.tbl_admin',(err,rows) => {
            if (err){
                res.send(err)
            }
            else{
                res.send(rows)
            }
        }) 
    }
    catch (e) {
        res.send(e)
    }
})


//add employee
router.post("/tbl_admin2" ,(req,res,next) => {
    
    const admin_name = req.body.admin_name;
    const admin_designation = req.body.admin_designation;
    const admin_email = req.body.admin_email;
    const admin_password = req.body.admin_password;
    const confirmpassword = req.body.confirmpassword;
    const admin_phone = req.body.admin_phone;
    const created_timestamp = req.body.created_timestamp ;
    const updated_timestamp = req.body.updated_timestamp ;
    const admin_address = req.body.admin_address;
    const admin_id = req.body.admin_id;

    console.log(req.body);
    // console.log(next);
    // res.send('hello')
    connect.query('INSERT INTO tbl_admin (admin_name,admin_designation,admin_email,admin_password,admin_phone,admin_address,admin_id,created_timestamp,updated_timestamp) VALUES(?,?,?,?,?,?,?,now(),now())',
    [admin_name,admin_designation,admin_email,admin_password,admin_phone,admin_address,admin_id,created_timestamp,updated_timestamp],
    (err,result) => {
        if (err){
            console.log(err);
        
        }
        else{
            res.send("Values inserted");
        }
    }
    )
})

//update dataEmployee
router.put ("/update/:admin_id" ,(req,res,next) => {
    
    const admin_name = req.body.admin_name;
    const admin_designation = req.body.admin_designation;
    const admin_email = req.body.admin_email;
    const admin_password = req.body.admin_password;
    const confirmpassword = req.body.confirmpassword;
    const admin_phone = req.body.admin_phone;
    const created_timestamp = req.body.created_timestamp ;
    const updated_timestamp = req.body.updated_timestamp ;
    const admin_address = req.body.admin_address;
    const admin_id = req.body.admin_id;
    
    console.log('edit',req.body)
    connect.query('UPDATE tbl_admin SET admin_name=?,admin_designation=?,admin_email=?,admin_password=?,admin_phone=?,admin_address=?,admin_id=?,created_timestamp=now(),updated_timestamp=now() WHERE admin_id = ?',[admin_name,admin_designation,admin_email,admin_password,admin_phone,admin_address,admin_id,admin_id,created_timestamp,updated_timestamp],
    (err,result) => {
        if (err){
            console.log(err);
        
        }
        else{
            res.send("Values updated");
        }
    })
})

//get Employee for edit employee
router.get ("/getEmployee/:admin_id" ,(req,res,next) => {
    const admin_id = req.params.admin_id;
    console.log('555',req.params)

    connect.query('SELECT * FROM device_asset.tbl_admin WHERE admin_id = ? ',admin_id,
    (err,rows) => {
        if (err){
            res.send(err)
        }
        else {
            Object.keys(rows).forEach(function (key) {
                var row = rows[key];
                res.send(row)
                
            })
            // console.log(rows);
        }
    }) 
})

//delete employee
router.delete('/delete/:admin_id',(req,res) => {
    
    const admin_id = req.params.admin_id;
    connect.query('DELETE FROM tbl_admin WHERE admin_id = ?',admin_id,(err,result) => {
        if(err){
        
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
    console.log('success');
}) 

// router.post("/tbl_list_repair" ,(req,res,next) => {
    
//     const case_detail = req.body.case_detail;
//     const created_timestamp = req.body.created_timestamp ;
//     const updated_timestamp = req.body.updated_timestamp ;
//     const owner_id = req.body.owner_id;
//     const admin_id = req.body.admin_id;
//     const case_image = req.body.case_image
//     const case_note = req.body.case_note


//     console.log(req.body);
//     // console.log(next);
//     // res.send('hello')
//     connect.query('INSERT INTO tbl_list_repair (case_note,case_image,admin_id,owner_id,case_detail,created_timestamp,updated_timestamp) VALUES(?,?,?,?,?,now(),now())',
//     [case_note,case_image,admin_id,owner_id,case_detail,created_timestamp,updated_timestamp],
//     (err,resul) => {
//         if (err){
//             console.log(err);
        
//         }
//         else{
//             res.send("Values inserted");
//         }
//     }
//     )
// })

router.post("/tbl_list_repair" ,(req,res,next) => {
    
    const case_detail = req.body.case_detail.case_detail;
    const created_timestamp = req.body.created_timestamp ;
    const updated_timestamp = req.body.updated_timestamp ;
    const owner_id = req.body.owner_id;
    const admin_id = req.body.admin_id;
    const case_image = req.body.case_image
    const case_note = req.body.case_note


    console.log(req.body.case_detail.case_detail);
    // console.log(next);
    // res.send('hello')
    connect.query('INSERT INTO tbl_list_repair (case_detail,created_timestamp,updated_timestamp) VALUES(?,now(),now())',
    [case_detail,created_timestamp,updated_timestamp],
    (err,resul) => {
        if (err){
            console.log(err);
        
        }
        else{
            res.send("Values inserted");
        }
    }
    )
})


router.get('/getstatus/:id',async (req,res) => {

        const id = req.params.id

        console.log(id);
    
    try {
        const id = req.params.id;
    
        connect.query(`SELECT * FROM boi_it_smt WHERE id= '\t${id}\t'`, (err, result) => {
            if (err) {

                console.log(err);
            }
            else {
                res.send(result);
            }
        })

        
    }
    catch (e) {
        res.send(e)
    }
})





//
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public_html/', 'uploads'),
    filename: function (req, file, cb) {   
        // null as first argument means no error
        cb(null, Date.now() + '-' + file.originalname )  
    }
})

//-------post image from uplodaimage.js to database ----------------------------------------------
router.post('/tbl_list_repair2', async (req, res) => {	
    try {
        console.log(req.body.body.userInfo.filepreview);
        console.log(req.body);
        const image = req.body.body.userInfo.filepreview;
       
           const id = req.body.body.id
       
            const sql = "INSERT INTO testimg (image,admin_id) VALUES(?,?)"
            connect.query(sql, [image,id], (err, results) => {  if (err) throw err;
			     
                res.send(results)   
			}); 
      
    }catch (err) {console.log(err)}
})
//-----------get image from database for show RepairDetails.js-------------------------------------
router.get ("/getImage/:id" ,(req,res,next) => {
    const id = req.params.id;
    console.log(req.params)

    connect.query('SELECT * FROM testimg WHERE id = ?',id,
    (err,rows) => {
        if (err){
            res.send(err)
        }
        else {
            
            Object.keys(rows).forEach(function (key) {
                var row = rows[key];
                res.send(row)
            })
        }
    }) 
})
//--------------get tastimage----------------------------------------------
router.get('/gat/tbl_tastimg/:id',async (req,res,next) => {
    const id = req.params.id;
    console.log('id11',req.params)
    try {
        connect.query('SELECT * FROM testimg WHERE id = ?',id,(err,rows) => {
            if (err){
                res.send(err)
            }
            else{
                res.send(rows)
            }
        }) 
    }
    catch (e) {
        res.send(e)
    }
})
//---------put repair ----------------------------------------------------------
router.put ("/put/repair/:id" ,(req,res,next) => {
    
    const id = req.body.id;
    const case_detail = req.body.case_detail;
    
    console.log('id22',req.body.id);
    console.log('reqbody',req.body)
    connect.query('UPDATE testimg SET case_detail=? WHERE id = ?',[case_detail,id],
    (err,result) => {
        if (err){
            console.log(err);
        
        }
        else{
            res.send("Values updated");
        }
        
    })
})

//-----------------------------------------------------------------------------


module.exports = router;