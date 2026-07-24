'use client';

import { motion, useReducedMotion } from 'motion/react';

export default function MobileEmptyState({ message }: { message: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col items-center py-12 text-center">
      <div
        aria-hidden="true"
        className="relative mb-7 h-52 w-64 select-none">
        <div className="absolute inset-8 rounded-full bg-violet-200/35 blur-3xl" />

        <motion.div
          className="absolute left-5 top-10 h-32 w-20 rounded-[1.35rem] border border-violet-300/70 bg-white/55 shadow-lg shadow-violet-200/40 backdrop-blur-sm"
          animate={
            shouldReduceMotion
              ? undefined
              : { y: [0, -7, 0], rotate: [-8, -5, -8] }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 7, repeat: Infinity, ease: 'easeInOut' }
          }>
          <div className="mx-auto mt-2 h-1 w-7 rounded-full bg-violet-200" />
          <div className="mx-3 mt-4 h-12 rounded-lg bg-gradient-to-br from-violet-100 to-blue-50" />
          <div className="mx-3 mt-3 h-1.5 rounded-full bg-slate-200" />
          <div className="mx-3 mt-2 h-1.5 w-8 rounded-full bg-slate-200" />
        </motion.div>

        <motion.div
          className="absolute right-5 top-9 h-32 w-20 rounded-[1.35rem] border border-blue-300/70 bg-white/55 shadow-lg shadow-blue-200/40 backdrop-blur-sm"
          animate={
            shouldReduceMotion
              ? undefined
              : { y: [0, 6, 0], rotate: [8, 5, 8] }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: 7.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }
          }>
          <div className="mx-auto mt-2 h-1 w-7 rounded-full bg-blue-200" />
          <div className="mx-3 mt-4 grid grid-cols-2 gap-1.5">
            <div className="h-7 rounded-md bg-blue-100" />
            <div className="h-7 rounded-md bg-violet-100" />
            <div className="h-7 rounded-md bg-violet-100" />
            <div className="h-7 rounded-md bg-blue-100" />
          </div>
        </motion.div>

        <div className="absolute left-1/2 top-3 -translate-x-1/2">
          <motion.div
            className="h-44 w-24 rounded-[1.65rem] border-2 border-[#1E4D8F]/65 bg-white/90 shadow-xl shadow-[#1E4D8F]/15"
            animate={shouldReduceMotion ? undefined : { y: [0, -9, 0] }}
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
            }>
            <div className="mx-auto mt-2 h-1.5 w-8 rounded-full bg-[#1E4D8F]/20" />
            <div className="mx-2.5 mt-4 rounded-xl bg-gradient-to-br from-[#1E4D8F]/10 via-violet-100 to-blue-100 p-2.5">
              <div className="h-14 rounded-lg border border-white/70 bg-white/65 shadow-sm" />
              <div className="mt-2 h-1.5 rounded-full bg-[#1E4D8F]/20" />
              <div className="mt-1.5 h-1.5 w-10 rounded-full bg-[#1E4D8F]/15" />
            </div>
            <div className="mx-auto mt-3 h-2 w-2 rounded-full bg-[#1E4D8F]/25" />
          </motion.div>
        </div>
      </div>

      <motion.p
        className="max-w-md text-lg font-light italic text-slate-400"
        animate={
          shouldReduceMotion ? undefined : { opacity: [0.55, 1, 0.55] }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
        }>
        {message}
      </motion.p>
    </div>
  );
}
