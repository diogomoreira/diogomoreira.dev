import { LucideMapPin } from "lucide-react";
import BorderedPicture from "./BorderedImage";

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
      <BorderedPicture src={src} width={width} height={height} alt={alt} />
      <figcaption className="flex gap-2 justify-center items-center text-center font-(family-name:--font-hubot) text-xs mt-2 text-neutral-700 dark:text-gray-300">
        <LucideMapPin /> {location}
      </figcaption>
    </figure>
  );
};

export default LocationPicture;
