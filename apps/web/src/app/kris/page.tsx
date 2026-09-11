import Link from 'next/link';
import { emergencyResources } from '@cleat/core';
import { translator } from '@cleat/i18n';
import { publicPage } from '../../lib/seo';
import styles from '../landing.module.css';

/**
 * Crisis numbers, reachable with no account and no JavaScript.
 *
 * Everything on this page is static and server-rendered. It does not call the
 * API, so it works when the API is down; it does not need the client bundle,
 * so it works on a connection that will not finish loading one; and it stores
 * nothing, so visiting it leaves no trace in anybody's record.
 *
 * The numbers are Swedish because this deployment is Swedish-first, and a
 * visitor who has not signed in has told us nothing else. A deployment for
 * another country must change the constant below — a crisis line that does not
 * answer where the person is standing is worse than none, because it costs the
 * call.
 *
 * The lines and the words come from `@cleat/core` and the shared catalogue
 * rather than from a list kept here. They used to be a copy, and a copy of the
 * emergency numbers is exactly the thing that goes stale without anybody
 * noticing: the coach would hand out one set and this page another.
 */
const COUNTRY = 'SE';
const LOCALE = 'sv';

const t = translator(LOCALE);

export const metadata = publicPage({
  title: 'Akut hjälp — nummer att ringa nu',
  description:
    'Svenska krisnummer vid överdos, självmordstankar, abstinens och oro för någon annan. Inget konto, ingen inloggning, sidan fungerar utan JavaScript.',
  path: '/kris',
});

export default function CrisisPage() {
  const resources = emergencyResources(COUNTRY, 'emergency');

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.wordmark}>
          CLEAT
        </Link>
      </header>

      <h1 className={styles.title}>{t('crisis.title')}</h1>
      <p className={styles.lede}>{t('crisis.lede')}</p>

      <section className={styles.grid}>
        {resources.map((resource) => (
          <article className={styles.card} key={resource.key}>
            <h2 className={styles.cardTitle}>{t(resource.key)}</h2>
            {/* A real tel: link. On the device most people will read this on,
                the number should be one tap, not something to memorise and
                retype while shaking. */}
            {resource.contact ? (
              <p style={{ margin: '0 0 10px' }}>
                <a
                  href={`tel:${resource.contact.replace(/\s/g, '')}`}
                  // The number stays the visible text — it is what somebody
                  // reads off the screen to dial on another phone. The
                  // accessible name adds the verb and who answers.
                  aria-label={t('action.callNumber', {
                    name: t(resource.key),
                    number: resource.contact,
                  })}
                  style={{ color: 'var(--accent-strong)', fontSize: '1.35rem', fontWeight: 700 }}
                >
                  {resource.contact}
                </a>
              </p>
            ) : null}
            <p className={styles.cardBody}>{t(`${resource.key}.when`)}</p>
          </article>
        ))}
      </section>

      <section className={styles.crisis}>
        <h2 className={styles.crisisTitle}>{t('crisis.noWordsTitle')}</h2>
        <p className={styles.crisisBody}>{t('crisis.noWordsBody')}</p>
        <p className={styles.crisisBody}>{t('crisis.someoneElse')}</p>
      </section>

      <section className={styles.crisis}>
        <h2 className={styles.crisisTitle}>{t('crisis.detoxTitle')}</h2>
        <p className={styles.crisisBody}>{t('crisis.detoxBody')}</p>
      </section>

      <section className={styles.crisis}>
        <h2 className={styles.crisisTitle}>{t('near.title')}</h2>
        <p className={styles.crisisBody}>{t('near.tagline')}</p>
        <Link href="/nara" className={styles.crisisLink}>
          {t('near.understandTitle')} →
        </Link>
      </section>

      <footer className={styles.footer}>
        <p>{t('crisis.privacyNote')}</p>
      </footer>
    </main>
  );
}
