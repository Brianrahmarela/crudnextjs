import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Form, Button, Container, Row, Card } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
//komponen
import Increment from "../components/Increment"
import Decrement from "../components/Decrement"
function Home(props) {
  console.log("props home", props);
  const router = useRouter();
    const checkIsLogin = () => {
    let isLogin = localStorage.getItem("is Login");
    console.log('isLogin', isLogin)
    isLogin ? router.push("/") : router.push("/users/register");
  };

  useEffect(() => {
    checkIsLogin();
  }, []);

  const count = useSelector((state) => state.counter.value)

  return (
    <>
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
      <h1>Hal Home</h1>
      <Increment/>
      <Decrement/>
      {count}
    </>
  );
}

export default Home;

// export async function getStaticProps(context) {
//   console.log("context", context);
//   // console.log('dataUser getStaic', dataUser)
//   // const response = await axios.post('/user', dataUser)
//   //   .then(function (response) {
//   //     console.log(response);
//   //   })
//   //   .catch(function (error) {
//   //     console.log(error);
//   //   });

//   return {
//     props: { initialData: "response.data" },
//     // props: { initialData: response.data },
//     // revalidate: 1,
//   };
// }
