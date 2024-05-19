import Link from "next/link";
import "./not-found.scss";
const NotFound = () => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
        </div>
        <div className="mt-[60px] px-pLayout">
          <h2>404 - Page not found</h2>
          <p>
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable.
          </p>
          <Link href="/" className="hover:opacity-90">
            Go To Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
