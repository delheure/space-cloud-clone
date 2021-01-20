import React from "react";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import Header from "../../Components/Header/Header";
import "./SignUp.scss";

export class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      nickname: "",
      email: "",
      password: "",
      repassword: "",
      isValid: false,
      checkedAll: false,
      checkedService: false,
      checkedPrivacy: false,
      checkedSms: false,
      checkedEmail: false,
      showBox: false,
    };
  }

  componentDidMount() {
    document.body.style.backgroundColor = "#f6f6f6";
  }

  handleSignUpInfo = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  //전체 약관동의
  handleAllChecked = () => {
    const { checkedAll } = this.state;
    if (checkedAll !== false) {
      this.setState({
        checkedService: false,
        checkedPrivacy: false,
        checkedSms: false,
        checkedEmail: false,
        checkedAll: false,
      });
    } else {
      this.setState({
        checkedService: true,
        checkedPrivacy: true,
        checkedSms: true,
        checkedEmail: true,
        checkedAll: true,
      });
    }
  };

  //전체 선택해제
  handleCheckedService = () => {
    const { checkedService } = this.state;
    this.setState({
      checkedService: !checkedService,
    });
  };

  handleCheckedPrivacy = () => {
    const { checkedPrivacy } = this.state;
    this.setState({
      checkedPrivacy: !checkedPrivacy,
    });
  };

  handleCheckedSms = () => {
    const { checkedSms } = this.state;
    this.setState({
      checkedSms: !checkedSms,
    });
  };

  handleCheckedEmail = () => {
    const { checkedEmail } = this.state;
    this.setState({
      checkedEmail: !checkedEmail,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      checkedService,
      checkedPrivacy,
      checkedSms,
      checkedEmail,
    } = this.state;
    let prevtruecnt = 0,
      curtruecnt = 0;
    if (prevState.checkedService) prevtruecnt++;
    if (prevState.checkedPrivacy) prevtruecnt++;
    if (prevState.checkedSms) prevtruecnt++;
    if (prevState.checkedEmail) prevtruecnt++;

    if (checkedService) curtruecnt++;
    if (checkedPrivacy) curtruecnt++;
    if (checkedSms) curtruecnt++;
    if (checkedEmail) curtruecnt++;

    if (prevtruecnt < 4 && curtruecnt === 4) {
      this.setState({
        checkedAll: true,
      });
    }
    if (prevtruecnt === 4 && curtruecnt < 4) {
      this.setState({
        checkedAll: false,
      });
    }
  }

  handleSignUpClick = () => {
    this.setState({
      isValid: true,
    });

    const {
      nickname,
      email,
      password,
      checkedService,
      checkedPrivacy,
      checkedSms,
      checkedEmail,
      showBox,
    } = this.state;

    if (!checkedService && !checkedPrivacy) {
      this.setState({
        showBox: !showBox,
      });
      setTimeout(() => {
        this.setState({
          showBox: showBox,
        });
      }, 2000);
    } else {
      fetch("api", {
        method: "POST",
        body: JSON.stringify({
          username: email,
          password: password,
          nickname: nickname,
          checkedService: checkedService,
          checkedPrivacy: checkedPrivacy,
          checkedSms: checkedSms,
          checkedEmail: checkedEmail,
        }),
      })
        .then(res => res.json())
        .then(res => {
          if (res.message === "SUCCESS") {
            alert("엔터 클라우드에 오신 걸 환영합니다!");
            this.props.history.push("/Login");
          }
        });
    }
  };
  render() {
    const nicknameValidation = /^[a-z0-9_-]{2,20}$/;
    const emailValidation = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    const pwValidation = /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[~,!,@,#,$,*,(,),=,+,_,.,|]).*$/;
    const {
      nickname,
      email,
      password,
      repassword,
      isValid,
      rePwvalidationMessage,
      checkedAll,
      checkedPrivacy,
      checkedService,
      checkedEmail,
      checkedSms,
    } = this.state;

    return (
      <>
        <Header />
        <main className="SignUp common_wrap">
          <input id="aaa" />
          <label for="aaa"></label>
          <div className={`alert_box ${this.state.showBox ? "show" : ""}`}>
            회원가입 약관에 동의하신 후 회원가입이 가능합니다.
          </div>
          <h2>회원가입</h2>
          <section className="signup_box common_box">
            <SocialLogin />
            <p className="or">
              <span>또는</span>
            </p>
            <form>
              <input
                id="nickname"
                className={
                  isValid && !nicknameValidation.test(nickname) ? "error" : ""
                }
                type="text"
                placeholder="닉네임"
                value={nickname}
                onChange={this.handleSignUpInfo}
              />
              <p className="validation_message">
                {
                  (isValid && !nickname ? "필수 정보입니다." : "",
                  isValid && !nicknameValidation.test(nickname)
                    ? "닉네임은 두 글자 이상(특수문자 입력 불가) 입력해주세요."
                    : "")
                }
              </p>
              <input
                id="email"
                className={
                  isValid && !emailValidation.test(email) ? "error" : ""
                }
                type="text"
                placeholder="이메일"
                value={email}
                onChange={this.handleSignUpInfo}
              />
              <p className="validation_message">
                {
                  (isValid && !email ? "필수 정보입니다." : "",
                  isValid && !emailValidation.test(email)
                    ? "이메일 형식이 유효하지 않습니다."
                    : "")
                }
              </p>
              <input
                id="password"
                className={
                  isValid && !pwValidation.test(password) ? "error" : ""
                }
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={this.handleSignUpInfo}
                onKeyUp={this.handlePwValidation}
              />
              <p className="validation_message">
                {
                  (isValid && !password ? "필수 정보입니다." : "",
                  isValid && !pwValidation.test(password)
                    ? "비밀번호에 숫자, 기호를 포함하세요."
                    : "")
                }
              </p>
              <input
                id="repassword"
                className={isValid && repassword !== password ? "error" : ""}
                type="password"
                placeholder="비밀번호 확인"
                value={repassword}
                onChange={this.handleSignUpInfo}
                onKeyUp={this.handleIsVaild}
              />
              <p className="validation_message">
                {rePwvalidationMessage}
                {isValid && repassword !== password
                  ? "비밀번호가 일치하지 않습니다"
                  : ""}
              </p>
            </form>
            <p className="agree_check">
              <input
                id="agree_all"
                type="checkbox"
                checked={checkedAll}
                onChange={this.handleAllChecked}
              />
              <label for="agree_all">아래 약관에 모두 동의합니다.</label>
            </p>
            <p className="or"></p>
            <ul className="agree_check">
              <li>
                <input
                  id="agree_service"
                  type="checkbox"
                  checked={checkedService}
                  onChange={this.handleCheckedService}
                />
                <label for="agree_service">
                  <span className="underline">서비스 이용약관 (필수)</span>
                </label>
              </li>
              <li>
                <input
                  id="agree_privacy"
                  className="underline"
                  type="checkbox"
                  checked={checkedPrivacy}
                  onChange={this.handleCheckedPrivacy}
                />
                <label for="agree_privacy">
                  <span className="underline">개인정보 처리 방침 (필수)</span>
                </label>
              </li>
              <li>
                <input
                  id="agree_sms"
                  type="checkbox"
                  checked={checkedSms}
                  onChange={this.handleCheckedSms}
                />
                <label for="agree_sms">
                  이벤트 등 프로모션 알림 SMS 수신 (선택)
                </label>
              </li>
              <li>
                <input
                  id="agree_mail"
                  type="checkbox"
                  checked={checkedEmail}
                  onChange={this.handleCheckedEmail}
                />
                <label for="agree_mail">
                  이벤트 등 프로모션 알림 메일 수신 (선택)
                </label>
              </li>
            </ul>
            <button
              className="signup_button btn_submit"
              type="submit"
              onClick={this.handleSignUpClick}
            >
              회원가입
            </button>
          </section>
        </main>
      </>
    );
  }
}
