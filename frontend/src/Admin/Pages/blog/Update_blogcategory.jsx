import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import apiServices from '../../../ApiServices/ApiServices'
import { ToastContainer,toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

export default function UpBlogCategory({ setIsActive, isActive }) {
  const navigate=useNavigate()
  const [name,setName]= useState()
  const param= useParams()
  const id = param._id
  useEffect(()=>{
    let data={
      _id: id
    }

    // -----------blog category start--------
    apiServices.getsingle_category(data).then(data=>{
      if(data.data.success){
        setName(data.data.data.Category_name)
      }
      else{
        toast.error(data.data.msg)
      }
    }).catch(err=>{
      // console.log(err)
      toast.error("Something Went wrong")
    })
    // -----------blog category end-------

  },[])


// -----blog---------handle----------start
  const handleCategory=(e)=>{
    e.preventDefault();
    let data = {
      Category_name:name,
      _id:id
    }
    apiServices.updatecategory(data).then(data=>{
      if(data.data.success){
        toast.success(data.data.msg)
        setTimeout(()=>{
          navigate("/admin/manage-blogcategory")
      },3000)
      }else{
        toast.error(data.data.msg)
      }
    }).catch(err=>{
      // console.log(err)
      toast.error("Something went wrong")
    })
  }
  // -----blog---------handle----------end---

  return (
    <>
          <main id="main" className={`main mainWrapper ${isActive === true && 'active'}`} >

<div className="adminpagetitle">
  <h1 className='text-start'>Dashboard</h1>
  <nav>
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
      <li className="breadcrumb-item active">Create New Product</li>
    </ol>
  </nav>
</div>
    <div className='container border col-6 shadow-lg my-5'>
      <Form.Group controlId="formCategory">
        <Form.Label>Category Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Category"
          name="category"
          value={name}
          onChange={(e)=>{setName(e.target.value)}}
          required
        />
      </Form.Group>
      <Button className='my-3 btn-primary' variant="primary" onClick={handleCategory} type="submit">
        Update blog
      </Button>
    </div>
    </main>
    <ToastContainer/> 
    </>
  )
}
