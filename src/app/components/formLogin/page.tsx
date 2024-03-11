import style from "./formLogin.module.scss";
import Link from "next/link";
import { Jost } from "next/font/google";

const jost = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export default function FormLogin() {
  return (
    <div className={`${style.formLogin} ${jost.className}`}>
      <div>
        <h3>Welcome 👋 </h3>
        <Link href="#">
          <p>Please login here</p>
        </Link>
        <div className={`${style.formColumn}`}>
          <div className={`${style.formGroup}`}>
            <h4>Email Address</h4>
            <input type="text" name="" id="" />
          </div>
          <div className={`${style.formGroup}`}>
            <h4>Password</h4>
            <input type="password" name="" id="" />
          </div>
        </div>
        <div className={`${style.forgotPassword}`}>
          <Link href="#">
            <p>Forgot Password?</p>
          </Link>
        </div>
        <div className={`${style.btnLogin}`}>Login</div>
      </div>
    </div>
  );
}
