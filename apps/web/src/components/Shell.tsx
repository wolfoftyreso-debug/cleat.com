'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { useSession } from '../lib/session';

/**
 * The tab bar carries the three calm modes plus the coach.
 *
 * Reset (I'm craving) and Now (I'm struggling) are deliberately absent: they are
 * acute states reached from the enormous buttons on the home screen, not places
 * you browse to. Putting a craving button in permanent chrome would also mean it
 * is on screen when someone is doing fine, which is its own kind of suggestion.
 */
const TABS = [
  { href: '/home', key: 'nav.home' },
  { href: '/plan', key: 'nav.plan' },
  { href: '/patterns', key: 'nav.stats' },
  { href: '/rebuild', key: 'nav.rebuild' },
  { href: '/coach', key: 'nav.coach' },
];

export function Shell({ children, title }: { children: ReactNode; title?: string }) {
  const { t } = useSession();
  const pathname = usePathname();

  return (
    <>
      {/* Outside <main>, so it is a real banner landmark rather than a plain
          group of text inside the page content. Somebody navigating by landmark
          could previously not jump past the chrome, because as far as the
          accessibility tree was concerned there was no chrome — only main. */}
      <header className="topbar app-topbar">
        <span className="wordmark">{t('app.name')}</span>
        <Link href="/settings" className="muted">
          {t('nav.settings')}
        </Link>
      </header>

      <main className="shell">
        {title ? <h1>{title}</h1> : null}
        {children}
      </main>

      {/* Named, because a page with two navigations and no names announces
          "navigation" twice and leaves the listener to guess which is which. */}
      <nav className="tabbar" aria-label={t('nav.primaryLabel')}>
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              data-active={active}
              // data-active paints it. aria-current says it. Without the second
              // one the current tab is obvious to everybody who can see the
              // colour and invisible to everybody who cannot — which is exactly
              // the class of defect this audit was looking for.
              aria-current={active ? 'page' : undefined}
            >
              {t(tab.key)}
            </Link>
          );
        })}
      </nav>
    </>
  );
}

export function Loading() {
  const { t } = useSession();
  return (
    <main className="shell">
      {/* role="status" (implicit aria-live="polite"): the screen goes from
          "Loading…" to a full dashboard with nothing said about it otherwise. */}
      <p className="muted" role="status">
        {t('common.loading')}
      </p>
    </main>
  );
}
