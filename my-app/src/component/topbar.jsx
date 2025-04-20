import React from "react"
import { FaUserCircle } from "react-icons/fa"

const Topbar = () => {
  return (
    <div className="topbar">
      <div></div>
      <div className="profile">
        <div>
          <div className="name">Samrat Prajapati</div>
          <div className="email">Samrat24@gmail.com</div>
        </div>
        <FaUserCircle className="icon" />
      </div>
    </div>
  )
}

export default Topbar
