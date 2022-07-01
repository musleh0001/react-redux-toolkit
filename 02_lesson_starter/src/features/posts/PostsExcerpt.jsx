import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import { selectPostById } from "./postsSlice";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";

const PostsExcerpt = ({ postId }) => {
	const post = useSelector((state) => selectPostById(state, postId));
	const { id, title, body, userId, date, reactions } = post;

	return (
		<article>
			<h2>{title}</h2>
			<p className="excerpt">{body.substring(0, 75)}...</p>
			<p className="postCredit">
				<Link to={`post/${post.id}`}>View Post</Link>
				<PostAuthor userId={userId} />
				<TimeAgo timestamp={date} />
			</p>
			<ReactionButtons id={id} reactions={reactions} />
		</article>
	);
};
export default PostsExcerpt;
