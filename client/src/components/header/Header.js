import React, { useContext, useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { dark, light } from "../../utils/theme";
import { ThemeContext } from "../../config/contextConfig";
import SearchBar from "./SearchBar";
import { SignInBtn } from "./auth/SignInform";
import { CreateNewPostBtn } from "./CreateNewPostBtn";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";

const Header = ({
  setShowSignInModal,
  setShowSignUpModal,
  setShowCreatePost,
  setShowAccountDetails
}) => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [showAvatar, setShowAvatar] = useState(false);
  const userId = useSelector(({ user }) => user.userId)

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  useEffect(() => {
    if (userId) {
      setShowAvatar(true)
    } else {
      setShowAvatar(false)
    }
  }, [userId])

  // if user found in redux then setShowAvatar(true)
  const onClickAvatar = () => {
    setShowAccountDetails(true)
  }

  return (
    <nav
      style={{
        ...styles.navbar,
        backgroundColor: darkMode
          ? dark.backGroundColor
          : light.backGroundColor,
      }}>
      <div style={styles.logo}>Memories</div>
      <ul style={styles.navLinks}>
        <SearchBar />
        {userId && <CreateNewPostBtn setShowCreatePost={setShowCreatePost} />}
      </ul>
      <ul style={styles.navLinks}>
        <li style={styles.themeToggle} onClick={toggleTheme}>
          {darkMode ? (
            <FaSun color="#f39c12" size={"30px"} />
          ) : (
            <FaMoon color="#3498db" size={"30px"} />
          )}
        </li>
        {!showAvatar && (
          <SignInBtn
            setShowSignInModal={setShowSignInModal}
            setShowSignUpModal={setShowSignUpModal}
          />
        )}
        {showAvatar && (
          <Avatar alt="A" onClickAvatar={onClickAvatar} />
        )}
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#3498db",
    cursor: "pointer",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
  },
  link: {
    textDecoration: "none",
    fontWeight: "500",
    color: "#333",
    transition: "color 0.3s ease",
  },
  themeToggle: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
};

export default Header;
