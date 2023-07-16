import { useClerk } from "@clerk/clerk-react";
import Link from "next/link";
import { UserResource } from "@clerk/types";
import Logo from "./Logo";
import { useRouter } from "next/router";
import CalendarIcon from "../../public/calendar.svg";
import AnalyzeIcon from "../../public/analyze.svg";
import SignOutIcon from "../../public/sign_out.svg";
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
        isActive
          ? "bg-white stroke-emotionDarkBlue text-emotionDarkBlue"
          : "stroke-emotionGray text-emotionGray"
      }`}
      {...props}
      ref={ref}
    >
      <div className={`${isActive ? "text-white" : ""} w-5`}>
        {props.icon ? props.icon : undefined}
      </div>
      <h2>{props.children}</h2>
    </button>
  )
);

SidebarNavItem.displayName = "SidebarNavItem";

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
    <div className="flex w-1/5 min-w-[200px] grow flex-col items-center gap-4 border-black bg-emotionSidebarBlue p-5">
      <div className="my-10">
        <Logo />
      </div>
      <div>
        <SidebarNavItem
          isActive={isActive("/")}
          icon={
            // Calendar SVG color is modified by its fill properties
            <CalendarIcon
              className={`${
                isActive("/") ? "text-emotionDarkBlue" : "text-emotionGray"
              }`}
            />
          }
        >
          <Link href={`/`}>Calendar</Link>
        </SidebarNavItem>
        {/* change this to a different icon in the future */}
        <SidebarNavItem
          isActive={isActive(`/analyze/[id]`)}
          icon={
            // Analyze SVG color is modified by its path properties
            // The text CSS modifies the background fill of the SVG.
            <AnalyzeIcon
              className={`origin-left scale-50 text-emotionSidebarBlue`}
            />
          }
        >
          <Link href={`/analyze/${props.user.id}`}>Analyze</Link>
        </SidebarNavItem>
        <SidebarNavItem
          onClick={() => signOut()}
          icon={<SignOutIcon className="origin-left scale-50" />}
        >
          Sign out
        </SidebarNavItem>
      </div>
      <div className="flex w-full">{props.children}</div>
    </div>
  );
};
