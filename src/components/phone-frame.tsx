"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// A stylized iPhone-style bezel around a real app screenshot — the "phone
// thingy" from the reference. The screenshot itself is a genuine crop of
// the live app's Subscriptions page (see public/app-mobile-preview.jpg's
// source note in the README), not a fabricated mockup.
export function PhoneFrame() {
  return (
    <motion.div
      className="relative"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative rounded-[2.4rem] bg-neutral-900 p-3 shadow-2xl shadow-black/30">
        {/* Side buttons */}
        <span aria-hidden="true" className="absolute -left-[3px] top-20 h-7 w-[3px] rounded-l-sm bg-neutral-800" />
        <span aria-hidden="true" className="absolute -left-[3px] top-28 h-12 w-[3px] rounded-l-sm bg-neutral-800" />
        <span aria-hidden="true" className="absolute -right-[3px] top-24 h-14 w-[3px] rounded-r-sm bg-neutral-800" />

        <div className="relative overflow-hidden rounded-[1.9rem] bg-black">
          <Image
            src="/app-mobile-preview.jpg"
            alt="The SubSentry subscriptions list on a phone — Adobe Creative Cloud flagged as high cost, plus iCloud+"
            width={780}
            height={1567}
            priority
            // unoptimized: see next.config.ts's own comment on the incident
            // this closes — a public image-optimizer endpoint that accepts
            // arbitrary width/quality combos is a cheap way to run up
            // Function Invocations for near-zero attacker cost. This is the
            // single largest image on the site (a real screenshot, not a
            // tiny logo), so it's also the one where a scan across many
            // width/quality variants would generate the most invocations.
            unoptimized
            className="w-full"
          />
          {/* Notch */}
          <div aria-hidden="true" className="absolute inset-x-0 top-0 flex justify-center">
            <div className="h-5 w-20 rounded-b-xl bg-black" />
          </div>
          {/* Home indicator */}
          <div aria-hidden="true" className="absolute inset-x-0 bottom-1.5 flex justify-center">
            <div className="h-1 w-20 rounded-full bg-white/40" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
