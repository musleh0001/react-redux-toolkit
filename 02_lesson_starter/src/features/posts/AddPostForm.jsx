import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { postAdd } from "./postsSlice";

const AddPostForm = () => {
	const users = useSelector(selectAllUsers);
	const [post, setPost] = useState({ title: "", content: "", userId: "" });
	const dispatch = useDispatch();

	const handleChange = (e) => {
		setPost((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (post.title !== "" && post.content !== "" && post.userId !== "") {
			dispatch(postAdd({ ...post }));
		}
		setPost({ title: "", content: "", userId: "" });
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
				<input type="text" value={post.content} onChange={handleChange} name="content" id="postContent" />
				<button type="submit" disabled={!(Boolean(post.title) && Boolean(post.content) && Boolean(post.userId))}>
					Save Post
				</button>
			</form>
		</section>
	);
};
export default AddPostForm;
