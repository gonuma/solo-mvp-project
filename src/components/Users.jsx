import { useEffect, useState } from "react";

const Users = (props) => {
const {
    onClick,
    deleteEntry
} = props

return (
    <div className="header"> 
        <h1>musispace</h1>
        <button id="deleteButton" type="submit" onClick={deleteEntry}>Delete Song</button>
        <button type="submit" onClick={onClick}>Add Song</button>
        <input id="groupInput" placeholder="Group Name"></input>
        <input id="songInput" placeholder="Song Name"></input>
    </div>
)
}

Users.defaultProps = {
    onClick: () => {},
    deleteEntry: () => {}
}

export default Users;