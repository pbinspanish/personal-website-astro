import { useState, useEffect, useCallback } from "react";

import { SunMoon, ChevronDown, Check, Sun, Moon } from "lucide-react";

const THEME_STORAGE_KEY = "theme";
const THEME_OWNER = document.documentElement;

const ThemePicker = () => {
  const [theme, setTheme] = useState(() => {
    const cachedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (cachedTheme) {
      return cachedTheme;
    }
    // Determine initial auto theme if no cached theme
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Apply theme to documentElement whenever the theme state changes
  useEffect(() => {
    if (theme === "auto") {
      applyAutoTheme();
    } else {
      THEME_OWNER.dataset[THEME_STORAGE_KEY] = theme;
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }, [theme]);

  // Function to apply auto theme based on system preference
  const applyAutoTheme = useCallback(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      THEME_OWNER.dataset[THEME_STORAGE_KEY] = "dark";
    } else {
      THEME_OWNER.dataset[THEME_STORAGE_KEY] = "light";
    }
    localStorage.removeItem(THEME_STORAGE_KEY);
  }, []);

  // Effect for handling system theme preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = ({ matches }) => {
      console.log("theme changed by system preference");
      // Only update if the current theme is 'auto'
      if (localStorage.getItem(THEME_STORAGE_KEY) === null) {
        if (matches) {
          THEME_OWNER.dataset[THEME_STORAGE_KEY] = "dark";
        } else {
          THEME_OWNER.dataset[THEME_STORAGE_KEY] = "light";
        }
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Effect for handling clicks outside the theme menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      const themeMenu = document.getElementById("theme-menu");
      const themeMenuButton = document.getElementById("theme-menu-button");

      console.log("outside");

      if (
        themeMenu &&
        themeMenuButton &&
        !themeMenu.contains(event.target) &&
        !themeMenuButton.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const getSelectedThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-5 w-5" />;
      case "dark":
        return <Moon className="h-5 w-5" />;
      case "auto":
      default: // If theme is 'auto', we need to check the current applied dark/light
        return <SunMoon className="h-5 w-5" />;
    }
  };

  return (
    <div className="relative ms-4 flex items-stretch">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        type="button"
        className="inline-flex cursor-pointer items-center justify-center hover:text-cyan-400 hover:dark:text-cyan-600"
        id="theme-menu-button"
        aria-expanded="false"
        aria-haspopup="true"
      >
        <div className="inline h-5 w-5" id="selected-theme-icon">
          {getSelectedThemeIcon()}
        </div>
        <ChevronDown className="ms-1 inline h-4 w-4" />
      </button>
      <div
        id="theme-menu"
        className={
          (isMenuOpen ? "" : "hidden ") +
          "bg-base-50 dark:bg-base-900 absolute right-0 z-100 mt-10 min-w-32 rounded-md shadow-md"
        }
      >
        <fieldset id="theme-picker" className="flex flex-col py-2">
          <label className="hover:bg-base-150 dark:hover:bg-base-850 flex cursor-pointer items-center justify-start px-4 py-2 hover:text-cyan-400 hover:dark:text-cyan-600">
            <input
              className="hidden"
              name="theme"
              type="radio"
              value="auto"
              defaultChecked
              onChange={handleThemeChange}
            />
            <SunMoon className="me-2 h-4 w-4" />
            Auto
            <Check
              id="auto-check"
              className={
                theme === "auto"
                  ? "ms-auto h-4 w-4"
                  : "invisible ms-auto h-4 w-4"
              }
            />
          </label>
          <label className="hover:bg-base-150 dark:hover:bg-base-850 flex cursor-pointer items-center px-4 py-2 hover:text-cyan-400 hover:dark:text-cyan-600">
            <input
              className="hidden"
              name="theme"
              type="radio"
              value="light"
              onChange={handleThemeChange}
            />
            <Sun className="me-2 h-4 w-4" />
            Light
            <Check
              id="auto-check"
              className={
                theme === "light"
                  ? "ms-auto h-4 w-4"
                  : "invisible ms-auto h-4 w-4"
              }
            />
          </label>
          <label className="hover:bg-base-150 dark:hover:bg-base-850 flex cursor-pointer items-center px-4 py-2 hover:text-cyan-400 hover:dark:text-cyan-600">
            <input
              className="hidden"
              name="theme"
              type="radio"
              value="dark"
              onChange={handleThemeChange}
            />
            <Moon className="me-2 h-4 w-4" />
            Dark
            <Check
              id="auto-check"
              className={
                theme === "dark"
                  ? "ms-auto h-4 w-4"
                  : "invisible ms-auto h-4 w-4"
              }
            />
          </label>
        </fieldset>
      </div>
    </div>
  );
};

export default ThemePicker;

// on load
// read the stored theme value
// set the theme to match, or auto if there isn't one

// main button
// when clicked should toggle the state of the menu
// when the menu is open, clicking outside of it should close it

// theme buttons
// when clicked, should change the theme to the corresponding one
// for light and dark, set data-theme on the root html element to match
// and save the theme into local storage
// for auto, set data-theme to the current theme
// and delete the local storage key
