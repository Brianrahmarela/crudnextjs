import React from "react";
import { Form, Button, Container, Row, Card } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
	const router = useRouter();
	const [errorDuplicate, setErrorDuplicate] = useState("");
	const [dataUser, setdataUser] = useState({
		noid: 1,
		username: "",
		password: ""
	});

	const handleChange = (e) => {
		setErrorDuplicate("");
		setdataUser((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value.toLowerCase()
		}));
	};
	const handleChangePass = (e) => {
		setErrorDuplicate("");

		setdataUser((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value.toLowerCase()
		}));
	};
	const checkLogin = (e) => {
		e.preventDefault();

		axios
			.get("https://fake-api-todos.herokuapp.com/users")
			.then((res) => {
				let sameUsername = res.data.filter(
					(item, index) => item.username === dataUser.username
				);
				let samePassword = res.data.filter(
					(item, index) => item.password === dataUser.password
				);

				if (sameUsername.length !== 0) {
					// console.log("username ada");
					setErrorDuplicate("");
				}
				if (samePassword.length !== 0) {
					// console.log("Username dan password benar");
					localStorage.setItem("authTrue", true);

					setErrorDuplicate("");
					handleSubmit();
				} else {
					// console.log("username tdk ada");
					setErrorDuplicate("Username dan password salah");
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleSubmit = () => {
		localStorage.setItem("is Login", true);
		router.push("/");
	};

	return (
		<Container className="my-5">
			<Card.Title>Login</Card.Title>
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

					<Button variant="primary" type="submit" onClick={checkLogin}>
						login
					</Button>
				</Form>
			</Row>
			<Row>
				{errorDuplicate !== 0 ? (
					<p style={{ color: "red" }}>{errorDuplicate}</p>
				) : (
					""
				)}
			</Row>
		</Container>
	);
}

export default Login;
