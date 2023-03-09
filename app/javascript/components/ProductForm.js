import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createProduct } from '../redux/detail/Detail';
import { useNavigate } from 'react-router-dom';


const ProductForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const reserveStatus = useSelector((state) => state.reservations.reserveStatus);
  // const [successMsg, setSuccess] = useState(false);

  const product = useSelector((state) => state.product);

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0.0);
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      name,
      image,
      price,
      description
    }
    dispatch(createProduct(productData));
  }

  // useEffect(() => {
  //   navigate('/Home');
  //   dispatch(createProduct(productData));
  // }, [dispatch]);

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add new product</h1>
      <div className="product-fields">
        <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="user name" autoComplete='true'/>
        <input type="text" onChange={(e) => setImage(e.target.value)} value={image} />
        <input type="number" onChange={(e) => setPrice(e.target.value)} value={price} placeholder="Price" autoComplete='true'/>
        <textarea maxLength="300" minLength="30px" onChange= {(e) => setDescription(e.target.value)}
        value ={description}  autoComplete="true">
          Enter some description about the product
        </textarea>
      </div>


      <input type="submit" value = "Add product" />
    </form>
  )
}

export default ProductForm