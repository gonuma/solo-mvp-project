import { useEffect, useState } from "react";

const Users = (props) => {
const {
    onClick,
} = props

return (
    <div className="header"> 
        <h1>musispace</h1>
        <button type="submit" onClick={onClick}>Add Song</button>
        <input id="groupInput" placeholder="Group Name"></input>
        <input id="songInput" placeholder="Song Name"></input>
    </div>
)
}

Users.defaultProps = {
    onClick: () => {}
}

export default Users;