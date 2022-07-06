import React from "react";
import { Form, Button, Container, Row, Card } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
	const router = useRouter();
	const [error, setError] = useState(false);
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
	const checkRegis = (e) => {
		e.preventDefault();

		axios
			.get("https://fake-api-todos.herokuapp.com/users")
			.then((res) => {
				let sameUsername = res.data.filter(
					(item) => item.username === dataUser.username
				);
				let samePassword = res.data.filter(
					(item) => item.password === dataUser.password
				);

				if (sameUsername.length !== 0) {
					// console.log("username sudah ada");
					setErrorDuplicate("username sudah ada");
					if (samePassword.length !== 0) {
						// console.log("password sama");
						setErrorDuplicate("username and password exist");
					}
				} else {
					// console.log("tdk sama");
					handleSubmit();
					setErrorDuplicate("");
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleSubmit = () => {
		setdataUser((prevState) => ({
			...prevState,
			noid: prevState.noid + 1
		}));

		axios
			.post("https://fake-api-todos.herokuapp.com/users/", { ...dataUser })
			.then((res) => {
				router.push("/users/login");
			})
			.catch((error) => {
				setError(error.response.status);
			});
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
						Register
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

export default Register;
