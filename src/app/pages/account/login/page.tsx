import style from "./login.module.scss";
import FromLogin from "../../../components/formLogin/page";
import ImageLogin from "@/app/components/imageLogin/page";

export default function Login() {
  return (
    <main className={`bg-white min-h-screen ${style.main}`}>
      <ImageLogin />
      <FromLogin />
    </main>
  );
}
