import { useState } from "react";
import { btnStyles, formStyles } from "../../common/commonStyles";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost, updatePost } from "../../store/post";
import Filebase from "react-file-base64"

export const CreateNewPostBtn = ({ setShowCreatePost }) => {
  const handleClick = () => {
    setShowCreatePost(true)
  }

  return (
    <button onClick={handleClick} style={btnStyles.button}>
      + Create New Post
    </button>
  );
};

const ImageUpload = ({ handleImageChange }) => {

  return (
    <div style={styles.formGroup}>
      <label style={styles.label}>Upload Image:</label>
      <div type="button" value="" style={styles.input} >
        <Filebase
          type="file"
          style={styles.input}
          multiple={false}
          onDone={handleImageChange}
        />
      </div>
    </div>
  )
}

const CreateOrEditPost = ({ clickedPostNo, hideUploadPhoto, setShowCreatePost, setShowEditModal }) => {
  const dispatch = useDispatch()
  const [userId, allPosts] = useSelector(({ user, posts }) => [user.userId, posts.allPosts])
  const editPostActive = clickedPostNo >= 0

  const [error, setError] = useState(null)
  const [ formData, setFormData ] = useState({
    image: '',
    tags: editPostActive ? allPosts[clickedPostNo].tags : [],
    creator: editPostActive ? allPosts[clickedPostNo].creator : '',
    title: editPostActive ? allPosts[clickedPostNo].title : '',
    message: editPostActive ? allPosts[clickedPostNo].message : '',
    createdAt: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [ name ]: value,
    }));
  };

  const handleImageChange = ({ base64 }) => {
    setFormData((prevState) => ({
      ...prevState,
      image: base64,
    }));
  };

  const isEmptyStr = (str) => {
    return (!str || str.length === 0)
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    // check if all the fields are filled
    if (isEmptyStr(formData.creator) || isEmptyStr(formData.message) || isEmptyStr(formData.tags) || isEmptyStr(formData.title) ||
      (editPostActive ? false : isEmptyStr(formData.image)) || (editPostActive ? false : (isEmptyStr(formData.createdAt)))
    ) {
      setError('All fields are mandatory to fill')
      return
    }

    if (editPostActive) {
      const postId = allPosts[clickedPostNo]._id
      await updatePost(postId, formData, dispatch)
      setShowEditModal(false)
    } else {
      // Handle form submission, e.g., send data to API.
      await createNewPost(formData, userId, dispatch)
      setShowCreatePost(false)
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{hideUploadPhoto ? "Edit Post": "Create Post"}</h2>
      {error && <p style={formStyles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form} encType="multipart/form-data">

        {/* Image Upload */}
        {!hideUploadPhoto && <ImageUpload handleImageChange={handleImageChange}/>}

        {/* Tags */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Tags:</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Enter tags"
            style={styles.input}
          />
        </div>

        {/* Name */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            name="creator"
            value={formData.creator}
            onChange={handleChange}
            placeholder="Enter your name"
            style={styles.input}
          />
        </div>

        {/* Title */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter post title"
            style={styles.input}
          />
        </div>

        {/* Description */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter post description"
            style={styles.textarea}
          />
        </div>

        {/* Date of Post */}
        {!hideUploadPhoto && <div style={styles.formGroup}>
          <label style={styles.label}>Date of Post:</label>
          <input
            type="date"
            name="createdAt"
            value={formData.createdAt}
            onChange={handleChange}
            style={styles.input}
          />
        </div>}

        <button type="submit" style={styles.submitButton}>{hideUploadPhoto ? 'Edit' : 'Submit'}</button>
      </form>
    </div>
  );
};

// Inline styles for simplicity
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '0 30px 30px 30px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '16px',
    marginBottom: '5px',
    color: '#555',
  },
  input: {
    width: '94%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
  },
  textarea: {
    width: '94%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    minHeight: '100px',
  },
  submitButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default CreateOrEditPost;

