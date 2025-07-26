document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;

    // For local hash links (e.g., <a href="#section">)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId && targetId.startsWith("#")) {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const yOffset = -80; // 🔧 Adjust this to your header height
                    const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;

                    window.scrollTo({ top: y, behavior: "smooth" });
                }
            }
        });
    });

    // For same-page full path links (e.g., <a href="/page#section">)
    document.querySelectorAll(a[href^="${currentPath}#"]).forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const hashIndex = this.href.indexOf("#");
            const targetId = this.href.slice(hashIndex);
            const target = document.querySelector(decodeURIComponent(targetId));
            if (target) {
                e.preventDefault();
                const yOffset = -80; // 🔧 Adjust this to your header height
                const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;

                window.scrollTo({ top: y, behavior: "smooth" });
            }
       });
});
});
