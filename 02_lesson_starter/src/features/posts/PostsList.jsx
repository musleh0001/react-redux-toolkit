import { useSelector } from "react-redux";
import PostAuthor from "./PostAuthor";
import { selectAllPosts } from "./postsSlice";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";

const PostsList = () => {
	const posts = useSelector(selectAllPosts);

	const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

	const renderedPosts = orderedPosts.map(({ id, title, content, userId, date, reactions }) => (
		<article key={id}>
			<h3>{title}</h3>
			<p>{content.substring(0, 100)}</p>
			<p className="postCredit">
				<PostAuthor userId={userId} />
				<TimeAgo timestamp={date} />
			</p>
			<ReactionButtons id={id} reactions={reactions} />
		</article>
	));

	return (
		<section>
			<h2>Posts</h2>
			{renderedPosts}
		</section>
	);
};
export default PostsList;
