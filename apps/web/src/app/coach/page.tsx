'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Loading, Shell } from '../../components/Shell';
import { api, type CoachResponse } from '../../lib/api';
import { useRequireAuth } from '../../lib/session';

interface Bubble {
  role: 'user' | 'assistant';
  content: string;
  emergency?: boolean;
  resources?: { key: string; contact: string; label: string }[];
}

export default function CoachPage() {
  const { user, loading, t } = useRequireAuth();
  const [messages, setMessages] = useState<Bubble[]>([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!user) return;
    void api
      .get<{ messages: { role: 'user' | 'assistant'; content: string }[] }>('/v1/coach/history')
      .then((response) =>
        setMessages(response.messages.map((m) => ({ role: m.role, content: m.content }))),
      )
      .catch(() => setMessages([]));
  }, [user]);

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
      const response = await api.post<CoachResponse>('/v1/coach/message', { message });
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
    <Shell title={t('coach.title')}>
      {messages.length === 0 ? (
        <p className="lede">{t('coach.greeting.default')}</p>
      ) : null}

      {/*
        role="log" — a running transcript that is added to. It is polite by
        default, which is what a conversation wants: the coach's reply is
        announced when there is a gap, rather than interrupting whatever is
        being read. Before this the reply simply appeared and nothing was said
        about it at all.
      */}
      <div className="chat" role="log" aria-label={t('coach.conversationLabel')}>
        {messages.map((bubble, index) => (
          <div key={index}>
            <div
              className="bubble"
              data-role={bubble.role}
              data-emergency={bubble.emergency ? 'true' : 'false'}
            >
              {/* Who is speaking. The bubbles were told apart by colour and
                  which side they sat on, so read aloud the whole conversation
                  was one voice and there was no way to tell your own words
                  from the coach's. */}
              <span className="visually-hidden">
                {t(bubble.role === 'user' ? 'coach.fromYou' : 'coach.fromCoach')}:{' '}
              </span>
              {bubble.content}
            </div>
            {bubble.resources?.length ? (
              <div className="card warning" style={{ marginTop: 10 }}>
                <h2>{t('safety.resourcesTitle')}</h2>
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
            <span className="visually-hidden">{t('coach.fromCoach')}: </span>
            {t('coach.thinking')}
          </div>
        ) : null}
        <div ref={endRef} />
      </div>

      <form onSubmit={(e) => { e.preventDefault(); void send(e); }}>
        <div className="field">
          {/* A placeholder is not a label. It goes away the moment somebody
              starts typing, and it is not reliably announced as the control's
              name — which left the most-used input in the product nameless. */}
          <label className="visually-hidden" htmlFor="coach-message">
            {t('coach.inputLabel')}
          </label>
          <textarea
            id="coach-message"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={t('coach.placeholder')}
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
    </Shell>
  );
}
