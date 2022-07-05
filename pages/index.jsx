import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Form, Button, Container, Row, Card } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { postTodo } from "../slices/todoSlice";
//komponen
import Increment from "../components/Increment";
import Decrement from "../components/Decrement";
import { wrapper, store } from "../store";
function Home(props) {
  console.log("props home", props);
  console.log("wrapper", wrapper);
  const router = useRouter();
  const checkIsLogin = () => {
    let isLogin = localStorage.getItem("is Login");
    console.log("isLogin", isLogin);
    isLogin ? router.push("/") : router.push("/users/register");
  };

  useEffect(() => {
    checkIsLogin();
  }, []);

  let addTodoHandle = async (e) => {
    e.preventDefault();
    console.log("e.target.todoItem.value", e.target.todoItem.value);
    // getServerSideProp(e.target.todoItem.value)
    // dispatch(postTodo(e.target.todoItem.value));
    // e.target.todoItem.value = "";
    axios
      .post("http://localhost:3000/todo", { todo: e.target.todoItem.value })
      .then((result) => dispatch(postTodo(result.data)))
      .catch((error) => dispatch(postTodo(error)));
    // .then(result => dispatch(postTodo(result.data)))
  };

  const count = useSelector((state) => state.counter.value);
  const data = useSelector((state) => state.todo.data);
  console.log("data", data);
  const dispatch = useDispatch();

  const checkData = () => {
    console.log('event',)
    console.log('function checkData jln')
  }

  return (
    <>
      <Container>
        <header>
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                <a>Blog</a>
              </Link>
            </li>
            <li>
              <Link href="/users">
                <a>Users</a>
              </Link>
            </li>
          </ul>
        </header>
        {/* <h1>Hal Home</h1> */}
        <Increment />
        <Decrement />
        {count}

        <div>
          <h3 style={{ marginTop: "50px" }}>Todo App</h3>
          <Form onSubmit={addTodoHandle}>
            <Form.Group>
              <Form.Control
                name="todoItem"
                type="text"
                placeholder="add new item"
                style={{ width: "400px", margin: "20px 0px 10px 0px" }}
              />
              <Button variant="primary" type="submit">
                Add Data
              </Button>
            </Form.Group>
          </Form>
          <br></br>
          <h3>List Data:</h3>
          {data.length === 0 ? (
            <>
            <p>No Data</p>

            {checkData()}
            </>
          ) : (
            <div
              style={{
                width: "300px",
                borderRadius: "8px",
                padding: "20px",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
              }}
            >
              {data.map((todo) => (
                <div>
                  <h5 style={{paddingBottom: '4px', marginBottom: '10px'}} key={todo.id} id={todo.id}>{todo.todo}<br></br>
                  <Button  type="submit" style={{marginTop: '7px', backgroundColor: "#0b1a3e", borderColor: "#0b1a3e"}} onClick={() => handleShow(todo.id)}>Edit</Button>
                  <Button variant="danger" type="submit" style={{margin: '7px 0px 0px 7px'}} onClick={()=> {}}>Delete</Button>
                  {/* <Button variant="success" type="submit" style={{marginTop: '7px'}} onClick={()=> dispatch((putTodo(todo.id)))}>Edit</Button></h5> */}
                  </h5>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
// export const getServerSideProp = wrapper.getServerSideProps(
//   (store) => async () => {
//     const response = await fetch(
//           'http://localhost:3000/Items'
//         );
//           const res = await response.json();
//           console.log('res', res)

//   // store.dispatch(postTodo(res));
// });

export default Home;
