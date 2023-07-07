import { useClerk } from "@clerk/clerk-react";
import Link from "next/link";
import { UserResource } from "@clerk/types";
import Logo from "./Logo";
import { useRouter } from "next/router";
import CalendarIcon from "../../public/calendar.svg";
import SettingsIcon from "../../public/settings.svg";
import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

interface SidebarProps {
  user: UserResource;
  children?: React.ReactNode;
}

interface SidebarNavItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  isActive?: boolean;
  icon?: ReactNode;
}

const SidebarNavItem = forwardRef<HTMLButtonElement, SidebarNavItemProps>(
  ({ isActive, ...props }, ref) => (
    <button
      className={`flex h-12 w-32 flex-row items-center gap-2 rounded-lg pl-2 ${
        isActive ? "bg-white text-emotionDarkBlue" : "text-emotionGray"
      }`}
      {...props}
      ref={ref}
    >
      {props.icon ? props.icon : undefined}
      <h2>{props.children}</h2>
    </button>
  )
);

export const Sidebar = (props: SidebarProps) => {
  const router = useRouter();
  const { signOut } = useClerk();

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
        <SidebarNavItem isActive={isActive("/")} icon={<CalendarIcon />}>
          <Link href={`/`}>Calendar</Link>
        </SidebarNavItem>
        {/* change this to a different icon in the future */}
        <SidebarNavItem
          isActive={isActive(`/analyze/[id]`)}
          icon={<SettingsIcon />}
        >
          <Link href={`/analyze/${props.user.id}`}>Analyze</Link>
        </SidebarNavItem>
        <SidebarNavItem onClick={() => signOut()}>Sign out</SidebarNavItem>
      </div>
      <div className="w-full">{props.children}</div>
    </div>
  );
};
