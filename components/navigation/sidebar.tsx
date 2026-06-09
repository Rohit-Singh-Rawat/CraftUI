"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import Logo from "@/components/navigation/logo";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
}

interface NavSection {
  title: string;
  links: NavLink[];
}

interface SidebarProps {
  navigationData: NavSection[];
}

function SectionDivider() {
  return (
    <>
      <span className="bg-foreground/20 block h-px mt-2 w-[32px] transition-all duration-300" />
      <span className="bg-foreground/20 block h-px w-[32px] mt-2 transition-all duration-300" />
      <span className="bg-foreground/20 block h-px w-[32px] mt-2 transition-all duration-300" />
      <span className="bg-foreground/20 block h-px w-[32px] my-2 transition-all duration-300" />
    </>
  );
}

function SectionTitle({
  title,
  sectionIndex,
  isMobile = false,
  reduceMotion = false,
}: {
  title: string;
  sectionIndex: number;
  isMobile?: boolean;
  reduceMotion?: boolean;
}) {
  const delayMultiplier = isMobile ? 0.05 : 0.1;
  const baseDelay = isMobile ? 0.1 : 0.2;
  const duration = isMobile ? 0.2 : 0.3;
  const animateLines = isMobile && !reduceMotion;

  return (
    <>
      <div className="group relative flex h-px cursor-default items-center gap-3 mb-2">
        {animateLines ? (
          <motion.span
            className="bg-foreground inline-block h-[1px]"
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{
              duration: 0.3,
              delay: sectionIndex * delayMultiplier + baseDelay,
              ease: "easeOut",
            }}
          />
        ) : (
          <span className="bg-foreground inline-block h-px w-[32px]" />
        )}
        <span
          className={cn(
            "whitespace-nowrap text-foreground font-medium",
            isMobile && "opacity-100",
            !isMobile &&
              "max-w-0 overflow-hidden opacity-0 pl-0 group-hover/sidebar:max-w-none group-hover/sidebar:overflow-visible group-hover/sidebar:opacity-100 group-hover/sidebar:pl-0 transition-[opacity,max-width] duration-500 ease-out",
          )}
        >
          {title}
        </span>
      </div>
      {animateLines ? (
        <>
          <motion.span
            className="block h-[1px] w-[32px] mb-2 bg-foreground/50"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration,
              delay: sectionIndex * delayMultiplier + baseDelay,
            }}
            style={{ transformOrigin: "left" }}
          />
          <motion.span
            className="block h-[1px] w-[32px] bg-foreground/50"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration,
              delay: sectionIndex * delayMultiplier + baseDelay,
            }}
            style={{ transformOrigin: "left" }}
          />
        </>
      ) : (
        <>
          <span className="bg-foreground/20 block h-px w-[32px] mb-2" />
          <span className="bg-foreground/20 block h-px w-[32px]" />
        </>
      )}
    </>
  );
}

function NavLinkItem({
  link,
  sectionIndex,
  linkIndex,
  isMobile = false,
  hoveredLink,
  setHoveredLink,
  onClick,
  currentPath,
  reduceMotion = false,
}: {
  link: NavLink;
  sectionIndex: number;
  linkIndex: number;
  isMobile?: boolean;
  hoveredLink: string | null;
  setHoveredLink: (href: string | null) => void;
  onClick?: () => void;
  currentPath: string;
  reduceMotion?: boolean;
}) {
  const delayMultiplier = isMobile ? 0.05 : 0.1;
  const linkDelayMultiplier = isMobile ? 0.03 : 0.05;
  const baseDelay = isMobile ? 0.2 : 0.3;
  const duration = isMobile ? 0.2 : 0.3;
  const isCurrent = currentPath === link.href;
  const animateLines = isMobile && !reduceMotion;

  return (
    <motion.div
      key={link.href}
      initial={isMobile && !reduceMotion ? { opacity: 0, x: -10 } : false}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration,
        delay:
          sectionIndex * delayMultiplier +
          linkIndex * linkDelayMultiplier +
          baseDelay,
        ease: "easeOut",
      }}
    >
      <Link
        href={link.href}
        className="group relative flex h-px cursor-pointer items-center py-2"
        onMouseEnter={() => !isMobile && setHoveredLink(link.href)}
        onMouseLeave={() => !isMobile && setHoveredLink(null)}
        onClick={onClick}
      >
        <span
          className={cn(
            "inline-block h-px bg-foreground/20 transition-all duration-300 ease-in-out",
            !isMobile && "group-hover:bg-orange-500",
            isCurrent && "bg-orange-500 w-[55px]",
            isMobile && !isCurrent && "w-[32px] bg-foreground/50",
            !isMobile && (hoveredLink === link.href || isCurrent) && "w-[55px]",
            !isMobile &&
              !(hoveredLink === link.href || isCurrent) &&
              "w-[32px]",
          )}
        />
        <span
          className={cn(
            "whitespace-nowrap flex items-center gap-2 transition-[opacity,max-width,padding] duration-500 ease-out",
            isMobile ? "opacity-100 pl-3" : "max-w-0 overflow-hidden opacity-0 pl-0 group-hover/sidebar:max-w-none group-hover/sidebar:overflow-visible group-hover/sidebar:pl-3",
            !isMobile && isCurrent && "text-orange-500 group-hover/sidebar:opacity-100",
            !isMobile && !isCurrent && "group-hover/sidebar:opacity-40 group-hover:text-orange-500 group-hover:opacity-100",
            isMobile && isCurrent && "text-orange-500",
          )}
        >
          {link.label}
        </span>
      </Link>
      {animateLines ? (
        <>
          <motion.span
            className="bg-foreground/50 block h-[1px] w-[32px] mb-2"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration,
              delay:
                sectionIndex * delayMultiplier +
                linkIndex * linkDelayMultiplier +
                baseDelay,
            }}
            style={{ transformOrigin: "left" }}
          />
          <motion.span
            className="bg-foreground/50 block h-[1px] w-[32px]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration,
              delay:
                sectionIndex * delayMultiplier +
                linkIndex * linkDelayMultiplier +
                baseDelay,
            }}
            style={{ transformOrigin: "left" }}
          />
        </>
      ) : (
        <>
          <span className="bg-foreground/20 block h-px w-[32px] mb-2" />
          <span className="bg-foreground/20 block h-px w-[32px]" />
        </>
      )}
    </motion.div>
  );
}

function NavigationSection({
  section,
  sectionIndex,
  isMobile = false,
  hoveredLink,
  setHoveredLink,
  onLinkClick,
  currentPath,
  isLastSection = false,
  reduceMotion = false,
}: {
  section: NavSection;
  sectionIndex: number;
  isMobile?: boolean;
  hoveredLink: string | null;
  setHoveredLink: (href: string | null) => void;
  onLinkClick?: () => void;
  currentPath: string;
  isLastSection?: boolean;
  reduceMotion?: boolean;
}) {
  return (
    <motion.div
      key={section.title}
      initial={isMobile && !reduceMotion ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: isMobile ? 0.3 : 0.5,
        delay: sectionIndex * (isMobile ? 0.05 : 0.1),
        ease: "easeOut",
      }}
    >
      <SectionTitle
        title={section.title}
        sectionIndex={sectionIndex}
        isMobile={isMobile}
        reduceMotion={reduceMotion}
      />

      {section.links.map((link, linkIndex) => (
        <NavLinkItem
          key={link.href}
          link={link}
          sectionIndex={sectionIndex}
          linkIndex={linkIndex}
          isMobile={isMobile}
          hoveredLink={hoveredLink}
          setHoveredLink={setHoveredLink}
          onClick={onLinkClick}
          currentPath={currentPath}
          reduceMotion={reduceMotion}
        />
      ))}

      {!isLastSection && <SectionDivider />}
    </motion.div>
  );
}

function MobileMenuButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group fixed top-[calc(var(--archived-banner-height)+1.5rem)] left-6 z-50 md:hidden p-2 rounded-2xl bg-foreground/5 backdrop-blur-md hover:bg-foreground/10 transition-colors duration-200 ease-out"
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation"
    >
      <svg
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
      >
        <path
          d={isOpen ? "M6 18L18 6" : "M3 5H11"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={isOpen ? "M6 6L18 18" : "M3 12H16"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 19H21"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: isOpen ? 0 : 1 }}
        />
      </svg>
    </button>
  );
}

function Overlay({
  isVisible,
  onClick,
  isMobile = false,
}: {
  isVisible: boolean;
  onClick?: () => void;
  isMobile?: boolean;
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: isMobile ? 0.3 : 0.5 }}
          className={cn(
            "fixed inset-0 backdrop-blur-md",
            isMobile
              ? "bg-background/95 z-30 md:hidden"
              : "bg-background/80 pointer-events-none z-30 hidden md:block",
          )}
          onClick={onClick}
        />
      )}
    </AnimatePresence>
  );
}

export function Sidebar({ navigationData }: SidebarProps) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <>
      <MobileMenuButton
        isOpen={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <Overlay
        isVisible={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen(false)}
        isMobile={true}
      />

      <Overlay isVisible={isSidebarHovered} isMobile={false} />

      {/* Desktop Sidebar */}
      <motion.aside
        initial={reduceMotion ? false : { x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "group/sidebar fixed top-[var(--archived-banner-height)] left-2 z-40 hidden h-[calc(100dvh-var(--archived-banner-height))] p-4 pl-2 pr-2 transition-[width] duration-300 ease-out md:block",
          isSidebarHovered ? "w-[300px]" : "w-[150px]",
        )}
        onMouseEnter={() => {
          setIsSidebarHovered(true);
        }}
        onMouseLeave={() => setIsSidebarHovered(false)}
      >
        <Link href="/" className="flex mt-[5vh] pl-2 gap-4 items-center">
          <Logo className="w-10 h-10" />
          <span className="text-2xl font-light max-w-0 overflow-hidden opacity-0 font-serif transition-[opacity,max-width] duration-300 ease-out group-hover/sidebar:max-w-none group-hover/sidebar:overflow-visible group-hover/sidebar:opacity-100">
            Crafts
          </span>
        </Link>
        <motion.div className="relative flex h-full w-full overflow-x-hidden overflow-y-scroll pl-3 pr-3 text-[15px] tracking-tight scrollbar-hide pb-[15vh] mt-[5vh] pt-[1vh]">
          <div className="relative flex h-fit w-full flex-col">
            {navigationData.map((section, sectionIndex) => (
              <NavigationSection
                key={section.title}
                section={section}
                sectionIndex={sectionIndex}
                isMobile={false}
                hoveredLink={hoveredLink}
                setHoveredLink={setHoveredLink}
                currentPath={pathname}
                isLastSection={sectionIndex === navigationData.length - 1}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </motion.div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed left-0 top-[var(--archived-banner-height)] z-30 h-[calc(100dvh-var(--archived-banner-height))] max-w-[400px] p-4 md:hidden w-full"
          >
            <div className="bg-muted rounded-3xl p-4 h-full w-full overflow-hidden">
              <Link href="/" className="flex mt-[5vh] pl-2 gap-4 items-center">
                <Logo className="w-10 h-10" />
                <span className="text-2xl font-light font-serif">
                  Crafts
                </span>
              </Link>
              <motion.div className="relative flex h-full w-full overflow-x-hidden overflow-y-scroll pl-3 pr-3 text-[15px] tracking-tight scrollbar-hide pb-[15vh] mt-[5vh] pt-[1vh]">
                <div className="relative flex h-fit w-full flex-col">
                  {navigationData.map((section, sectionIndex) => (
                    <NavigationSection
                      key={section.title}
                      section={section}
                      sectionIndex={sectionIndex}
                      isMobile={true}
                      hoveredLink={hoveredLink}
                      setHoveredLink={setHoveredLink}
                      onLinkClick={() => setIsMobileMenuOpen(false)}
                      currentPath={pathname}
                      isLastSection={sectionIndex === navigationData.length - 1}
                      reduceMotion={reduceMotion}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
