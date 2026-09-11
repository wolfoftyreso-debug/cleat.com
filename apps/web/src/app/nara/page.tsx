import Link from 'next/link';
import {
  BOUNDARY_SITUATIONS,
  emergencyResources,
  supporterResources,
  SUPPORTER_EMERGENCY_SIGNS,
  SUPPORTER_TOPICS,
} from '@cleat/core';
import { translator } from '@cleat/i18n';
import { publicPage } from '../../lib/seo';
import styles from '../landing.module.css';
import { SupporterCheck } from '../../components/SupporterCheck';

/**
 * Cleat Nära — for the person standing next to an addiction.
 *
 * Server-rendered and reachable with no account, like the crisis page, and for
 * the same reason: the people who need this most are often the ones who would
 * never register for an app about somebody else's drinking. Nothing on the page
 * is logged, and the one interactive part runs entirely in the browser.
 *
 * It shows nothing at all about any particular person. That is not a limitation
 * to be lifted later — a relative who can watch somebody's streak counter has
 * been handed a surveillance tool, and in these households surveillance is
 * usually already the problem.
 *
 * Swedish, like `/kris`, because a signed-out visitor has told us nothing and
 * this deployment is Swedish-first.
 */
const LOCALE = 'sv';
const COUNTRY = 'SE';

const t = translator(LOCALE);

export const metadata = publicPage({
  title: 'Anhörig till någon som dricker eller använder',
  description:
    'För dig som är partner, förälder, barn eller vän till någon med ett beroende. Vad som faktiskt händer, vad som hjälper, gränser du kan säga högt — och var du själv tog vägen.',
  path: '/nara',
});

export default function SupporterPage() {
  const emergency = emergencyResources(COUNTRY, 'emergency');
  const forRelatives = supporterResources(COUNTRY);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.wordmark}>
          CLEAT
        </Link>
        <Link href="/login" className={styles.signIn}>
          {t('near.talkSignIn')}
        </Link>
      </header>

      <h1 className={styles.title}>{t('near.title')}</h1>
      <p className={styles.lede}>{t('near.tagline')}</p>
      <p className={styles.cardBody}>{t('near.intro')}</p>
      <p className={styles.cardBody} style={{ opacity: 0.7 }}>
        {t('near.noAccountNeeded')}
      </p>

      {/* First on the page, before anything reflective. Somebody reading this
          at two in the morning with a person unconscious in the next room must
          not have to scroll past a self-assessment to reach it. */}
      <section className={styles.crisis} aria-labelledby="near-emergency">
        <h2 id="near-emergency" className={styles.crisisTitle}>
          {t('near.emergencyTitle')}
        </h2>
        <p className={styles.crisisBody}>{t('near.emergencyLede')}</p>
        <ul className={styles.crisisBody}>
          {SUPPORTER_EMERGENCY_SIGNS.map((sign) => (
            <li key={sign}>{t(`near.sign.${sign}`)}</li>
          ))}
        </ul>
        <p className={styles.crisisBody}>{t('near.recoveryPosition')}</p>
        <p className={styles.crisisBody}>
          {emergency
            .filter((resource) => resource.contact)
            .map((resource) => (
              <span key={resource.key} style={{ marginRight: 18, display: 'inline-block' }}>
                <a
                  href={`tel:${resource.contact.replace(/\s/g, '')}`}
                  aria-label={t('action.callNumber', {
                    name: t(resource.key),
                    number: resource.contact,
                  })}
                  style={{ color: 'var(--accent-strong)', fontWeight: 700 }}
                >
                  {resource.contact}
                </a>{' '}
                {t(resource.key)}
              </span>
            ))}
        </p>
      </section>

      <section aria-labelledby="near-understand">
        <h2 id="near-understand" className={styles.crisisTitle} style={{ marginTop: 48 }}>
          {t('near.understandTitle')}
        </h2>
        <div className={styles.grid}>
          {SUPPORTER_TOPICS.map((topic) => (
            <article className={styles.card} key={topic}>
              <h3 className={styles.cardTitle}>{t(`near.topic.${topic}`)}</h3>
              <p className={styles.cardBody}>{t(`near.topic.${topic}.body`)}</p>
            </article>
          ))}
        </div>
      </section>

      {/* The only interactive part, and it is a client island that computes in
          the browser and posts nothing. What somebody answers here is the most
          sensitive thing they could type into this product, and there is no
          version of it that needs a copy. */}
      <section aria-labelledby="near-check">
        <h2 id="near-check" className={styles.crisisTitle} style={{ marginTop: 48 }}>
          {t('near.checkTitle')}
        </h2>
        <p className={styles.cardBody}>{t('near.checkLede')}</p>
        <p className={styles.cardBody} style={{ opacity: 0.7 }}>
          {t('near.checkNotADiagnosis')}
        </p>
        <SupporterCheck />
      </section>

      <section aria-labelledby="near-boundaries">
        <h2 id="near-boundaries" className={styles.crisisTitle} style={{ marginTop: 48 }}>
          {t('near.boundariesTitle')}
        </h2>
        <p className={styles.cardBody}>{t('near.boundariesLede')}</p>
        <div className={styles.grid}>
          {BOUNDARY_SITUATIONS.map((situation) => (
            <article className={styles.card} key={situation}>
              <h3 className={styles.cardTitle}>{t(`near.boundary.${situation}`)}</h3>
              <p className={styles.cardBody}>{t(`near.boundary.${situation}.say`)}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="near-resources">
        <h2 id="near-resources" className={styles.crisisTitle} style={{ marginTop: 48 }}>
          {t('near.resourcesTitle')}
        </h2>
        <div className={styles.grid}>
          {forRelatives.map((resource) => (
            <article className={styles.card} key={resource.key}>
              <h3 className={styles.cardTitle}>{t(resource.key)}</h3>
              {resource.contact ? (
                <p className={styles.cardBody}>
                  <a
                    href={`tel:${resource.contact.replace(/\s/g, '')}`}
                    aria-label={t('action.callNumber', {
                      name: t(resource.key),
                      number: resource.contact,
                    })}
                    style={{ color: 'var(--accent-strong)', fontSize: '1.2rem', fontWeight: 700 }}
                  >
                    {resource.contact}
                  </a>
                </p>
              ) : null}
            </article>
          ))}
        </div>
        <p className={styles.cardBody} style={{ opacity: 0.7 }}>
          {t('near.noRequirement')}
        </p>
      </section>

      <section className={styles.crisis} aria-labelledby="near-talk">
        <h2 id="near-talk" className={styles.crisisTitle}>
          {t('near.talkTitle')}
        </h2>
        <p className={styles.crisisBody}>{t('near.talkLede')}</p>
        <p className={styles.crisisBody}>{t('near.talkNoAdviceOnLeaving')}</p>
        <Link href="/login" className={styles.crisisLink}>
          {t('near.talkSignIn')}
        </Link>
      </section>

      <section className={styles.crisis}>
        <h2 className={styles.crisisTitle}>Sökte du på &quot;medberoende&quot;?</h2>
        <p className={styles.crisisBody}>
          Ordet används på tjugo olika sätt och är ingen diagnos. Vi har skrivit ut vad det
          betyder, vad forskningen faktiskt säger, och varför vi inte sätter det som etikett
          på dig.
        </p>
        <Link href="/medberoende" className={styles.crisisLink}>
          Vad medberoende betyder →
        </Link>
      </section>

      <footer className={styles.footer}>
        <p>
          {t('near.forThePersonTitle')} {t('near.forThePersonBody')}{' '}
          <Link href="/" style={{ color: 'var(--accent-strong)' }}>
            {t('near.backToApp')}
          </Link>
        </p>
      </footer>
    </main>
  );
}
