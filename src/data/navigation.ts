export interface NavItem {
  href: string;
  label: string;
  icon: string;
}

export const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: "/icons/heart.svg" },
  { href: "/dashboard", label: "Dashboard", icon: "/icons/checklist.svg" },
  { href: "/learn", label: "Learn", icon: "/icons/book.svg" },
  { href: "/interactive", label: "Interactive", icon: "/icons/gamepad.svg" },
  { href: "/tools", label: "Tools", icon: "/icons/tools.svg" },
  { href: "/about", label: "About", icon: "/icons/info.svg" },
  { href: "/contact", label: "Contact", icon: "/icons/mail.svg" },
];
