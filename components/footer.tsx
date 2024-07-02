import Link from "next/link";
import styles from "@/styles/footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>
              Hibbard&apos;s Custard Tracker
            </h3>
            <p className={styles.footerSubtitle}>
              Never miss your favorite flavor again!
            </p>
          </div>
          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Quick Links</h4>
            <ul className={styles.footerList}>
              <li>
                <Link href="/about" className={styles.footerLink}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/flavors" className={styles.footerLink}>
                  Our Flavors
                </Link>
              </li>
              <li>
                <a
                  href="http://www.hibbardscustard.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerLink}
                >
                  Visit Hibbard&apos;s
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Connect</h4>
            <a
              href="https://github.com/SpecialistSteak"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubButton}
            >
              GitHub
            </a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Hibbard&apos;s Custard Tracker.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
