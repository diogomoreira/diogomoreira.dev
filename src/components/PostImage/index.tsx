import { Image, chakra } from "@chakra-ui/react";
import React from "react";

const PostImage = chakra(Image, {
  baseStyle: { maxH: "100%", maxW: "100%" },
  shouldForwardProp: prop =>
    ["height", "width", "quality", "src", "alt", "placeholder", "blurDataURL", "loader"].includes(prop),
});

export default PostImage;
