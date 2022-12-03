import {
  faGithub,
  faInstagram,
  faLastfm,
  faLinkedin,
  faOrcid,
  faResearchgate,
  faSpotify,
  faStackOverflow,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Diogo Moreira</title>
        <meta name="description" content="My thoughts about life, software development, games, music and so forth" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className={styles.main}>
        <Image alt="Diogo Moreira" src="/profile.jpeg" width={200} height={200} className={styles.profilepic}></Image>
        <h1 className={styles.title}>Diogo Moreira</h1>
        <h2 className={styles.subtitle}>Professor. Software Engineer. Researcher</h2>

        <p className={styles.description}>A Lifelong learner.</p>
        <div className={styles.icons}>
          <a href="https://twitter.com/diogodmoreira" target="_blank" title="Link for Twitter" rel="external">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://github.com/diogomoreira" target="_blank" title="Link for Github" rel="external">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://instagram.com/diogo.dmoreira" target="_blank" title="Link for Instagram" rel="external">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://www.linkedin.com/in/diogodmoreira" target="_blank" title="Link for Linkedin" rel="external">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            href="https://open.spotify.com/user/diogodmoreira?si=7acca8ba1ba74663"
            target="_blank"
            title="Link for Spotify"
            rel="external">
            <FontAwesomeIcon icon={faSpotify} />
          </a>
          <a href="https://www.last.fm/user/moreiradiogo" target="_blank" title="Link for Lastfm" rel="external">
            <FontAwesomeIcon icon={faLastfm} />
          </a>
          <a
            href="https://www.researchgate.net/profile/Diogo_Moreira4"
            target="_blank"
            title="Link for ResearchGate"
            rel="external">
            <FontAwesomeIcon icon={faResearchgate} />
          </a>
          <a href="https://orcid.org/0000-0003-1803-6565" target="_blank" title="Link for Orcid" rel="external">
            <FontAwesomeIcon icon={faOrcid} />
          </a>
          <a
            href="https://stackoverflow.com/users/1541533/diogo-moreira"
            target="_blank"
            title="Link for StackOverflow"
            rel="external">
            <FontAwesomeIcon icon={faStackOverflow} />
          </a>
        </div>
      </main>
    </div>
  );
}
