import { createRef } from "react";
import Avatar from "react-avatar";


function Comment() {
    let menu = document.getElementById("menu");
    
    return (
        <ul className="list-group list-group-horizontal d-flex justify-content-center">
            {/* profile pic of commenting user */}
            <li className="list-group-item bg-transparent border-0">
            <Avatar
                name={"test_username1"}
                round
                size={50}
                className="me-2"
                textSizeRatio={2}
            />
            </li>
            {/* username, time, and content of the comment */}
            <li className="list-group-item bg-transparent border-0">
                <ul className="list-group d-flex align-items-start">
                    <li className="list-group-item bg-transparent border-0">
                    <small className="text-white" style={{fontWeight: "bold"}}>
                        test_username1
                    </small>
                    <small style={{color: "#c9c9c9"}}>&nbsp;&nbsp;5:06 PM</small>
                    </li>
                    <li className="list-group-item bg-transparent border-0">
                    <small className="text-white">
                        This is a test comment that has random words in it.
                    </small>
                    </li>
                </ul>
            </li>
            {/* 3-dot menu */}
            <li className="list-group-item bg-transparent border-0">
            <button className="bg-transparent border-0" id="menu">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 16 16"
                className="bi bi-three-dots-vertical d-flex justify-content align-items-center">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                </svg>
            </button>
            </li>
        </ul>
    );
}

export default Comment;
