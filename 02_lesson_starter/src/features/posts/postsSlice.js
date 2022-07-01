import { createSlice, createAsyncThunk, nanoid, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const postsAdapter = createEntityAdapter({
	sortComparer: (a, b) => b.date.localeCompare(a.data),
});

const initialState = postsAdapter.getInitialState({
	status: "idle", // 'idle' | 'loading' | 'succedded' | 'failed'
	error: null,
	count: 0,
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
	const response = await axios.get(POSTS_URL);
	return response.data;
});

export const addNewPost = createAsyncThunk("posts/addNewPost", async (initialPost) => {
	const response = await axios.post(POSTS_URL, initialPost);
	return response.data;
});

export const updatePost = createAsyncThunk("posts/updatePost", async (initialPost) => {
	const { id } = initialPost;
	try {
		const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
		return response.data;
	} catch (error) {
		return error.message;
	}
});

export const deletePost = createAsyncThunk("posts/deletePost", async (initialPost) => {
	const { id } = initialPost;
	try {
		const response = await axios.delete(`${POSTS_URL}/${id}`);
		if (response?.status === 200) return initialPost;
		return `${response?.status}: ${response?.statusText}`;
	} catch (error) {
		return error.message;
	}
});

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		postAdd: {
			reducer: (state, action) => {
				// state.posts.push(action.payload);
				postsAdapter.addMany(state, action.payload);
			},
			prepare: ({ title, body, userId }) => {
				return {
					payload: {
						id: nanoid(),
						title,
						body,
						userId,
						date: new Date().toISOString(),
						reactions: {
							thumbsUp: 0,
							wow: 0,
							heart: 0,
							rocket: 0,
							coffee: 0,
						},
					},
				};
			},
		},
		reactionAdd: (state, action) => {
			const { postId, reaction } = action.payload;
			// const existingPost = state.posts.find((post) => post.id === postId);
			const existingPost = state.entities[postId];
			if (existingPost) {
				existingPost.reactions[reaction]++;
			}
		},
		increaseCount: (state) => {
			state.count += 1;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchPosts.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = "succeeded";
				// adding date and reactions
				let min = 1;
				const loadedPosts = action.payload.map((post) => {
					post.date = sub(new Date(), { minutes: min++ }).toISOString();
					post.reactions = {
						thumbsUp: 0,
						hooray: 0,
						heart: 0,
						rocket: 0,
						eyes: 0,
					};
					return post;
				});
				// state.posts = state.posts.concat(loadedPosts);
				postsAdapter.upsertMany(state, loadedPosts);
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(addNewPost.fulfilled, (state, action) => {
				action.payload.userId = Number(action.payload.userId);
				action.payload.date = new Date().toISOString();
				action.payload.reactions = {
					thumbsUp: 0,
					hooray: 0,
					heart: 0,
					rocket: 0,
					eyes: 0,
				};
				console.log(action.payload);
				// state.posts.push(action.payload);
				postsAdapter.addOne(state, action.payload);
			})
			.addCase(updatePost.fulfilled, (state, action) => {
				if (!action.payload?.id) {
					console.log("Update could not complete");
					console.log(action.payload);
					return;
				}
				// const { id } = action.payload;
				action.payload.date = new Date().toISOString();
				// const posts = state.posts.filter((post) => post.id !== id);
				// state.posts = [...posts, action.payload];
				postsAdapter.upsertOne(state, action.payload);
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				if (!action.payload?.id) {
					console.log("Delete could not complete");
					console.log(action.payload);
					return;
				}
				const { id } = action.payload;
				// const posts = state.posts.filter((post) => post.id !== id);
				// state.posts = posts;
				postsAdapter.removeOne(state, id);
			});
	},
});

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const { selectAll: selectAllPosts, selectById: selectPostById, selectIds: selectPostIds } = postsAdapter.getSelectors((state) => state.posts);

// export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
// export const selectPostById = (state, postId) => state.posts.posts.find((post) => post.id === postId);
export const getCounter = (state) => state.posts.count;
export const selectPostsByUser = createSelector([selectAllPosts, (state, userId) => userId], (posts, userId) =>
	posts.filter((post) => post.userId === userId)
);

export const { postAdd, reactionAdd, increaseCount } = postsSlice.actions;

export default postsSlice.reducer;
