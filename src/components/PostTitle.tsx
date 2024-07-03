import React from "react";

type PostTitleProps = {
  children: React.ReactNode;
};

export default function PostTitle({ children }: Readonly<PostTitleProps>) {
  return <h1 className="text-6xl text-center mb-6 font-bold">{children}</h1>;
}
