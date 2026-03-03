"use client";

import { FormEvent, useState } from "react";
import { IconWithFallback } from "@/components/IconWithFallback";
import { useToast } from "@/components/ToastProvider";
import { useAppState } from "@/context/AppStateContext";
import { formatDateReadable } from "@/lib/utils";

const faqItems = [
  {
    q: "Is HypoWare a medical diagnosis app?",
    a: "No. HypoWare is an educational support site for awareness and safer daily habits.",
  },
  {
    q: "Can I use this on mobile?",
    a: "Yes. The interface is mobile-first and supports tap interactions.",
  },
];

export default function ContactPage() {
  const {
    state: { contact },
    saveContactMessage,
  } = useAppState();
  const { addToast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      addToast("Please complete all fields.", "error");
      return;
    }

    saveContactMessage({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      dateISO: new Date().toISOString(),
    });

    setName("");
    setEmail("");
    setMessage("");
    addToast("Message saved", "success");
  };

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
        <h1 className="text-2xl font-extrabold text-sky-950">Contact</h1>
        <p className="mt-1 text-sm text-sky-900">Leave a message and review quick FAQs.</p>
      </header>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-sky-200 bg-white p-4">
          <h2 className="text-lg font-bold text-sky-900">Send a message</h2>
          <form onSubmit={handleSubmit} className="mt-3 space-y-3">
            <label className="block text-sm font-semibold text-sky-900">
              Name
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-1 w-full rounded-xl border border-sky-200 px-3 py-2 text-sm"
              />
            </label>

            <label className="block text-sm font-semibold text-sky-900">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-1 w-full rounded-xl border border-sky-200 px-3 py-2 text-sm"
              />
            </label>

            <label className="block text-sm font-semibold text-sky-900">
              Message
              <textarea
                rows={5}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="mt-1 w-full rounded-xl border border-sky-200 px-3 py-2 text-sm"
              />
            </label>

            <button
              type="submit"
              className="rounded-full bg-sky-500 px-5 py-2 text-sm font-bold text-white transition hover:bg-sky-600"
            >
              Save Message
            </button>
          </form>

          {contact.lastMessage ? (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
              <p className="font-semibold">Last saved message</p>
              <p className="mt-1">
                {contact.lastMessage.name} ({contact.lastMessage.email})
              </p>
              <p className="mt-1">{contact.lastMessage.message}</p>
              <p className="mt-1 text-xs">Saved: {formatDateReadable(contact.lastMessage.dateISO)}</p>
            </div>
          ) : null}
        </article>

        <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <h2 className="inline-flex items-center gap-2 text-lg font-bold text-emerald-900">
            <IconWithFallback src="/icons/info.svg" alt="FAQ" label="FAQ" className="h-5 w-5" />
            FAQ
          </h2>

          <div className="mt-3 space-y-2">
            {faqItems.map((item, index) => (
              <div key={item.q} className="rounded-xl border border-emerald-200 bg-white">
                <button
                  type="button"
                  onClick={() => setOpenFaq((previous) => (previous === index ? null : index))}
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-semibold text-emerald-900"
                >
                  {item.q}
                  <span>{openFaq === index ? "-" : "+"}</span>
                </button>
                {openFaq === index ? (
                  <p className="border-t border-emerald-100 px-3 py-2 text-sm text-emerald-900">{item.a}</p>
                ) : null}
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
