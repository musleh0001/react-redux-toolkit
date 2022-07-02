import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { deletePost, selectPostById, updatePost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const EditPostForm = () => {
	const { postId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const post = useSelector((state) => selectPostById(state, Number(postId)));
	const users = useSelector(selectAllUsers);

	const [title, setTitle] = useState(post?.title);
	const [body, setBody] = useState(post?.body);
	const [userId, setUserId] = useState(post?.userId);
	const [requestStatus, setRequestStatus] = useState("idle");

	if (!post) {
		return (
			<section>
				<h2>Post not found!</h2>
			</section>
		);
	}

	const onTitleChange = (e) => setTitle(e.target.value);
	const onBodyChange = (e) => setBody(e.target.value);
	const onAuthorChange = (e) => setUserId(Number(e.target.value));

	const canSave = [title, body, userId].every(Boolean) && requestStatus === "idle";

	const onSavePostClicked = () => {
		if (canSave) {
			try {
				setRequestStatus("pending");
				dispatch(updatePost({ id: post.id, title, body, userId, reactions: post.reactions })).unwrap();

				setTitle("");
				setBody("");
				setUserId("");
				navigate(`/post/${postId}`);
			} catch (error) {
				console.error("Failed to save the post", error);
			} finally {
				setRequestStatus("idle");
			}
		}
	};

	const usersOptions = users.map((user) => (
		<option value={user.id} key={user.id}>
			{user.name}
		</option>
	));

	const onDeletePostClicked = () => {
		try {
			setRequestStatus("pending");
			dispatch(deletePost({ id: post.id })).unwrap();

			setTitle("");
			setBody("");
			setUserId("");
			navigate("/");
		} catch (error) {
			console.error("Failed to delete the post", error);
		} finally {
			setRequestStatus("idle");
		}
	};

	return (
		<section>
			<h2>Edit Post</h2>
			<form>
				<label htmlFor="postTitle">Post Title:</label>
				<input type="text" id="postTitle" name="postTitle" value={title} onChange={onTitleChange} />
				<label htmlFor="postAuthor">Author:</label>
				<select id="postAuthor" defaultValue={userId} onChange={onAuthorChange}>
					<option value=""></option>
					{usersOptions}
				</select>
				<label htmlFor="postBody">Body:</label>
				<textarea name="postBody" id="postBody" value={body} onChange={onBodyChange} />
				<button type="button" onClick={onSavePostClicked} disabled={!canSave}>
					Update Post
				</button>
				<button className="deleteButon" type="button" onClick={onDeletePostClicked}>
					Delete Post
				</button>
			</form>
		</section>
	);
};
export default EditPostForm;
