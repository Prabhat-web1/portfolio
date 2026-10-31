/*
  Portfolio behaviour.
  Needs js/icons.js (ICONS) and js/data.js (SKILL_GROUPS, TECH, CERTIFICATES) loaded first.

  1. Skills page          5. Page wipe + load sequence
  2. Project tech dots    6. Header, mobile menu
  3. Certificates page    7. Copy email button
  4. Page routing         8. Reduced-motion fix for the map dot
*/
(function () {
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);
  const prefersReducedMotion = matchMedia("(prefers-reduced-motion:reduce)").matches;

  /* ---------- 1. Skills page ---------- */

  function skillTile(name) {
    const tech = TECH[name];
    const icon = ICONS[name] || tech.mono; // no official icon available -> monogram
    return (
      '<div class="tile" style="--c:' + tech.color + '">' +
      '<span class="ic" aria-hidden="true">' + icon + "</span>" + name + "</div>"
    );
  }

  function renderSkills() {
    $("#skg").innerHTML = SKILL_GROUPS.map(function (group) {
      return (
        '<div class="skc"><h3>' + group.title + '</h3><div class="tiles">' +
        group.items.map(skillTile).join("") +
        "</div></div>"
      );
    }).join("");
  }

  /* ---------- 2. Colored dot on each project technology chip ---------- */

  function colorProjectChips() {
    $$(".chips span").forEach(function (chip) {
      const name = chip.textContent;
      const isJavaPart = name === "Java Swing" || name === "AWT";
      const tech = TECH[name] || (isJavaPart ? TECH.Java : null);
      if (tech) chip.style.setProperty("--c", tech.color);
    });
  }

  /* ---------- 3. Certificates page ---------- */

  const certGrid = $("#cg");
  const lightbox = $("#lb");

  function certCard(cert, index) {
    return (
      '<button class="cd" data-k="' + cert.category + '" data-x="' + index + '">' +
      '<div class="im"><img loading="lazy" alt="Certificate: ' + cert.title +
      '" src="' + cert.image + '"></div>' +
      "<h3>" + cert.title + "</h3><p>" + cert.issuer + "</p>" +
      (cert.date ? '<p class="dt">' + cert.date + "</p>" : "") +
      "</button>"
    );
  }

  function openLightbox(cert) {
    const image = lightbox.querySelector("img");
    image.src = cert.image;
    image.alt = "Certificate: " + cert.title;
    lightbox.querySelector("h3").textContent = cert.title;
    lightbox.querySelector(".o").textContent = cert.issuer + (cert.date ? " · " + cert.date : "");
    lightbox.querySelector(".n").textContent = cert.note;
    lightbox.showModal();
  }

  function setupCertificates() {
    certGrid.innerHTML = CERTIFICATES.map(certCard).join("");

    // click a card -> large preview
    certGrid.addEventListener("click", function (e) {
      const card = e.target.closest(".cd");
      if (card) openLightbox(CERTIFICATES[card.dataset.x]);
    });

    // click the dark backdrop or the X -> close
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target.className === "lbx") lightbox.close();
    });

    // category filter buttons
    $(".flt").addEventListener("click", function (e) {
      const button = e.target.closest("button");
      if (!button) return;
      e.currentTarget.querySelectorAll("button").forEach(function (b) {
        b.classList.toggle("on", b === button);
      });
      certGrid.querySelectorAll(".cd").forEach(function (card) {
        card.hidden = !(button.dataset.f === "all" || card.dataset.k === button.dataset.f);
      });
    });
  }

  /* ---------- 4. Page routing (#/about, #/projects, ...) ---------- */

  // route name -> id of the <section> to show
  const SECTION_FOR_ROUTE = {
    "": "hero",
    about: "about",
    experience: "experience",
    projects: "work",
    skills: "stack",
    certificates: "certs",
    contact: "contact"
  };
  const TITLE_FOR_ROUTE = {
    "": "Full-stack developer",
    about: "About",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    certificates: "Certificates",
    contact: "Contact"
  };
  const navLinks = Array.from($$("nav ul a"));

  // Adds the "in" class when an element scrolls into view (starts its reveal)
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  function observeRevealElements() {
    $$(".rv:not(.in)").forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  // Shows the section for the current URL hash
  function route() {
    let name = location.hash.replace(/^#\/?/, "");
    if (!(name in SECTION_FOR_ROUTE)) name = "";
    const activeId = SECTION_FOR_ROUTE[name];

    $$("main>section").forEach(function (section) {
      const isActive = section.id === activeId;
      section.hidden = !isActive;
      section.classList.remove("pg");
      if (isActive) {
        void section.offsetWidth; // restart the page fade-in animation
        section.classList.add("pg");
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle("cur", link.dataset.r === name);
    });
    // The hero heading reveals with a clip-path wipe. A fully clipped element is
    // never reported as "visible" by the observer, so the heading is started here.
    if (activeId === "hero") $(".hero h1").classList.add("in");

    document.title = "Prabhat Nanda | " + TITLE_FOR_ROUTE[name];
    scrollTo(0, 0);
    setTimeout(observeRevealElements, 30);
  }

  /* ---------- 5. Page wipe + load sequence ---------- */

  const wipe = $("#wipe");
  const root = document.documentElement;
  let wipeBusy = false;
  let navigationWaiting = false;

  // Marks elements for scroll reveal. "rv" = fade + slide, "shp" = shape reveal.
  function addRevealClasses(selector, classes, delayFor) {
    $$(selector).forEach(function (el, index) {
      el.classList.add(...classes.split(" "));
      if (delayFor) el.style.setProperty("--x", delayFor(index) + "s");
    });
  }

  // Sets the stagger delay (seconds) of one hero element
  function setDelay(selector, seconds) {
    const el = $(selector);
    if (el) el.style.setProperty("--x", seconds + "s");
  }

  function setupRevealClasses() {
    addRevealClasses(".facts,.edu,.skc,.tl article,.soft,.qk", "rv");
    addRevealClasses(".vis,.ct", "rv shp");
    addRevealClasses(".map", "shp");
    addRevealClasses(".cd", "rv shp", function (index) { return index * 0.07; });

    // hero sequence: label, heading, intro, buttons, map, quick links
    setDelay(".who", 0.05);
    setDelay(".hero h1", 0.2);
    setDelay(".hero .lead", 0.35);
    setDelay(".hero .cta", 0.5);
    setDelay(".map", 0.6);
    setDelay(".qk", 0.75);
  }

  function wipeFinished() {
    wipeBusy = false;
    root.style.setProperty("--lag", "0s"); // after load, content no longer waits for the wipe
    if (navigationWaiting) {
      navigationWaiting = false;
      navigate();
    }
  }

  // Page change: wipe covers the screen, swap the page, wipe uncovers it
  function navigate() {
    if (prefersReducedMotion) {
      route();
      return;
    }
    if (wipeBusy) {
      navigationWaiting = true;
      return;
    }
    wipeBusy = true;
    wipe.className = "rdy in";
    setTimeout(function () {
      route();
      wipe.className = "rdy out";
      setTimeout(function () {
        wipe.className = "rdy";
        wipeFinished();
      }, 440);
    }, 330);
  }

  function setupFirstLoadWipe() {
    root.style.setProperty("--lag", prefersReducedMotion ? "0s" : ".55s");
    if (prefersReducedMotion) return;

    wipeBusy = true;
    wipe.addEventListener(
      "animationend",
      function () {
        wipe.className = "rdy";
        wipeFinished();
      },
      { once: true }
    );
    // safety net in case the animationend event never arrives
    setTimeout(function () {
      if (wipeBusy && wipe.className !== "rdy") {
        wipe.className = "rdy";
        wipeFinished();
      }
    }, 1600);
  }

  /* ---------- 6. Header (border + scroll bar) and mobile menu ---------- */

  function setupHeader() {
    const header = $("header");
    const progressBar = $("#bar");

    function onScroll() {
      header.classList.toggle("on", scrollY > 8);
      const scrollable = document.documentElement.scrollHeight - innerHeight;
      progressBar.style.width = (scrollable > 0 ? (scrollY / scrollable) * 100 : 0) + "%";
    }
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function setupMobileMenu() {
    const toggle = $(".tg");
    const menu = $("#menu");

    toggle.addEventListener("click", function () {
      const isOpen = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen);
    });
    // close the menu after choosing a page
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", false);
      }
    });
  }

  /* ---------- 7. Copy email button ---------- */

  function setupCopyEmail() {
    const button = $("#copy");
    const email = "prabhatknanda.1234@gmail.com";

    button.addEventListener("click", function () {
      const copied = navigator.clipboard ? navigator.clipboard.writeText(email) : Promise.reject();
      copied.then(
        function () { button.textContent = "Copied"; },
        function () { button.textContent = "Press Ctrl+C on the address above"; }
      );
      setTimeout(function () { button.textContent = "Copy email"; }, 2200);
    });
  }

  /* ---------- 8. Reduced motion: park the map dot at the route end ---------- */

  function fixMapDotForReducedMotion() {
    if (!prefersReducedMotion) return;
    const dot = $("#dot");
    if (!dot) return;
    dot.querySelectorAll("animate,animateMotion").forEach(function (animation) {
      animation.remove();
    });
    dot.setAttribute("opacity", "1");
    dot.setAttribute("cx", "400");
    dot.setAttribute("cy", "50");
  }

  /* ---------- Start (same order as before) ---------- */

  renderSkills();
  colorProjectChips();
  setupCertificates();
  setupRevealClasses();
  setupFirstLoadWipe();
  addEventListener("hashchange", navigate);
  route();
  setupHeader();
  setupMobileMenu();
  setupCopyEmail();
  fixMapDotForReducedMotion();
})();
