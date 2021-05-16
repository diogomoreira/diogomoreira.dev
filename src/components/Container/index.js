import React from "react"
import * as S from "./styled"

export default function Container({ className, children }) {
  return <S.Container className={className}>{children}</S.Container>
}
