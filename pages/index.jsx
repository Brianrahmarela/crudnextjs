import { Form, Button, Container, Modal } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { postTodo, putTodo, deleteTodo } from "../slices/todoSlice";
// import { fetcher } from "../utils";

//komponen
// import Increment from "../components/Increment";
// import Decrement from "../components/Decrement";

function Home() {
	const router = useRouter();
	const checkIsLogin = () => {
		let isLogin = localStorage.getItem("is Login");
		let authTrue = localStorage.getItem("authTrue");
		isLogin && authTrue ? router.push("/") : router.push("/users/register");
	};

	useEffect(() => {
		checkIsLogin();
	}, []);

	//MODAL
	const [dataModal, setDataModal] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [todoId, setTodoId] = useState("");

	const handleShow = (id) => {
		setTodoId(id);
		setShowModal(true);
	};

	const handleClose = () => setShowModal(false);

	const handleCloseSave = (e) => {
		setShowModal(false);
		axios
			.put("https://fake-api-todos.herokuapp.com/todo/" + todoId, {
				todo: dataModal
			})
			.then((result) => dispatch(putTodo(result.data)))
			.catch((error) => dispatch(putTodo(error)));
	};

	const handleChangeModal = (e) => {
		setDataModal(e.target.value);
	};

	let addTodoHandle = async (e) => {
		e.preventDefault();
		// console.log("e.target.todoItem.value", e.target.todoItem.value);

		axios
			.post("https://fake-api-todos.herokuapp.com/todo/", {
				todo: e.target.todoItem.value
			})
			.then((result) => dispatch(postTodo(result.data)))
			.catch((error) => dispatch(postTodo(error)));
		e.target.todoItem.value = "";
	};

	// const count = useSelector((state) => state.counter.value);
	const data = useSelector((state) => state.todo.data);
	const dispatch = useDispatch();

	const deleteTodoHandle = async (id) => {
		let idTodoNotSame = data.filter((item) => item.id !== id);

		if (data.length === 0) {
			axios
				.delete(`https://fake-api-todos.herokuapp.com/todo/${id}`)
				.then((result) => dispatch(deleteTodo(result.data)))
				.catch((error) => console.log(error));
		} else {
			axios
				.delete(`https://fake-api-todos.herokuapp.com/todo/${id}`)
				.then((result) => dispatch(deleteTodo(idTodoNotSame)))
				.catch((error) => console.log(error));
		}
	};

	return (
		<>
			<Container>
				<h1>Hal Home</h1>
				{/* <p>tes increment decrement redux</p> */}
				{/* <Increment />
				<Decrement /> */}
				{/* {count} */}

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
						<p>No Data</p>
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
								<div key={todo.id}>
									<h5
										style={{ paddingBottom: "4px", marginBottom: "10px" }}
										key={todo.id}
										id={todo.id}
									>
										{todo.todo}
										<br></br>
										<Button
											type="submit"
											style={{
												marginTop: "7px",
												backgroundColor: "#0b1a3e",
												borderColor: "#0b1a3e"
											}}
											onClick={() => handleShow(todo.id)}
										>
											Edit
										</Button>
										<Button
											variant="danger"
											type="submit"
											style={{ margin: "7px 0px 0px 7px" }}
											onClick={() => deleteTodoHandle(todo.id)}
										>
											Delete
										</Button>
									</h5>
								</div>
							))}
						</div>
					)}
				</div>

				<Modal show={showModal} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Item: </Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group>
							<Form.Control
								size="lg"
								type="text"
								placeholder="update your item"
								onChange={handleChangeModal}
							/>
							<br />
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button variant="primary" onClick={handleCloseSave}>
							Save Changes
						</Button>
					</Modal.Footer>
				</Modal>
			</Container>
		</>
	);
}

export default Home;
