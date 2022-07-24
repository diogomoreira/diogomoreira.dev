import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "gatsby";
import { TagStyle } from "../../styles/global";

function CardImage({ image, title }) {
  return <GatsbyImage objectFit="cover" image={image} alt={title} />;
}

function CardDetails({ timeToRead, date }) {
  return (
    <div>
      {timeToRead && (
        <div>
          {timeToRead} {timeToRead > 1 ? `minutos` : `minuto`}
        </div>
      )}
      {date && <time>{format(new Date(date), "dd 'de' LLLL 'de' yyyy", { locale: ptBR })}</time>}
    </div>
  );
}

export { CardImage, CardDetails };
