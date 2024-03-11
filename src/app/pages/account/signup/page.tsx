import style from "./signUp.module.scss";
import ImageLogin from "@/app/components/imageLogin/page";
import FromLogin from "../../../components/formLogin/page";

export default function Login() {
  return (
    <main className={`bg-white min-h-screen ${style.main}`}>
      <ImageLogin />
      <FromLogin />
    </main>
  );
}
