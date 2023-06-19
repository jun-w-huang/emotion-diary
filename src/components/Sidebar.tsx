import { SignOutButton, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { ReactNode } from "react";
import { EmotionButton } from "./EmotionButton";
import { UserResource } from "@clerk/types";
import Logo from "./Logo";

interface SidebarProps {
  children?: ReactNode;
  user: UserResource | null | undefined;

  // Will refactor these in future.
  isHome?: boolean;
}

export const Sidebar = (props: SidebarProps) => {
  return (
    <div className="flex w-1/5 flex-col items-center justify-center gap-4 p-5 border border-black">
      <Logo/>
      {props.isHome && props.user ? <EmotionButton>
        <Link href={`/analyze/${props.user.id}`}>View Data analysis</Link>
      </EmotionButton> : <EmotionButton>
        <Link href={`/`}>Home</Link>
      </EmotionButton>}
      
      <div className="flex h-12 w-48 items-center justify-center rounded-lg border bg-slate-500 text-white">
        <SignOutButton />
      </div>
    </div>
  );
};
