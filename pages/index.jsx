import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Form, Button, Container, Row, Card } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
//komponen
import Register from "./users/register";
import { useRouter } from "next/router";

function Home(props) {
  const router = useRouter();

  console.log("props home", props);
  // let dataLocalStorageIsLogin = localStorage.getItem("is Login");

  
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
      {/* {dataLocalStorageIsLogin 
        ? router.push("/")
        :  router.push("/users/register")} */}
      {/* <Register/> */}
      {/* <h1>Welcome Brian Rahmarela!</h1> */}
    </>
  );
}

export default Home;

export async function getStaticProps(context) {
  console.log("context", context);
  // console.log('dataUser getStaic', dataUser)
  // const response = await axios.post('/user', dataUser)
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  return {
    props: { initialData: "response.data" },
    // props: { initialData: response.data },
    // revalidate: 1,
  };
}
