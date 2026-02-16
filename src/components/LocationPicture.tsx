import { LucideMapPin } from "lucide-react";
import Image from "next/image";

type LocationPictureProps = {
  width: number;
  height: number;
  src: string;
  alt: string;
  location: string;
};

const LocationPicture: React.FC<LocationPictureProps> = ({
  width,
  height,
  src,
  alt,
  location,
}: LocationPictureProps) => {
  return (
    <figure>
      <Image
        className="mx-auto rounded-lg border-4 border-spring-wood-200/[.5] dark:border-neutral-800/[.5] shadow-lg"
        src={src}
        width={width}
        height={height}
        alt={alt}
      />
      <figcaption className="flex gap-2 justify-center items-center text-center font-(family-name:--font-hubot) text-xs mt-2 text-gray-500 dark:text-gray-400">
        <LucideMapPin /> {location}
      </figcaption>
    </figure>
  );
};

export default LocationPicture;
