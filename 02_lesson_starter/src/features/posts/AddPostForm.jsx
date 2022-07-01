import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { addNewPost } from "./postsSlice";

const AddPostForm = () => {
	const users = useSelector(selectAllUsers);
	const [post, setPost] = useState({ title: "", body: "", userId: "" });
	const [addRequestStatus, setAddRequestStatus] = useState("idle");
	const dispatch = useDispatch();

	const handleChange = (e) => {
		setPost((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		try {
			if (post.title !== "" && post.body !== "" && post.userId !== "" && addRequestStatus === "idle") {
				setAddRequestStatus("pending");
				dispatch(addNewPost({ ...post }));
			}
		} catch (error) {
			console.error("Failed to save the post", error);
		} finally {
			setAddRequestStatus("idle");
		}
		setPost({ title: "", body: "", userId: "" });
	};

	const usersOptions = users.map(({ id, name }) => (
		<option key={id} value={id}>
			{name}
		</option>
	));

	return (
		<section>
			<h2>Add a new Post</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="postTitle">Post Title:</label>
				<input type="text" value={post.title} onChange={handleChange} name="title" id="postTitle" />
				<label htmlFor="postAuthor">Author:</label>
				<select name="userId" id="postAuthor" onChange={handleChange}>
					<option value=""></option>
					{usersOptions}
				</select>
				<label htmlFor="postContent">Content:</label>
				<input type="text" value={post.body} onChange={handleChange} name="body" id="postContent" />
				<button type="submit" disabled={![post.title, post.body, post.userId].every(Boolean) && addRequestStatus === "idle"}>
					Save Post
				</button>
			</form>
		</section>
	);
};
export default AddPostForm;
