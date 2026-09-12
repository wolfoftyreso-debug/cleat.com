'use client';

import { useEffect, useState } from 'react';
import { Loading, Shell } from '../../components/Shell';
import { describeFailure } from '../../lib/action';
import { api } from '../../lib/api';
import { useRequireAuth } from '../../lib/session';

interface Tool {
  id: string;
  category: 'acute' | 'cognitive' | 'behavioural' | 'social' | 'life';
  minutes: number;
  lowEffort: boolean;
  label: string;
  categoryLabel: string;
}

const ORDER: Tool['category'][] = ['acute', 'cognitive', 'behavioural', 'social', 'life'];

/**
 * The toolbox.
 *
 * Every entry is a verb — something you can start within the next sixty seconds.
 * Nothing in here is "reflect on your journey".
 *
 * Acute comes first and is never collapsed, because the one time someone opens
 * this page in a hurry is the time they need that section.
 */
export default function ToolboxPage() {
  const { user, loading, t } = useRequireAuth();
  const [tools, setTools] = useState<Tool[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [onlyQuick, setOnlyQuick] = useState(false);

  useEffect(() => {
    if (!user) return;
    void api
      .get<{ tools: Tool[] }>('/v1/toolbox')
      .then((response) => setTools(response.tools))
      // Not `setTools([])`. This screen is the list of things that help, and
      // emptying it on a failed request tells somebody who came here looking
      // for one that they have none.
      .catch((caught: unknown) => setLoadError(describeFailure(t, caught)));
  }, [user]);

  if (loading || !user) return <Loading />;

  const visible = onlyQuick ? tools.filter((tool) => tool.lowEffort) : tools;

  return (
    <Shell title={t('toolbox.title')}>
      {loadError ? (
        <div className="error-banner" role="alert">
          {loadError}
        </div>
      ) : null}
      <div className="chips" style={{ marginBottom: 18 }}>
        <button className="chip" data-selected={!onlyQuick} onClick={() => setOnlyQuick(false)}>
          {t('toolbox.all')}
        </button>
        <button className="chip" data-selected={onlyQuick} onClick={() => setOnlyQuick(true)}>
          {t('toolbox.quickOnly')}
        </button>
      </div>

      {ORDER.map((category) => {
        const inCategory = visible.filter((tool) => tool.category === category);
        if (inCategory.length === 0) return null;
        return (
          <section key={category}>
            <h2>{inCategory[0]?.categoryLabel}</h2>
            <div className="card">
              {inCategory.map((tool) => (
                <div className="resource" key={tool.id}>
                  <span style={{ color: 'var(--text)' }}>{tool.label}</span>
                  <span className="muted">{t('toolbox.minutes', { minutes: tool.minutes })}</span>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {tools.length === 0 ? <p className="muted">{t('common.loading')}</p> : null}
    </Shell>
  );
}
