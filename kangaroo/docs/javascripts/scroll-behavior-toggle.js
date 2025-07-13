document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId && targetId.startsWith("#")) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  document.querySelectorAll(a[href*="${currentPath}#"]).forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const hashIndex = this.href.indexOf("#");
      const targetId = this.href.slice(hashIndex);
      const target = document.querySelector(decodeURIComponent(targetId));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
 });
});
});
