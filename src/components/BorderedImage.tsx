import Image from "next/image";
import React from "react";

type BorderedPictureProps = {
  width: number;
  height: number;
  src: string;
  alt: string;
};

const BorderedPicture: React.FC<BorderedPictureProps> = ({ width, height, src, alt }) => {
  return (
    <Image
      className="mx-auto rounded-box border-4 border-base-300 dark:border-base-200 shadow-lg"
      src={src}
      width={width}
      height={height}
      alt={alt}
    />
  );
};

export default BorderedPicture;
