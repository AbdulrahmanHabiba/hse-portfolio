import { getLocale, getTranslations } from "next-intl/server";
import { db } from "@/lib/db";
import { formatDateTime } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import { deleteMessage, toggleMessageRead } from "@/features/messages/actions";
import { ActionButton } from "@/components/dashboard/form-kit";
import { EmptyList, PageTitle } from "@/components/dashboard/page-title";
import { cn } from "@/lib/utils";

export default async function MessagesPage() {
  const [t, tc, locale, rows] = await Promise.all([
    getTranslations("dashboard.messages"),
    getTranslations("dashboard.common"),
    getLocale(),
    db.message.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
  ]);

  return (
    <>
      <PageTitle title={t("title")} description={t("description")} />
      {rows.length === 0 ? (
        <EmptyList text={t("empty")} />
      ) : (
        <ul className="space-y-4">
          {rows.map((m) => (
            <li key={m.id} className={cn("rounded-xl border-2 bg-surface p-5", m.read ? "border-line" : "border-ink")}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="flex items-center gap-2 font-semibold">
                    {!m.read ? <span aria-label={t("unread")} className="size-2.5 rounded-full bg-hazard ring-2 ring-ink" /> : null}
                    {m.name}
                  </p>
                  <a href={`mailto:${m.email}`} dir="ltr" className="text-sm text-steel underline underline-offset-4">{m.email}</a>
                </div>
                <p className="text-sm text-steel">{formatDateTime(m.createdAt, locale as Locale)}</p>
              </div>
              <p className="mt-4 whitespace-pre-wrap" dir="auto">{m.body}</p>
              <div className="mt-5 flex gap-2">
                <ActionButton
                  variant="secondary"
                  action={toggleMessageRead.bind(null, m.id, !m.read)}
                  label={m.read ? t("markUnread") : t("markRead")}
                />
                <ActionButton action={deleteMessage.bind(null, m.id)} label={tc("delete")} confirmText={tc("confirmDelete")} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
