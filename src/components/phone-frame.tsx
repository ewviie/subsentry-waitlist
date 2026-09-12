import Image from "next/image";

// A stylized iPhone-style bezel around a real app screenshot — the "phone
// thingy" from the reference. The screenshot itself is a genuine crop of
// the live app's Subscriptions page (see public/app-mobile-preview.jpg's
// source note in the README), not a fabricated mockup.
export function PhoneFrame() {
  return (
    <div className="relative mx-auto w-[210px] sm:w-[225px] lg:mx-0 lg:ml-auto lg:w-[240px]">
      <div className="relative rounded-[2.1rem] bg-neutral-900 p-2.5 shadow-2xl shadow-black/30">
        {/* Side buttons */}
        <span aria-hidden="true" className="absolute -left-[3px] top-16 h-6 w-[3px] rounded-l-sm bg-neutral-800" />
        <span aria-hidden="true" className="absolute -left-[3px] top-24 h-10 w-[3px] rounded-l-sm bg-neutral-800" />
        <span aria-hidden="true" className="absolute -right-[3px] top-20 h-12 w-[3px] rounded-r-sm bg-neutral-800" />

        <div className="relative overflow-hidden rounded-[1.6rem] bg-black">
          <Image
            src="/app-mobile-preview.jpg"
            alt="The SubSentry subscriptions list on a phone — Adobe Creative Cloud flagged as high cost"
            width={780}
            height={1208}
            priority
            className="w-full"
          />
          {/* Notch */}
          <div aria-hidden="true" className="absolute inset-x-0 top-0 flex justify-center">
            <div className="h-4 w-16 rounded-b-xl bg-black" />
          </div>
          {/* Home indicator */}
          <div aria-hidden="true" className="absolute inset-x-0 bottom-1 flex justify-center">
            <div className="h-[3px] w-16 rounded-full bg-white/40" />
          </div>
        </div>
      </div>
    </div>
  );
}
