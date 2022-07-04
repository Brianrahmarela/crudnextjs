import React from "react";
import { Form, Button, Container, Row, Card } from "react-bootstrap";
import { useState } from "react";
import axios from 'axios'
import {useRouter} from 'next/router'

function Register() {
  const router = useRouter()
  const [error, setError] = useState(false)
  const [errorDuplicate, setErrorDuplicate] = useState('')
  const [dataUser, setdataUser] = useState({
    noid: 1,
    username: "",
    password: "",
  });
  console.log('dataUser', dataUser)

  const handleChange = (e) => {
    setErrorDuplicate('')

    console.log('e.target', e.target)
    console.log('e.target.id', e.target.id)
    setdataUser((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value.toLowerCase(),
    }));
  };
  const handleChangePass = (e) => {
    setErrorDuplicate('')

    setdataUser((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value.toLowerCase()
      }));

  };
  const checkRegis = (e) => {
    e.preventDefault();

    axios
    .get('http://localhost:3000/users')
    .then((res) => {
      console.log("res get cekregis", res);

      let sameUsername = res.data.filter(
        (item, index) => item.username === dataUser.username
      );
      let samePassword = res.data.filter(
        (item, index) => item.password === dataUser.password
      );
      console.log('sameUsername', sameUsername)
      console.log('samePassword', samePassword)
      if(sameUsername.length !== 0 ){
        console.log('username sudah ada')
        setErrorDuplicate('username sudah ada')
        if(samePassword.length !== 0){
          console.log('password sama')
          setErrorDuplicate('password sama')
        }
      } else{
        console.log('tdk sama')
        handleSubmit()
        setErrorDuplicate('')
      }
    })
    .catch((error) => {
        console.log(error);
    });
  }

  const handleSubmit = () => {
    // e.preventDefault();
    // checkRegis()
    // props.setIsLogin(true);
    console.log('msk handleSubmit')
    console.log("data user submit", dataUser);

    setdataUser((prevState) => ({
        ...prevState,
        noid: prevState.noid + 1
      }));
      axios
      .post('http://localhost:3000/users', dataUser)
      .then((res) => {
        console.log("res post", res); 
        // setdataUser(res.data)
        router.push('/users/login')
      })
      .catch((error) => {
          console.log(error);
          setError(error.response.status)
      });
    // localStorage.setItem("dataUser", JSON.stringify(dataUser));
    // localStorage.setItem("is Login", true);
  };
  return (
    <Container className="my-5">
      <Card.Title>Register</Card.Title>
      <Row className="justify-content-md-center">
        <Form className="mx-auto">
          <Form.Group controlId="username">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              autoComplete="username"
              value={dataUser.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={dataUser.password}
              onChange={handleChangePass}
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={checkRegis}>
            login
          </Button>
        </Form>
      </Row>
      <Row>
        {/* {error ? <p>{error.response.status}</p> : ''} */}
        {errorDuplicate !== 0 ? <p style={{color: 'red'}}>{errorDuplicate}</p> : ''}
      </Row>
    </Container>
  );
}

export default Register;
