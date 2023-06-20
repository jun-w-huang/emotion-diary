import { useClerk } from "@clerk/clerk-react";
import Link from "next/link";
import { EmotionButton } from "./EmotionButton";
import { UserResource } from "@clerk/types";
import Logo from "./Logo";
import { useRouter } from "next/router";
import Calendar from "../../public/calendar.svg";
import Settings from "../../public/settings.svg";

interface SidebarProps {
  user: UserResource;
}

const SignOutButton = () => {
  const { signOut } = useClerk();
  return <EmotionButton onClick={() => signOut()}>Sign out</EmotionButton>;
};

export const Sidebar = (props: SidebarProps) => {
  const router = useRouter();

  const isActive = (pathname: string) => {
    return router.pathname === pathname;
  };

  return (
    <div className="flex w-1/5 flex-col items-center gap-4 border-black bg-[#F1F6FF] p-5">
      <div className="my-10">
        <Logo />
      </div>
      <EmotionButton isActive={isActive("/")} icon={Calendar}>
        <Link href={`/`}>Calendar</Link>
      </EmotionButton>
      <EmotionButton isActive={isActive(`/analyze/[id]`)} icon={Settings}>
        <Link href={`/analyze/${props.user.id}`}>Analyze</Link>
      </EmotionButton>

      <SignOutButton />
    </div>
  );
};
