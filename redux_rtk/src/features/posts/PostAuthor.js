import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllUsers } from "../users/usersSlice";

const PostAuthor = ({ userId }) => {
	const users = useSelector(selectAllUsers);

	const author = users.find((user) => user.id === userId);

	return <span>by {author ? <Link to={`/user/${author.id}`}>{author.name}</Link> : "Unknown author"}</span>;
};
export default PostAuthor;
