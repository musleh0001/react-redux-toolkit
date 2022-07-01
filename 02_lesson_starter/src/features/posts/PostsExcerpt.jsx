import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";

const PostsExcerpt = ({ post }) => {
	const { id, title, body, userId, date, reactions } = post;
	return (
		<article>
			<h3>{title}</h3>
			<p>{body.substring(0, 100)}</p>
			<p className="postCredit">
				<PostAuthor userId={userId} />
				<TimeAgo timestamp={date} />
			</p>
			<ReactionButtons id={id} reactions={reactions} />
		</article>
	);
};
export default PostsExcerpt;
