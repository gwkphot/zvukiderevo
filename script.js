/* =========================================================
PILIM И PILIM
Optimized JS
========================================================= */


/* =========================================================
INIT
========================================================= */


/* =========================================================
UTILS
========================================================= */

function isMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
}


/*
    Универсальный observer для появления элементов.

    В отличие от ScrollTrigger он не зависит от sticky-позиции
    карточки. Элемент действительно должен попасть в viewport,
    после чего анимация запускается один раз.
*/

function observeOnce(elements, callback, options = {}) {

    if (!elements || !elements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            callback(entry.target);

            obs.unobserve(entry.target);

        });

    }, {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? "0px 0px -10% 0px"
    });

    elements.forEach(element => observer.observe(element));
}


/* =========================================================
HERO
========================================================= */

function initHero() {

    const hero = document.querySelector(".hero-title");

    if (!hero) return;


    /*
        Не трогаем HTML повторно, если буквы уже были
        преобразованы предыдущим запуском.
    */

    if (!hero.querySelector(".hero-letter")) {

        const walker = document.createTreeWalker(
            hero,
            NodeFilter.SHOW_TEXT
        );

        const textNodes = [];

        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }


        textNodes.forEach(node => {

            const fragment =
                document.createDocumentFragment();


            [...node.textContent].forEach(char => {

                if (char === " ") {

                    fragment.appendChild(
                        document.createTextNode(" ")
                    );

                    return;
                }


                const wrap =
                    document.createElement("span");

                wrap.className =
                    "hero-letter-wrap";


                const letter =
                    document.createElement("span");

                letter.className =
                    "hero-letter";

                letter.textContent =
                    char;


                wrap.appendChild(letter);

                fragment.appendChild(wrap);

            });


            node.replaceWith(fragment);

        });

    }


    const letters =
        hero.querySelectorAll(".hero-letter");


    if (!letters.length) return;


    /*
        Герой появляется сразу после загрузки.
        Здесь observer не нужен.
    */

    gsap.set(letters, {
        yPercent: 110
    });


    gsap.to(letters, {

        yPercent: 0,

        duration: 0.9,

        stagger: 0.045,

        ease: "power4.out"

    });

}


/* =========================================================
MANIFEST
========================================================= */

function initManifest() {

    const block =
        document.querySelector(".manifest-block");


    if (!block) return;


    /*
        Разбиваем строки на слова и буквы.
    */

    block.querySelectorAll(".line").forEach(line => {

        /*
            Защита от повторного преобразования.
        */

        if (line.querySelector(".manifest-letter")) {
            return;
        }


        const text =
            line.textContent.trim();


        const fragment =
            document.createDocumentFragment();


        const words =
            text.split(/\s+/);


        words.forEach((word, index) => {

            const wordWrap =
                document.createElement("span");

            wordWrap.className =
                "manifest-word";

            wordWrap.style.display =
                "inline-block";


            [...word].forEach(char => {

                const letter =
                    document.createElement("span");

                letter.className =
                    "manifest-letter";

                letter.textContent =
                    char;

                letter.style.display =
                    "inline-block";


                wordWrap.appendChild(letter);

            });


            fragment.appendChild(wordWrap);


            if (index < words.length - 1) {

                fragment.appendChild(
                    document.createTextNode(" ")
                );

            }

        });


        line.replaceChildren(fragment);

    });


    const letters =
        block.querySelectorAll(
            ".manifest-letter"
        );


    if (!letters.length) return;


    gsap.set(letters, {

        y: 35,

        opacity: 0,

        filter: "blur(2px)"

    });


    /*
        Observer следит именно за manifest-блоком.
    */

    observeOnce(
        [block],
        () => {

            gsap.to(letters, {

                y: 0,

                opacity: 1,

                filter: "blur(0px)",

                duration: 0.55,

                stagger: 0.018,

                ease: "power2.out"

            });

        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -15% 0px"
        }
    );

}


/* =========================================================
CONTACT SLOGAN
========================================================= */

function initSlogan() {

    const words =
        document.querySelectorAll(
            ".contact-block .slogan-line .word"
        );


    const contact =
        document.querySelector(
            ".contact-block"
        );


    if (!words.length || !contact) return;


    const accent =
        contact.querySelector(
            ".slogan-accent"
        );


    if (accent) {

        accent.style.setProperty(
            "color",
            "#7182CB",
            "important"
        );

    }


    gsap.set(words, {

        y: 70,

        opacity: 0

    });


    observeOnce(
        [contact],
        () => {

            gsap.to(words, {

                y: 0,

                opacity: 1,

                duration: 1.1,

                stagger: 0.25,

                ease: "power4.out"

            });

        },
        {
            threshold: 0.2,
            rootMargin: "0px 0px -10% 0px"
        }
    );

}


/* =========================================================
SYMBOLS
========================================================= */

function initSymbols() {

    const symbols =
        document.querySelectorAll(
            ".symbol img"
        );


    if (!symbols.length) return;


    gsap.set(symbols, {

        scale: 0.82,

        opacity: 0,

        filter: "blur(8px)",

        y: 30

    });


    observeOnce(
        symbols,
        symbol => {

            gsap.to(symbol, {

                scale: 1,

                opacity: 1,

                filter: "blur(0px)",

                y: 0,

                duration: 1.1,

                ease: "power3.out"

            });

        },
        {
            threshold: 0.2,
            rootMargin: "0px 0px -10% 0px"
        }
    );

}


/* =========================================================
CARDS
========================================================= */

function initCards() {

    const cards =
        document.querySelectorAll(
            ".card-block"
        );


    if (!cards.length) return;


    cards.forEach(card => {

        const title =
            card.querySelector("h2");


        const text =
            card.querySelector(".text p");


        if (!title && !text) return;


        if (title) {

            gsap.set(title, {

                y: 30,

                opacity: 0,

                filter: "blur(3px)"

            });

        }


        if (text) {

            gsap.set(text, {

                y: 25,

                opacity: 0,

                filter: "blur(2px)"

            });

        }


        observeOnce(
            [card],
            () => {

                const timeline =
                    gsap.timeline();


                if (title) {

                    timeline.to(title, {

                        y: 0,

                        opacity: 1,

                        filter: "blur(0px)",

                        duration: 0.7,

                        ease: "power2.out"

                    });

                }


                if (text) {

                    timeline.to(
                        text,
                        {

                            y: 0,

                            opacity: 1,

                            filter: "blur(0px)",

                            duration: 0.8,

                            ease: "power2.out"

                        },
                        "-=0.45"
                    );

                }

            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -10% 0px"
            }
        );

    });

}


/* =========================================================
LONG TEXT
========================================================= */

function initTextReveals() {

    const selectors = [

        ".description-block p",

        ".workshops-block p",

        ".jams-block p",

        ".meetings-block p",

        ".final-text-block p"

    ];


    const blocks =
        document.querySelectorAll(
            selectors.join(",")
        );


    if (!blocks.length) return;


    blocks.forEach(block => {


        /*
            Не обрабатываем текст повторно.
        */

        if (
            block.querySelector(
                ".description-word"
            )
        ) {
            return;
        }


        const walker =
            document.createTreeWalker(
                block,
                NodeFilter.SHOW_TEXT
            );


        const textNodes = [];


        while (walker.nextNode()) {

            textNodes.push(
                walker.currentNode
            );

        }


        textNodes.forEach(node => {

            /*
                Не трогаем пустые текстовые узлы.
            */

            if (!node.textContent.trim()) {
                return;
            }


            const parts =
                node.textContent.split(
                    /(\s+)/
                );


            const fragment =
                document.createDocumentFragment();


            parts.forEach(part => {

                if (!part.trim()) {

                    fragment.appendChild(
                        document.createTextNode(
                            part
                        )
                    );

                    return;
                }


                const span =
                    document.createElement(
                        "span"
                    );


                span.className =
                    "description-word";


                span.textContent =
                    part;


                span.style.display =
                    "inline-block";


                fragment.appendChild(span);

            });


            node.replaceWith(fragment);

        });


        const words =
            block.querySelectorAll(
                ".description-word"
            );


        if (!words.length) return;


        gsap.set(words, {

            y: 45,

            opacity: 0,

            filter: "blur(2px)"

        });


        observeOnce(
            [block],
            () => {

                gsap.to(words, {

                    y: 0,

                    opacity: 1,

                    filter: "blur(0px)",

                    duration: 0.7,

                    stagger: 0.025,

                    ease: "power2.out"

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -8% 0px"
            }
        );

    });

}


/* =========================================================
GALLERY
========================================================= */

function initGallery() {

    const images = [

        "1.jpg",
        "2.jpg",
        "3.jpg",
        "4.jpg",
        "5.jpg",
        "6.jpg",
        "7.jpg",
        "8.jpg"

    ];


    const image =
        document.getElementById(
            "gallery-image"
        );


    const mobile =
        document.getElementById(
            "gallery-mobile"
        );


    const next =
        document.getElementById(
            "gallery-next"
        );


    const prev =
        document.getElementById(
            "gallery-prev"
        );


    if (!image || !mobile) return;


    let index = 0;

    let swapTimer = null;


    function changeGallery(nextIndex) {

        index =
            (nextIndex + images.length) %
            images.length;


        const file =
            images[index];


        clearTimeout(swapTimer);


        /*
            Сначала плавно скрываем старую картинку.
        */

        image.style.opacity = "0";


        swapTimer =
            setTimeout(() => {

                /*
                    Mobile source.
                */

                mobile.srcset =
                    `images/gallery/mobile/${file}`;


                /*
                    Desktop image.
                */

                const reveal = () => {

                    image.style.opacity = "1";


                    image.removeEventListener(
                        "load",
                        reveal
                    );

                };


                image.addEventListener(
                    "load",
                    reveal
                );


                image.src =
                    `images/gallery/${file}`;


                /*
                    Cached image.
                */

                if (image.complete) {

                    requestAnimationFrame(() => {

                        image.style.opacity = "1";

                    });

                }

            }, 300);

    }


    if (next) {

        next.addEventListener(
            "click",
            () => {

                changeGallery(
                    index + 1
                );

            }
        );

    }


    if (prev) {

        prev.addEventListener(
            "click",
            () => {

                changeGallery(
                    index - 1
                );

            }
        );

    }

}


/* =========================================================
MOBILE CONTACT LOGO
========================================================= */

function initMobileContact() {

    const contact =
        document.querySelector(
            ".contact-block"
        );


    const contactLogo =
        document.querySelector(
            ".contact-end-logo"
        );


    if (!contact || !contactLogo) return;


    if (!isMobile()) return;


    /*
        Здесь оставляем ScrollTrigger,
        потому что это НЕ запуск появления блока.

        Это непрерывная привязка движения логотипа
        к позиции скролла.
    */

    if (
        typeof gsap !== "undefined" &&
        typeof ScrollTrigger !== "undefined"
    ) {

        gsap.registerPlugin(
            ScrollTrigger
        );


        gsap.fromTo(

            contactLogo,

            {
                y: 0,
                opacity: 1
            },

            {
                y: -120,

                opacity: 0,

                ease: "none",

                scrollTrigger: {

                    trigger: contact,

                    start: "top top",

                    end: "top -35%",

                    scrub: true

                }

            }

        );

    }

}


/* =========================================================
FIXED LOGO
========================================================= */

function initFixedLogo() {

    const logo =
        document.querySelector(
            ".logo-fixed"
        );


    if (!logo) return;


    /*
        Ищем секции с тёмным фоном.
    */

    const darkSections =
        document.querySelectorAll(
            [
                ".dark-section",
                ".black-section",
                ".footer",
                ".contact-block"
            ].join(",")
        );


    /*
        Если специальных классов нет,
        определяем тёмные блоки по computed background.
    */

    const sections =
        document.querySelectorAll(
            "section, footer, .stack-card, .contact-block"
        );


    function getLuminance(color) {

        if (!color) return 1;


        const match =
            color.match(
                /rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/
            );


        if (!match) return 1;


        let r =
            parseInt(match[1], 10) / 255;


        let g =
            parseInt(match[2], 10) / 255;


        let b =
            parseInt(match[3], 10) / 255;


        /*
            Относительная яркость.
        */

        r =
            r <= 0.03928
                ? r / 12.92
                : Math.pow(
                    (r + 0.055) / 1.055,
                    2.4
                );


        g =
            g <= 0.03928
                ? g / 12.92
                : Math.pow(
                    (g + 0.055) / 1.055,
                    2.4
                );


        b =
            b <= 0.03928
                ? b / 12.92
                : Math.pow(
                    (b + 0.055) / 1.055,
                    2.4
                );


        return (
            0.2126 * r +
            0.7152 * g +
            0.0722 * b
        );

    }


    function updateLogoColor() {

        /*
            Координата логотипа на экране.
        */

        const logoRect =
            logo.getBoundingClientRect();


        const logoX =
            logoRect.left +
            logoRect.width / 2;


        const logoY =
            logoRect.top +
            logoRect.height / 2;


        let isDark = false;


        /*
            Сначала проверяем реальные элементы,
            которые находятся под логотипом.
        */

        sections.forEach(section => {

            const rect =
                section.getBoundingClientRect();


            if (

                logoX >= rect.left &&
                logoX <= rect.right &&

                logoY >= rect.top &&
                logoY <= rect.bottom

            ) {

                const style =
                    window.getComputedStyle(
                        section
                    );


                const background =
                    style.backgroundColor;


                const luminance =
                    getLuminance(
                        background
                    );


                /*
                    Только действительно тёмный фон.
                */

                if (luminance < 0.35) {

                    isDark = true;

                }

            }

        });


        /*
            Явные тёмные секции имеют приоритет.
        */

        darkSections.forEach(section => {

            const rect =
                section.getBoundingClientRect();


            if (

                logoX >= rect.left &&
                logoX <= rect.right &&

                logoY >= rect.top &&
                logoY <= rect.bottom

            ) {

                isDark = true;

            }

        });


        logo.classList.toggle(
            "dark",
            isDark
        );

    }


    /*
        Не делаем тяжёлый layout-recalc
        на каждом пикселе scroll.

        requestAnimationFrame объединяет
        несколько событий скролла в один кадр.
    */

    let ticking = false;


    function requestLogoUpdate() {

        if (ticking) return;


        ticking = true;


        requestAnimationFrame(() => {

            updateLogoColor();

            ticking = false;

        });

    }


    window.addEventListener(
        "scroll",
        requestLogoUpdate,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        requestLogoUpdate,
        {
            passive: true
        }
    );


    /*
        Первоначальное состояние.
    */

    updateLogoColor();


    /*
        На мобильном логотип может менять
        положение относительно контактного блока.
    */

    if (isMobile()) {

        const contact =
            document.querySelector(
                ".contact-block"
            );


        if (contact) {

            function updateMobileLogo() {

                const rect =
                    contact.getBoundingClientRect();


                const inside =
                    rect.top <= window.innerHeight &&
                    rect.bottom >= 0;


                logo.classList.toggle(
                    "mobile-contact-position",
                    inside
                );

            }


            window.addEventListener(
                "scroll",
                updateMobileLogo,
                {
                    passive: true
                }
            );


            window.addEventListener(
                "resize",
                updateMobileLogo,
                {
                    passive: true
                }
            );


            updateMobileLogo();

        }

    }

}


/* =========================================================
START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initHero();

        initManifest();

        initSlogan();

        initSymbols();

        initCards();

        initTextReveals();

        initGallery();

        initMobileContact();

        initFixedLogo();

    }
);