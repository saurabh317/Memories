import React from "react";
import PersonIcon from "@mui/icons-material/Person";

const Avatar = ({
  size = 40,
  onClickAvatar,
}) => {
  return (
    <div
      onClick={onClickAvatar}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: "2px solid #3498db",
        overflow: "hidden",
        display: "inline-block",
        cursor: 'pointer'
      }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}>
        <PersonIcon fontSize="large" color="blue" sx={{ color: "#3498db" }} />
      </div>
    </div>
  );
};

export default Avatar;
