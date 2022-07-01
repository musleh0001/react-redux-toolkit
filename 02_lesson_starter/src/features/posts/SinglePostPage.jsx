import { useSelector } from "react-redux";

import { getPostsStatus, selectPostById } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link, useParams } from "react-router-dom";

const SinglePostPage = () => {
	const status = useSelector(getPostsStatus);
	const { postId } = useParams();
	const post = useSelector((state) => selectPostById(state, Number(postId)));

	if (status === "loading") {
		return <div className="spin"></div>;
	}

	const { id, title, body, userId, date, reactions } = post;

	if (!post) {
		return (
			<section>
				<h2>Post not found!</h2>
			</section>
		);
	}

	return (
		<article>
			<h2>{title}</h2>
			<p>{body}</p>
			<p className="postCredit">
				<Link to={`/post/edit/${id}`}>Edit Post</Link>
				<PostAuthor userId={userId} />
				<TimeAgo timestamp={date} />
			</p>
			<ReactionButtons id={id} reactions={reactions} />
		</article>
	);
};
export default SinglePostPage;
