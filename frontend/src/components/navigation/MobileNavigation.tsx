"use client";

import { NavigationItem } from "./NavigationItem";
import { HomeIcon, ExploreIcon, SavedIcon, CoursesIcon, ProfileIcon } from "../icons";

const navigationItems = [
  { href: "/", icon: <HomeIcon />, label: "Home" },
  { href: "/explore", icon: <ExploreIcon />, label: "Explore" },
  { href: "/saved", icon: <SavedIcon />, label: "Saved" },
  { href: "/courses", icon: <CoursesIcon />, label: "Courses" },
  { href: "/profile", icon: <ProfileIcon />, label: "Profile" },
];

export const MobileNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border md:hidden z-50">
      <nav className="flex justify-around items-center py-2">
        {navigationItems.map((item) => (
          <NavigationItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            variant="mobile"
          />
        ))}
      </nav>
    </div>
  );
};