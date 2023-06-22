import { useClerk } from "@clerk/clerk-react";
import Link from "next/link";
import { EmotionButton } from "./EmotionButton";
import { UserResource } from "@clerk/types";
import Logo from "./Logo";
import { useRouter } from "next/router";
import CalendarIcon from "../../public/calendar.svg";
import SettingsIcon from "../../public/settings.svg";

interface SidebarProps {
  user: UserResource;
  children?: React.ReactNode;
}

const SignOutButton = () => {
  const { signOut } = useClerk();
  return (
    <EmotionButton onClick={() => signOut()}>
      <h2>Sign out</h2>
    </EmotionButton>
  );
};

export const Sidebar = (props: SidebarProps) => {
  const router = useRouter();

  const isActive = (pathname: string): boolean => {
    if (router.pathname === pathname) {
      return true;
    }
    return false;
  };

  return (
    <div className="flex w-1/5 flex-col items-center gap-4 border-black bg-[#F1F6FF] p-5">
      <div className="my-10">
        <Logo />
      </div>
      <div>
        <EmotionButton isActive={isActive("/")}>
          <CalendarIcon />
          <Link href={`/`}>
            <h2>Calendar</h2>
          </Link>
        </EmotionButton>
        <EmotionButton isActive={isActive(`/analyze/[id]`)}>
          {/* change this to a different icon in the future */}
          <SettingsIcon />
          <Link href={`/analyze/${props.user.id}`}>
            <h2>Analyze</h2>
          </Link>
        </EmotionButton>

        <SignOutButton />
      </div>
      <div>{props.children}</div>
    </div>
  );
};
