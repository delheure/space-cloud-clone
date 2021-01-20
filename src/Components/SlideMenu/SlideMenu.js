import React from "react";
import "./SlideMenu.scss";

export class SlideMenu extends React.Component {
  render() {
    return (
      <aside class="SlideMenu">
        <button className="btn_menu btn_com">menu bar</button>;
        <section class="contents">
          <button class="btn_back"></button>
          <div class="profile_wr">
            <i>profile image</i>
            <span>
              로그인이 필요합니다.
            </span>
          </div>
        </section>
      </aside>
    )
  }
}

export default SlideMenu;
