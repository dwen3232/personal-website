import Link from "next/link";
import ScrollTopBar from "@/components/ScrollSheet/ScrollTopBar";
import WoodBackground from "@/components/WoodBackground";

/** Every blog page: the desk, the scroll bar, and one long sheet of notebook paper in the cover */
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <WoodBackground />
      <ScrollTopBar homeHref="/">
        <Link href="/blog" className="font-hand text-[16px] text-[#f5efe4]/80 underline-offset-4 hover:underline">
          blog
        </Link>
      </ScrollTopBar>
      <div className="book-cover mx-auto mb-[64px] mt-[72px] w-[min(760px,calc(100%-24px))] rounded-[14px] p-[10px]">
        <main className="flow-sheet rounded-[6px] px-[clamp(20px,6vw,64px)] py-[clamp(28px,6vw,60px)] text-ink">
          {children}
        </main>
      </div>
    </div>
  );
}
