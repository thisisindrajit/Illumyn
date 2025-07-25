"use client";

import { NavigationItem } from "./NavigationItem";
import { HomeIcon, ExploreIcon, SavedIcon, CoursesIcon, ProfileIcon } from "../icons";

const navigationItems = [
  { href: "/", icon: <HomeIcon />, label: "Home" },
  { href: "/explore", icon: <ExploreIcon />, label: "Explore" },
  { href: "/saved", icon: <SavedIcon />, label: "Saved Items" },
  { href: "/courses", icon: <CoursesIcon />, label: "My Courses" },
  { href: "/profile", icon: <ProfileIcon />, label: "Profile" },
];

export const MainNavigation = () => {
  return (
    <nav className="space-y-1 w-full">
      {navigationItems.map((item) => (
        <NavigationItem
          key={item.href}
          href={item.href}
          icon={item.icon}
          label={item.label}
        />
      ))}
    </nav>
  );
};