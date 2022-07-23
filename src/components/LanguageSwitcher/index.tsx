import * as React from "react";
import { navigate } from "gatsby";
import { useLocalization } from "gatsby-theme-i18n";
import styled from "styled-components";
import { SyntheticEvent } from "react";
import { ChangeEvent } from "react";

const LanguageSwitchContainer = styled.div`
  padding: calc(var(--padding) / 4);
  border-radius: var(--border-radius);
  cursor: pointer;
`;

const LanguageSwitcher: React.FC = () => {
  const { locale, defaultLang, config } = useLocalization();
  const switchLanguage = (newLocale: string) => {
    if (newLocale === locale) {
      return;
    }
    if (newLocale === defaultLang) {
      navigate("/");
    } else {
      navigate(`/pt`);
    }
  };
  return (
    <div>
      <LanguageSwitchContainer>
        {locale === defaultLang ? (
          <span onClick={e => switchLanguage("pt")}>🇧🇷</span>
        ) : (
          <span onClick={e => switchLanguage("en")}>🇺🇸</span>
        )}
      </LanguageSwitchContainer>
    </div>
  );
};
export default LanguageSwitcher;
