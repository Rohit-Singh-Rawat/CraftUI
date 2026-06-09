"use client";

import "./gooey-search-bar.css";

import {
  useState,
  useRef,
  useEffect,
  useMemo,
  type ChangeEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Info, Loader2, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import useDebounce from "@/hooks/useDebounce";
import { isUnsupportedBrowser } from "@/utils/is-unsupported-browser";

const DEFAULT_SEARCH_DATA = [
  "Action Bar",
  "Animated Tabs",
  "Brave Search",
  "Clock",
  "Fluid Asset Preview",
  "Gooey Search Bar",
  "Navigation Compass",
  "Password Validation",
  "Scroll Timeline",
] as const;

const containerVariants = {
  initial: {},
  step1: {},
  step2: {},
};

const buttonVariants = {
  initial: { x: 0, width: 140 },
  step1: { x: 0, width: 140 },
  step2: { x: -30, width: 220 },
};

const iconVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 16, opacity: 1 },
};

function getResultItemVariants(index: number, isUnsupported: boolean) {
  return {
    initial: {
      y: 0,
      scale: 0.3,
      filter: isUnsupported ? "none" : "blur(10px)",
    },
    animate: {
      y: (index + 1) * 50,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: {
      y: isUnsupported ? 0 : -4,
      scale: 0.8,
      color: "#000000",
    },
  };
}

function getResultItemTransition(index: number) {
  return {
    duration: 0.75,
    delay: index * 0.12,
    type: "spring" as const,
    bounce: 0.35,
    exit: { duration: index * 0.1 },
    filter: { ease: "easeInOut" as const },
  };
}

export function GooeyFilter() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute">
      <defs>
        <filter id="goo-effect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -15"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}

export interface GooeySearchBarProps {
  placeholder?: string;
  searchData?: readonly string[];
  onSearch?: (query: string) => void;
  className?: string;
}

export function GooeySearchBar({
  placeholder = "Type to search…",
  searchData = DEFAULT_SEARCH_DATA,
  onSearch,
  className,
}: GooeySearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isUnsupported = useMemo(() => isUnsupportedBrowser(), []);
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion || isUnsupported;

  const [step, setStep] = useState<1 | 2>(1);
  const [searchText, setSearchText] = useState("");
  const [searchDataResults, setSearchDataResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchText = useDebounce(searchText, 500);

  const handleButtonClick = () => {
    setStep(2);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
    onSearch?.(value);
  };

  useEffect(() => {
    if (step === 2) {
      inputRef.current?.focus();
    } else {
      setSearchText("");
      setSearchDataResults([]);
      setIsLoading(false);
    }
  }, [step]);

  useEffect(() => {
    let isCancelled = false;

    if (debouncedSearchText) {
      setIsLoading(true);

      const fetchData = async () => {
        await new Promise((resolve) => window.setTimeout(resolve, 500));

        const filteredData = searchData.filter((item) =>
          item.toLowerCase().includes(debouncedSearchText.trim().toLowerCase()),
        );

        if (!isCancelled) {
          setSearchDataResults(filteredData);
          setIsLoading(false);
        }
      };

      void fetchData();
    } else {
      setSearchDataResults([]);
      setIsLoading(false);
    }

    return () => {
      isCancelled = true;
    };
  }, [debouncedSearchText, searchData]);

  return (
    <div
      className={cn(
        "gooey-search",
        (isUnsupported || prefersReducedMotion) && "gooey-search--no-goo",
        className,
      )}
    >
      <GooeyFilter />

      <div className="gooey-search__stage">
        <motion.div
          className="gooey-search__inner"
          variants={containerVariants}
          initial="initial"
          animate={step === 1 ? "step1" : "step2"}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.75, type: "spring", bounce: 0.15 }
          }
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key="search-text-wrapper"
              className="gooey-search__results"
              variants={buttonVariants}
              role="listbox"
              aria-label="Search results"
              exit={reduceMotion ? undefined : { scale: 0, opacity: 0 }}
              transition={{
                delay: reduceMotion ? 0 : isUnsupported ? 0.5 : 1.25,
                duration: reduceMotion ? 0 : 0.5,
              }}
            >
              <AnimatePresence mode="popLayout">
                {searchDataResults.map((item, index) => (
                  <motion.div
                    key={item}
                    whileHover={
                      reduceMotion ? undefined : { scale: 1.02, transition: { duration: 0.2 } }
                    }
                    variants={getResultItemVariants(index, reduceMotion)}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : getResultItemTransition(index)
                    }
                    className="gooey-search__result"
                    role="option"
                    aria-selected={false}
                  >
                    <div className="gooey-search__result-title">
                      <Info aria-hidden size={14} strokeWidth={2.25} />
                      <motion.span
                        initial={reduceMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          delay: reduceMotion ? 0 : index * 0.12 + 0.3,
                        }}
                      >
                        {item}
                      </motion.span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

          <motion.button
            type="button"
            variants={buttonVariants}
            onClick={handleButtonClick}
            whileHover={
              reduceMotion || step === 2 ? undefined : { scale: 1.05 }
            }
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
            className="gooey-search__btn active:scale-[0.96]"
            aria-label={step === 1 ? "Open search" : "Search"}
            aria-expanded={step === 2}
          >
            {step === 1 ? (
              <span className="gooey-search__btn-text">
                <Search aria-hidden size={14} strokeWidth={2.25} />
                Search
              </span>
            ) : (
              <input
                ref={inputRef}
                type="text"
                className="gooey-search__input"
                placeholder={placeholder}
                aria-label="Search input"
                onChange={handleSearch}
              />
            )}
          </motion.button>

          <AnimatePresence mode="wait">
            {step === 2 && (
              <motion.div
                key="icon"
                className="gooey-search__icon-blob"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={iconVariants}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        delay: 0.1,
                        duration: 0.85,
                        type: "spring",
                        bounce: 0.15,
                      }
                }
              >
                {!isLoading ? (
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: reduceMotion ? 0 : 360 }}
                    transition={{ duration: reduceMotion ? 0 : 1, ease: "easeInOut" }}
                  >
                    <Search aria-hidden size={14} strokeWidth={2.25} />
                  </motion.div>
                ) : (
                  <motion.div
                    animate={{ rotate: reduceMotion ? 0 : 360 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : {
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }
                    }
                  >
                    <Loader2 aria-hidden size={14} strokeWidth={2.25} />
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default GooeySearchBar;
