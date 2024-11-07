import React, { useEffect, useState } from 'react';
import { Backdrop, ModalDialogWrapper } from '../../../common/components';
import CreateOrEditPost from '../../header/CreateNewPostBtn';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts } from '../../../store/post';
import PostCard from './PostCard';

const Posts = () => {
  const dispatch = useDispatch()
  const allPosts = useSelector(({ posts }) => posts.allPosts)
  const [showEditModal, setShowEditModal] = useState(false)
  const [clickedPostNo, setClickedPostNo] = useState(null)

  const styles = {
    height: '100vh',
    display: "flex",
    flexWrap: 'wrap',
    flexDirection: 'row'
  }

  useEffect(() => {
    dispatch(fetchAllPosts())
  }, [dispatch])

  return (
    <div style={styles}>
      {
        allPosts?.map((post, i) => {
          return <PostCard
            key={i}
            index= {i}
            imageSrc={post.image}
            creator={post.creator}
            title={post.title}
            initialLikes={post.likes}
            description={post.message}
            likeCount={post.likeCount}
            setShowEditModal={setShowEditModal}
            setClickedPostNo={setClickedPostNo}
            createdAt={post.createdAt}
            userId={post.userId}
            postId={post._id}
          />
        })
      }
      <ModalDialogWrapper open={showEditModal} onClose={() => setShowEditModal(false)} Backdrop={Backdrop}>
        <CreateOrEditPost clickedPostNo={clickedPostNo} hideUploadPhoto={true} setShowEditModal={setShowEditModal} />
      </ModalDialogWrapper>
    </div>
  )

}

export default Posts;
