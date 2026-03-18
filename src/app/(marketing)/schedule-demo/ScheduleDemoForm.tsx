'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { scheduleDemoSchema } from '@/lib/validations';
import { useState } from 'react';

type FormData = z.infer<typeof scheduleDemoSchema>;

const inputClasses =
  'w-full rounded-[12px] border border-[#d0d0d0] bg-[#e4e8ef] px-4 py-3 text-[15px] font-semibold text-[#1a1a1a] placeholder:text-[#888] focus:border-[#5a72be] focus:outline-none focus:ring-1 focus:ring-[#5a72be]';

export default function ScheduleDemoForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(scheduleDemoSchema),
  });

  async function onSubmit(data: FormData) {
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: 'demo' }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit. Please try again.');
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
          Thank You!
        </h3>
        <p className="mt-4 text-[17px] font-semibold text-[#555]">
          We have received your demo request. Our team will get back to you
          within one business day to confirm the details.
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
          htmlFor="name"
          className="mb-1.5 block text-[14px] font-semibold text-[#1a1a1a]"
        >
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
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
          htmlFor="email"
          className="mb-1.5 block text-[14px] font-semibold text-[#1a1a1a]"
        >
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
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
          htmlFor="company"
          className="mb-1.5 block text-[14px] font-semibold text-[#1a1a1a]"
        >
          Company <span className="text-red-500">*</span>
        </label>
        <input
          id="company"
          type="text"
          {...register('company')}
          className={inputClasses}
          placeholder="Company Name"
        />
        {errors.company && (
          <p className="mt-1 text-[12px] font-semibold text-red-500">{errors.company.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="mb-1.5 block text-[14px] font-semibold text-[#1a1a1a]"
        >
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          {...register('phone')}
          className={inputClasses}
          placeholder="+41 00 000 0000"
        />
        {errors.phone && (
          <p className="mt-1 text-[12px] font-semibold text-red-500">{errors.phone.message}</p>
        )}
      </div>

      {/* Preferred Date */}
      <div>
        <label
          htmlFor="preferredDate"
          className="mb-1.5 block text-[14px] font-semibold text-[#1a1a1a]"
        >
          Preferred Date
        </label>
        <input
          id="preferredDate"
          type="date"
          {...register('preferredDate')}
          className={inputClasses}
        />
        {errors.preferredDate && (
          <p className="mt-1 text-[12px] font-semibold text-red-500">
            {errors.preferredDate.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-[14px] font-semibold text-[#1a1a1a]"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          {...register('message')}
          className={inputClasses}
          placeholder="Tell us about your use case or any specific questions..."
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
        {isSubmitting ? 'Submitting...' : 'Request Demo'}
      </button>
    </form>
  );
}
