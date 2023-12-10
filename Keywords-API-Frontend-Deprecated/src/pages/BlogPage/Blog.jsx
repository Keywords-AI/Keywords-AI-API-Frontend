import React from "react";
import { ArticleItem } from "./components/ArticleItem";
import "./Blog.css";

export default function Blog() {
  const articles = [
    {
      title: "7 Common Job Interview Questions and How to Answer Them",
      link: "/",
      time: "2021-07-01",
    },
    {
      title: "7 Common Job Interview Questions and How to Answer Them",
      link: "/",
      time: "2021-07-01",
    },
    {
      title: "7 Common Job Interview Questions and How to Answer Them",
      link: "/",
      time: "2021-07-01",
    },
    {
      title: "7 Common Job Interview Questions and How to Answer Them",
      link: "/",
      time: "2021-07-01",
    },
    {
      title: "7 Common Job Interview Questions and How to Answer Them",
      link: "/",
      time: "2021-07-01",
    },
    {
      title: "7 Common Job Interview Questions and How to Answer Them",
      link: "/",
      time: "2021-07-01",
    },
  ];

  return (
    <div className="flex-col items-center self-stretch px-xxxxl py-xxxl gap-xxl bg-white">
      {/* heading */}
      <div className="flex-col items-start self-stretch gap-sm">
        <p className="display-lg text-black">Blogs</p>
        <p className="text-lg text-gray4">
          Here we will share with you the latest job search tips and information
          and everything about AI.
          <br />
          Choose keywords below and get started.
        </p>
      </div>
      {/* button group */}
      <div className="flex-row self-stretch items-end gap-xs"></div>
      {/* grid */}
      <div className="article-list">
        {articles.map((a, id) => (
          <ArticleItem key={id} {...a} />
        ))}
      </div>
      {/* contact */}
      <div
        className="flex-col items-center self-stretch bg-black gap-xxl"
        style={{ padding: "80px 180px 240px 180px" }}
      >
        <div className="flex-col items-center self-stretch gap-sm">
          <p className="self-stretch display-lg text-white t-c">
            Stay Ahead with Keywords AI
          </p>
          <p className="self-stretch text-lg text-white t-c">
            Subscribe to our newsletter for updates, tips, and exclusive offers.
          </p>
        </div>
        {/* email input */}
        <div className="flex-col items-center gap-xs" style={{ width: "640px" }}>
          <div className="flex-col items-start self-stretch justify-center gap-xxs">
            <p className="text-md self-stretch text-white m-0">Email</p>
            <div className="flex-row items-center self-stretch gap-xs">
              <input
                type="text"
                className="email-input flex-1   py-xxs px-xs text-md text-white"
                style={{ border: "1px solid var(--gray-3, #9FA2AB)" }}
                placeholder="example@keywordsai.co"
              />
              <button className="button-secondary-gray">Sign up</button>
            </div>
          </div>
          <p className="text-md self-stretch t-red-light m-0">
            Please enter a valid email address.
          </p>
          <p className="text-md self-stretch t-green-light m-0">
            Signed up successfully.
          </p>
        </div>
      </div>
    </div>
  );
}
