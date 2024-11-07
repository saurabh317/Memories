import { useDispatch, useSelector } from "react-redux";
import { deletePost, updateLikeCount } from "../../../store/post";
import moment from "moment";
import { FaEllipsisH, FaThumbsUp, FaTrashAlt } from "react-icons/fa";

const PostCard = (props) => {
  const dispatch = useDispatch()
  const userId = useSelector(({ user }) => user.userId)

  const { imageSrc, createdAt, creator, title, description,
    likeCount, setShowEditModal, setClickedPostNo, index, postId
  } = props

  // send a post req to update that particular post in the db
  const handleLike = async() => {
    if (!userId) {
      alert("connect your account to like this post")
    } else {
      updateLikeCount(postId, dispatch)
    }
  };

  // set a post req to delete that particular post in the db
  const onDeletePost = () => {
    alert("are you sure😐!")
    deletePost(postId, dispatch)
  }

  const onMenuClick = async() => {
    setShowEditModal(true)
    setClickedPostNo(index)
  }

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        {/* Backdrop */}
        <div style={styles.backdrop}></div>
        {/* Image */}
        <img src={imageSrc} alt="Post" style={styles.image} />
        {/* Date Overlay */}
        <span style={styles.date}>{moment(createdAt).fromNow()}</span>
        {/* Three Dot Menu */}
        {userId === props.userId && <span style={styles.menuIcon} onClick={onMenuClick}>
          <FaEllipsisH />
        </span>}
      </div>
      <div style={styles.cardContent}>
        <h4 style={styles.name}>{creator}</h4>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.description}>{description}</p>
        <div style={styles.cardFooter}>
          <div style={styles.icon} onClick={handleLike}>
            <FaThumbsUp />
            <span>{likeCount}</span>
          </div>
          {userId === props.userId && <div style={styles.icon} onClick={onDeletePost}>
            <FaTrashAlt />
          </div>}
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    height: '400px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    maxWidth: '400px',
    margin: '20px auto',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity and color for your backdrop
    zIndex: 1, // Ensure the backdrop is above the image but below the text
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  date: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Background color of the date text
    color: '#333',
    padding: '5px 10px',
    borderRadius: '5px',
    fontSize: '12px',
    zIndex: 2, // Ensure the date is on top of the backdrop
  },
  menuIcon: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: '#fff',
    cursor: 'pointer',
    zIndex: 2, // Ensure the menu icon is on top of the backdrop
  },
  cardContent: {
    padding: '20px',
  },
  name: {
    fontSize: '16px',
    color: '#3498db',
    marginBottom: '5px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  description: {
    fontSize: '14px',
    color: '#555',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
};

export default PostCard