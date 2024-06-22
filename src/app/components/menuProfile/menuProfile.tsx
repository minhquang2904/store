import { useAuthContext } from "@/app/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

const MenuProfile = () => {
  const { user } = useAuthContext();

  const pathname = usePathname();

  const checkActiveMenu = (url: any, active: any, inactive: any) => {
    return pathname === `${url}` ? `${active}` : `${inactive}`;
  };
  return (
    <div className="l:w-[20%] xsm:w-full sm:w-full sm:flex-row sm:flex l:block">
      <div className="!relative l:flex items-center xsm:hidden sm:hidden">
        <Image
          src={user?.image[0]?.url || "/images/avatar-profile.png"}
          alt="Bag"
          className="!relative !w-[51px] !h-[51px] rounded-[50%] object-cover"
          fill
          sizes="(max-width: 51px) 100vw"
        />
        <div className="ml-[16px]">
          <h1 className="text-text text-[1.6em] font-bold">
            {user?.firstName && user?.lastName
              ? user?.lastName + " " + user?.firstName
              : "User"}
          </h1>
          <p className="text-text text-[1.4em] font-normal">{user?.email}</p>
        </div>
      </div>
      <div className="l:mt-[32px] l:ml-[0] xsm:flex sm:flex sm:gap-x-[20px] xsm:gap-x-[20px] l:block">
        <Link
          href="/profile"
          className={`px-[16px] py-[14px] cursor-pointer block rounded-[16px] ${checkActiveMenu(
            "/profile",
            "bg-button",
            ""
          )}`}
        >
          <div className="flex">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Huge-icon/user/outline/user">
                <ellipse
                  id="Ellipse 255"
                  cx="12"
                  cy="17.5"
                  rx="7"
                  ry="3.5"
                  stroke={checkActiveMenu("/profile", "white", "#131118")}
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <circle
                  id="Ellipse 257"
                  cx="12"
                  cy="7"
                  r="4"
                  stroke={checkActiveMenu("/profile", "white", "#131118")}
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
            <Title
              title="Personal Information"
              active={checkActiveMenu("/profile", "text-white", "text-text")}
            />
          </div>
        </Link>
        <Link
          href="/profile/listsOrder"
          className={`px-[16px] py-[14px] cursor-pointer block rounded-[16px] ${checkActiveMenu(
            "/profile/listsOrder",
            "bg-button",
            ""
          )}`}
        >
          <div className="flex">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="huge-icon/shipping and delivery/outline/package box 07">
                <path
                  id="Vector 1901"
                  d="M20 7L12 11L4 7"
                  stroke={checkActiveMenu(
                    "/profile/listsOrder",
                    "white",
                    "#131118"
                  )}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  id="Vector"
                  d="M18.6246 4.66762L13.6246 2.35827C12.5903 1.88058 11.4097 1.88058 10.3754 2.35827L5.37545 4.66762C3.93093 5.33479 3 6.82344 3 8.46617V15.5338C3 17.1766 3.93094 18.6652 5.37545 19.3324L10.3754 21.6417C11.4097 22.1194 12.5903 22.1194 13.6246 21.6417L18.6246 19.3324C20.0691 18.6652 21 17.1766 21 15.5338V8.46617C21 6.82344 20.0691 5.33479 18.6246 4.66762Z"
                  stroke={checkActiveMenu(
                    "/profile/listsOrder",
                    "white",
                    "#131118"
                  )}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  id="Vector_2"
                  d="M8 4L17 9V19.5"
                  stroke={checkActiveMenu(
                    "/profile/listsOrder",
                    "white",
                    "#131118"
                  )}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  id="Vector 1903"
                  d="M12 11V22"
                  stroke={checkActiveMenu(
                    "/profile/listsOrder",
                    "white",
                    "#131118"
                  )}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>

            <Title
              title="My Orders"
              active={checkActiveMenu(
                "/profile/listsOrder",
                "text-white",
                "text-text"
              )}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

const Title = (props: any) => {
  const { title, active } = props;
  return (
    <div
      className={`ml-[12px] text-[1.6em] font-medium capitalize sm:hidden xsm:hidden l:block ${active}`}
    >
      {title}
    </div>
  );
};

export default MenuProfile;
