"use client";
import TitlePageAmin from "@/app/components/titlePageAdmin/titlePageAdmin";
import style from "./user.module.scss";
import { useState, useEffect } from "react";
import Link from "next/link";
import Pusher from "pusher-js";

const UserAdmin = () => {
  const [totalUser, setTotalUser] = useState(null) as any;
  const [loadingData, setLoadingData] = useState(false) as any;

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe("user-channel");
    channel.bind("user-registered", function (data: any) {
      setTotalUser(data.totalUser);
    });

    return () => {
      pusher.unsubscribe("user-channel");
    };
  }, []);

  const fetchData = async () => {
    setLoadingData(true);
    try {
      await fetch("/api/admin/number_user")
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setTotalUser(data.data[0].totalUser);
          }
          setLoadingData(false);
          if (data.status === 400) {
            console.error(data.message);
          }
        });
    } catch (error) {
      console.error("Error in fetchData: ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <TitlePageAmin title="User" />
      <div>
        <Link
          href="/admin/user/lists"
          className={`${style.hoverCard} ${
            loadingData && "animate-pulse"
          } inline-flex px-[16px] py-[12px] max-w-[200px] w-full bg-[#f1f1f5] shadow-sm rounded-[16px] cursor-pointer`}
        >
          <div className="flex items-center justify-center mr-[16px] w-[45px] h-[45px] bg-[#E5E7E9] rounded-[50%]">
            <svg
              fill="none"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="#292d32">
                <path d="m11.9994 13.2999c-.13 0-.26-.03-.38-.1l-8.83004-5.11c-.36-.21-.48002-.67003-.27002-1.03003s.66-.48002 1.03-.27002l8.45006 4.89005 8.3999-4.86002c.36-.21.82-.07998 1.03.27002.21.36.0801.81997-.2699 1.02997l-8.77 5.08003c-.13.06-.26.1-.39.1z" />
                <path d="m12 22.36c-.41 0-.75-.34-.75-.75v-9.07c0-.41.34-.75.75-.75s.75.34.75.75v9.07c0 .41-.34.75-.75.75z" />
                <path d="m12.0006 22.75c-.88 0-1.75-.19-2.43999-.57l-5.34-2.97c-1.45-.8-2.57999-2.73-2.57999-4.39v-5.65002c0-1.66 1.12999-3.57996 2.57999-4.38996l5.34-2.96002c1.36999-.76 3.50999-.76 4.87999 0l5.34 2.96997c1.45.8 2.58 2.73002 2.58 4.39002v5.65001c0 1.66-1.13 3.58-2.58 4.39l-5.34 2.96c-.69.38-1.56.57-2.44.57zm0-20.00001c-.63 0-1.25.13001-1.71.38001l-5.33998 2.96997c-.96.54-1.81 1.97002-1.81 3.08002v5.65001c0 1.1.85 2.54 1.81 3.08l5.33998 2.97c.91.51 2.51.51 3.42 0l5.34-2.97c.96-.54 1.81-1.97 1.81-3.08v-5.65001c0-1.1-.85-2.54002-1.81-3.08002l-5.34-2.96997c-.46-.25-1.08-.38001-1.71-.38001z" />
                <path d="m17.0012 13.99c-.41 0-.75-.34-.75-.75v-3.2199l-9.12004-5.26003c-.36-.21-.48002-.67002-.27002-1.02002.21-.36.66002-.48002 1.02002-.27002l9.49004 5.48004c.23.13.38.37996.38.64996v3.66007c0 .39-.34.7299-.75.7299z" />
              </g>
            </svg>
          </div>
          <div>
            <h3 className="text-[#717171] text-[1.4em]">Number of users</h3>
            <h1 className="text-text text-[1.6em] font-medium">
              {totalUser || 0}
            </h1>
          </div>
        </Link>
      </div>
    </>
  );
};

export default UserAdmin;
