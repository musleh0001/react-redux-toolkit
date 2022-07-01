import { useSelector } from "react-redux";

import { getPostsError, getPostsStatus, selectAllPosts, selectPostIds } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
	const orderedPostIds = useSelector(selectPostIds);
	// const posts = useSelector(selectAllPosts)
	const status = useSelector(getPostsStatus);
	const error = useSelector(getPostsError);

	let content;
	if (status === "loading") {
		content = <div className="spin"></div>;
	} else if (status === "succeeded") {
		// const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
		// content = orderedPosts.map((post) => <PostsExcerpt key={post.id} post={post} />);
		content = orderedPostIds.map((postId) => <PostsExcerpt key={postId} postId={postId} />);
	} else if (status === "failed") {
		content = <p>{error}</p>;
	}

	return <section className="post">{content}</section>;
};
export default PostsList;
