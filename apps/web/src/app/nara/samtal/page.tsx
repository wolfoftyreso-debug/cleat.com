'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Loading, Shell } from '../../../components/Shell';
import { api, type CoachResponse } from '../../../lib/api';
import { useRequireAuth } from '../../../lib/session';

interface Bubble {
  role: 'user' | 'assistant';
  content: string;
  emergency?: boolean;
  resources?: { key: string; contact: string; label: string }[];
}

/**
 * The sounding board for somebody standing next to an addiction.
 *
 * A separate screen rather than a toggle on the coach, because it is a
 * different conversation with a different system prompt and different rules —
 * and because the transcript should not interleave with a recovery
 * conversation if the same person happens to have both.
 *
 * No history is loaded here even though the endpoint has one. Someone using
 * this may be sharing a household, and often a device, with the person they are
 * writing about; a chat that reopens where it left off is a page that can be
 * scrolled by somebody else. The recovery coach keeps its history because it
 * belongs to the person's own record. This one starts blank every time, and
 * says so.
 */
export default function SupporterTalkPage() {
  const { user, loading, t } = useRequireAuth();
  const [messages, setMessages] = useState<Bubble[]>([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (loading || !user) return <Loading />;

  async function send(event: FormEvent) {
    event.preventDefault();
    const message = draft.trim();
    if (!message || busy) return;

    setDraft('');
    setMessages((current) => [...current, { role: 'user', content: message }]);
    setBusy(true);

    try {
      const response = await api.post<CoachResponse>('/v1/coach/message', {
        message,
        // Declared by the client, like every other mode in this product. No
        // classifier could reliably tell "he drank again last night" written by
        // the person from the same sentence written by their partner, and
        // getting it wrong means answering the wrong human being.
        mode: 'supporter',
      });
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: response.reply,
          emergency: response.safety.level === 'emergency',
          resources: response.safety.resources,
        },
      ]);
    } catch {
      setMessages((current) => [...current, { role: 'assistant', content: t('coach.offline') }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Shell title={t('near.talkTitle')}>
      {messages.length === 0 ? (
        <>
          <p className="lede">{t('near.talkGreeting')}</p>
          <p className="muted">{t('near.talkNotAboutThem')}</p>
          <p className="muted">{t('near.talkNoAdviceOnLeaving')}</p>
        </>
      ) : null}

      <div className="chat">
        {messages.map((bubble, index) => (
          <div key={index}>
            <div
              className="bubble"
              data-role={bubble.role}
              data-emergency={bubble.emergency ? 'true' : 'false'}
            >
              {bubble.content}
            </div>
            {bubble.resources?.length ? (
              <div className="card warning" style={{ marginTop: 10 }}>
                <h3>{t('safety.resourcesTitle')}</h3>
                {bubble.resources.map((resource) => (
                  <div className="resource" key={resource.key}>
                    <span>{resource.label}</span>
                    {resource.contact ? (
                      <a
                        className="num"
                        href={`tel:${resource.contact.replace(/\s/g, '')}`}
                        aria-label={t('action.callNumber', {
                          name: resource.label,
                          number: resource.contact,
                        })}
                      >
                        {resource.contact}
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ))}
        {busy ? (
          <div className="bubble" data-role="assistant">
            {t('coach.thinking')}
          </div>
        ) : null}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void send(event);
        }}
      >
        <div className="field">
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={t('near.talkPlaceholder')}
            style={{ minHeight: 90 }}
          />
        </div>
        <button className="btn primary wide" type="submit" disabled={busy || !draft.trim()}>
          {t('coach.send')}
        </button>
      </form>

      <p className="muted" style={{ marginTop: 16 }}>
        {t('coach.notATherapist')} {t('safety.disclaimer')}
      </p>
      <Link className="btn wide" href="/nara">
        {t('near.title')}
      </Link>
    </Shell>
  );
}
