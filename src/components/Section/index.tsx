import style from "@/styles/components/section.module.scss";

type SectionProps = {
  children: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ children }: SectionProps) => {
  return <h2 className={style.section}>{children}</h2>;
};

export default Section;
