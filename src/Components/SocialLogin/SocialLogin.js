import React from "react";
import "./SocialLogin.scss";

const SOCIAL = [
  {
    id: 1,
    className: "Headerer",
    content: "네이버로 로그인",
  },
  {
    id: 2,
    className: "kakao",
    content: "카카오로 로그인",
  },
  {
    id: 3,
    className: "apple",
    content: "Apple로 로그인",
  },
];

export class SocialLogin extends React.Component {
  render() {
    return (
      <ul className="SocialLogin">
        {SOCIAL.map(list => {
          return (
            <li className={list.className} key={list.id}>
              <button>{list.content}</button>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default SocialLogin;
