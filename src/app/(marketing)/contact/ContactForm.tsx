'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { contactFormSchema } from '@/lib/validations';
import { useState } from 'react';

type FormData = z.infer<typeof contactFormSchema>;

const inputClasses =
  'w-full rounded-[12px] border border-[#d0d0d0] bg-[#e4e8ef] px-4 py-3 text-[15px] font-semibold text-[#1a1a1a] placeholder:text-[#888] focus:border-[#5a72be] focus:outline-none focus:ring-1 focus:ring-[#5a72be]';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(data: FormData) {
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: 'contact' }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit.');
      }

      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or email us directly.');
    }
  }

  if (submitted) {
    return (
      <div className="rounded-[22px] bg-[#e4e8ef] p-8 text-center">
        <h3 className="text-[24px] font-bold text-[#1a1a1a]">
          Message Sent!
        </h3>
        <p className="mt-4 text-[17px] font-semibold text-[#555]">
          Thank you for reaching out. We will get back to you within one
          business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-[22px] bg-[#e4e8ef] p-6 md:p-8"
    >
      {error && (
        <div className="rounded-[12px] border border-red-300 bg-red-50 px-4 py-3 text-[14px] font-semibold text-red-600">
          {error}
        </div>
      )}

      {/* Name */}
      <div>
        <label
          htmlFor="contact-name"
          className="mb-1.5 block text-[14px] font-semibold text-[#1a1a1a]"
        >
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          {...register('name')}
          className={inputClasses}
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="mt-1 text-[12px] font-semibold text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="contact-email"
          className="mb-1.5 block text-[14px] font-semibold text-[#1a1a1a]"
        >
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          {...register('email')}
          className={inputClasses}
          placeholder="john@company.com"
        />
        {errors.email && (
          <p className="mt-1 text-[12px] font-semibold text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Company */}
      <div>
        <label
          htmlFor="contact-company"
          className="mb-1.5 block text-[14px] font-semibold text-[#1a1a1a]"
        >
          Company
        </label>
        <input
          id="contact-company"
          type="text"
          {...register('company')}
          className={inputClasses}
          placeholder="Company Name (optional)"
        />
        {errors.company && (
          <p className="mt-1 text-[12px] font-semibold text-red-500">{errors.company.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-[14px] font-semibold text-[#1a1a1a]"
        >
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          {...register('message')}
          className={inputClasses}
          placeholder="How can we help you?"
        />
        {errors.message && (
          <p className="mt-1 text-[12px] font-semibold text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-full bg-[#5a72be] px-6 py-3.5 text-[14px] font-semibold text-white transition-all duration-300 hover:bg-[#4d63a8] focus:outline-none focus:ring-2 focus:ring-[#5a72be] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
