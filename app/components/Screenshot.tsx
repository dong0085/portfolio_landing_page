'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { FaExpand, FaTimes } from 'react-icons/fa';

interface Props {
  src: string;
  width: number;
  height: number;
  alt: string;
  sizes: string;
  phone?: boolean;
  priority?: boolean;
  labels: { enlarge: string; close: string };
}

export default function Screenshot({
  src,
  width,
  height,
  alt,
  sizes,
  phone,
  priority,
  labels,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const frame = phone
    ? 'rounded-[1.75rem] border-[6px] border-[#1f1d1a] dark:border-[#2b2925]'
    : 'rounded-xl border border-card-border';

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-label={`${labels.enlarge}: ${alt}`}
        className={`group/shot relative block w-full cursor-zoom-in overflow-hidden bg-surface-2 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${frame}`}>
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full transition-transform duration-500 ease-out group-hover/shot:scale-[1.015]"
        />
        <span
          aria-hidden="true"
          className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur transition-opacity duration-200 group-hover/shot:opacity-100 group-focus-visible/shot:opacity-100">
          <FaExpand className="size-3.5" />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={alt}
        onClick={() => dialogRef.current?.close()}
        className="m-auto max-h-none max-w-none overflow-visible bg-transparent p-0 backdrop:bg-slate-950/85 backdrop:backdrop-blur-sm">
        <Image
          src={src}
          width={width}
          height={height}
          alt=""
          sizes="94vw"
          className="h-auto max-h-[90vh] w-auto max-w-[94vw] cursor-zoom-out rounded-lg object-contain"
        />
        <button
          type="button"
          autoFocus
          onClick={() => dialogRef.current?.close()}
          aria-label={labels.close}
          className="fixed right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
          <FaTimes aria-hidden="true" className="size-4" />
        </button>
      </dialog>
    </>
  );
}
