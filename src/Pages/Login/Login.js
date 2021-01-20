import React from "react";
import Header from "../../Components/Header/Header";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import "./Login.scss";

export class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      emailValidation: "",
      pwValidation: "",
      showBox: false,
    };
  }

  componentDidMount() {
    document.body.style.backgroundColor = "#f6f6f6";
  }

  handleLoginInfo = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  checkValidation = e => {
    e.preventDefault();

    const { email, password, showBox } = this.state;
    const checkEmail = email;
    const checkPw = password;

    this.setState({
      emailValidation: !checkEmail ? "이메일을 입력해주세요." : "",
      pwValidation: !checkPw ? "비밀번호를 입력해주세요." : "",
    });

    if (checkEmail && checkPw) {
      this.handleLoginClick();
    } else {
      this.setState({
        showBox: !showBox,
      });
      setTimeout(() => {
        this.setState({
          showBox: showBox,
        });
      }, 2000);
    }
  };

  handleLoginClick = () => {
    const { email, password } = this.state;
    fetch("API", {
      method: "POST",
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(response => {
        if (response.message === "SUCCESS") {
          localStorage.setItem("token", response.access_token);
          this.props.history.push("/Main");
        }
      });
  };

  render() {
    const {
      email,
      password,
      showBox,
      emailValidation,
      pwValidation,
    } = this.state;
    return (
      <>
        <Header />
        <main className="Login common_wrap">
          <div className={`alert_box ${showBox ? "show" : ""}`}>
            아이디 또는 비밀번호를 확인해주세요.
          </div>
          <h2>로그인</h2>
          <section className="login_box common_box">
            <SocialLogin />
            <p className="or">
              <span>또는</span>
            </p>
            <form>
              <input
                id="email"
                type="text"
                placeholder="이메일"
                value={email}
                onChange={this.handleLoginInfo}
              />
              <p className="validation_message">{emailValidation}</p>
              <input
                id="password"
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={this.handleLoginInfo}
              />
              <p className="validation_message">{pwValidation}</p>
            </form>
            <button
              className="login_button btn_submit"
              onClick={this.checkValidation}
              onKeyUp={this.checkValidation}
            >
              이메일로 로그인
            </button>
            <p className="text_signup">
              아직 엔터클라우드 회원이 아니신가요?
              <a href="/SignUp">회원가입</a>
            </p>
          </section>
        </main>
      </>
    );
  }
}

export default Login;
