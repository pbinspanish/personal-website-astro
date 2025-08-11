document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const openIcon = mobileMenuButton.querySelector('[data-lucide="menu"]');
  const closeIcon = mobileMenuButton.querySelector('[data-lucide="x"]');

  mobileMenuButton.addEventListener("click", () => {
    const expanded =
      mobileMenuButton.getAttribute("aria-expanded") === "true" || false;
    mobileMenuButton.setAttribute("aria-expanded", !expanded);
    mobileMenu.classList.toggle("hidden");
    openIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");
  });
});
