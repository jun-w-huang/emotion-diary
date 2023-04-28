import { SignOutButton, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { ReactNode } from "react";
import { EmotionButton } from "./EmotionButton";
import { UserResource } from "@clerk/types";

interface SidebarProps {
  children?: ReactNode;
  user: UserResource | null | undefined;

  // Will remove these in future.
  isSignedIn : boolean;
  isShowingModal? : (b : boolean) => void;


}

export const Sidebar = (props: SidebarProps) => {
  return (
    <div className="flex justify-center p-5 flex-col items-center gap-4 w-1/5">
        <h1 className="py-5 text-black text-5xl">
            Emotion Diary
        </h1>
        {props.isShowingModal && <EmotionButton onClick={() => props.isShowingModal!(true)}>Add event</EmotionButton>}
        <EmotionButton>
          <Link href={`/analyze/${props.user?.id}`}>View Data analysis</Link>
        </EmotionButton>
        <EmotionButton>
          {props.isSignedIn ? <SignOutButton /> : <SignInButton />}
        </EmotionButton>
    </div>
  );
};
