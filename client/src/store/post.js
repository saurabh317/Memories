import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../constant";

const BASE_URL_POSTS = `${BASE_URL}/posts`

const postProcess = (result, dispatch) => {
  if (result.status === 200) {
    dispatch(fetchAllPosts())
  } else {
    console.log('something went wrong....')
  }
}

export const fetchAllPosts = createAsyncThunk('posts/fetchAllPosts', async(payload, {getState, dispatch}) => {
  console.log('fetchingAllPosts.........')
  const response = await fetch(BASE_URL_POSTS)
  const allPosts = await response.json()
  return allPosts
})

export const createNewPost = async(data, userId, dispatch) => {
  const res = await fetch(BASE_URL_POSTS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body : JSON.stringify(Object.assign({userId}, data))
  })
  const result = await res.json()
  postProcess(result, dispatch)
}

export const updateLikeCount = async(postId, dispatch) => {
  console.log(postId)
  const res = await fetch(`${BASE_URL_POSTS}/like` , {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body : JSON.stringify({ postId })
  })

  const result = await res.json()
  postProcess(result, dispatch)
}

export const updatePost = async(postId, formData, dispatch) => {
  const details = {
    tags: formData.tags,
    message: formData.message,
    title: formData.title,
    creator: formData.creator
  }
  const res = await fetch(`${BASE_URL_POSTS}/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body : JSON.stringify({ postId, details })
  })

  const result = await res.json()
  postProcess(result, dispatch)
}



export const deletePost = async(postId, dispatch) => {
  const res = await fetch(BASE_URL_POSTS, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ postId })
  })

  const result = await res.json()
  postProcess(result, dispatch)
}

const postSlice = createSlice({
  name: "posts",

  initialState: {
    allPosts: [],
    searchTerm: '',
    createPostInProgress: false
  },

  reducers: {
    setAllPosts(state, action) {
      state.allPosts = action.payload
    },
    setPostStatus(state, action) {
      state.createPostInProgress = action.payload
    },
    setCachedSearchTerm(state, action) {
      state.searchTerm = action.payload
    }
  },

  extraReducers: builder => {
    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      if (action.payload) {
        state.allPosts = action.payload
      }
    })
    .addCase(fetchAllPosts.rejected, (state, action) => {
      console.log(action)
    })
  }
})

export const { setAllPosts, setCachedSearchTerm } = postSlice.actions
export default postSlice.reducer