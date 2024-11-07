import "./App.css";
import { useState } from "react";
import { ThemeContext } from "./config/contextConfig";
import Posts from "./components/main/post/Post";
import Header from "./components/header/Header";
import SignInForm from "./components/header/auth/SignInform";
import {
  Backdrop,
  ModalDialogWrapper,
  SwipeableDrawerWrapper,
} from "./common/components";
import SignUpForm from "./components/header/auth/SignUpform";
import CreateOrEditPost from "./components/header/CreateNewPostBtn";
import AccountDetails from "./components/header/AccountDetails";
import { useDispatch } from "react-redux";
import { reSetUserData } from "./store/user";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showAccountDetails, setShowAccountDetails] = useState(false);

  const dispatch = useDispatch()

  const onLogout = () => {
    sessionStorage.clear("userData")
    dispatch(reSetUserData())
    setShowAccountDetails(false)
  }

  const styles = {
    backgroundColor: darkMode ? "#333" : "#fff",
  };

  return (
    <div style={styles}>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        <Header
          setShowSignInModal={setShowSignInModal}
          setShowSignUpModal={setShowSignUpModal}
          setShowCreatePost={setShowCreatePost}
          setShowAccountDetails={setShowAccountDetails}
        />
        <Posts />
        <ModalDialogWrapper
          open={showSignInModal}
          onClose={() => setShowSignInModal(false)}
          Backdrop={Backdrop}
        >
          <SignInForm
            setShowSignUpModal={setShowSignUpModal}
            setShowSignInModal={setShowSignInModal}
          />
        </ModalDialogWrapper>
        <ModalDialogWrapper
          open={showSignUpModal}
          onClose={() => setShowSignUpModal(false)}
          Backdrop={Backdrop}
        >
          <SignUpForm
            setShowSignUpModal={setShowSignUpModal}
            setShowSignInModal={setShowSignInModal}
          />
        </ModalDialogWrapper>
        <ModalDialogWrapper
          open={showCreatePost}
          onClose={() => setShowCreatePost(false)}
          Backdrop={Backdrop}
        >
          <CreateOrEditPost setShowCreatePost={setShowCreatePost} />
        </ModalDialogWrapper>
        <SwipeableDrawerWrapper
          anchor= "right"
          closeOnSwipe={true}
          isDrawer={true}
          open={showAccountDetails}
          setOpen={setShowAccountDetails}
        >
          <AccountDetails onLogout={onLogout}/>
        </SwipeableDrawerWrapper>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
