import React from "react"
import { AnimatePresence } from "framer-motion"
import "prismjs/themes/prism-twilight.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import "prismjs/plugins/command-line/prism-command-line.css"

import "katex/dist/katex.min.css"
import "masonry-layout/dist/masonry.pkgd.js"

export const wrapPageElement = ({ element }) => (
  <AnimatePresence exitBeforeEnter>{element}</AnimatePresence>
)
