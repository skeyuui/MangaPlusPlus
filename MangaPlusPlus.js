// ==UserScript==
// @name         MangaPlusPlus
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Overhaul for the MangaPlus reader
// @author       Vibecoded by Gemini
// @match        https://mangaplus.shueisha.co.jp/*
// @run-at       document-body
// @grant        none
// ==/UserScript==

/* STYLE */
(function (css)
{
    var style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);
})(`
/*
 * CUSTOM HORIZONTAL MODE
 */
.zao-image {
    height: auto !important;
    max-height: none !important;
}

.zao-pages-container {
    overflow: auto !important;
    align-items: start !important;
    margin-top: 5px !important;
    margin-bottom: 5px !important;
}

/*
 * FIX FOR BACKGROUND COLOR ON FIRST PAGE
 */
.zao-surface {
    background-color: transparent !important;
}

/*
 * HIDE NATIVE SETTINGS AND SIDE MENU
 * (We hide the visual elements, but keep the data in DOM so we can extract it)
 */
div[class*="Navigation-module_settingsContainer_"],
div[class*="SideMenu-module_sideMenu_"],
div[class*="SideMenu-module_appear_"],
div[class*="SideMenu-module_sideMenuBackground_"] {
    display: none !important;
    opacity: 0 !important;
    pointer-events: none !important;
}

/*
 * LANGUAGE MODAL FIX
 */
div[class*="LanguageModal-module_modal"] {
    position: fixed !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    z-index: 10001 !important;
    background-color: var(--color-dark-gray) !important;
    border: 1px solid var(--color-gray) !important;
    box-shadow: 0 0 20px rgba(0,0,0,0.5) !important;
    max-height: 90vh !important;
    overflow-y: auto !important;
    width: auto !important;
    min-width: 300px;
    right: unset !important;
    bottom: unset !important;
}

/*
 * HEADER / SIDEBAR CONTAINER
 */
div[class*="Navigation-module_header_"] {
    display: flex !important;
    flex-direction: column !important;
    align-items: stretch !important;
    border-left: 2px solid var(--color-gray) !important;
    z-index: 3 !important;
    position: fixed !important;
    left: unset; right: 0 !important;
    top: 0 !important;
    width: calc(18em + 6px) !important;
    height: calc(100% - 0.6em) !important;
    background: var(--color-dark-gray) !important;
    box-sizing: content-box !important;
    box-shadow: unset !important;
    -webkit-box-shadow: unset !important;
    overflow-y: auto !important;
    overflow-x: hidden !important;
}

/*
 * INTERNAL WRAPPERS FIX
 */
div[class*="Navigation-module_header_"] > div[class*="Container-module_container"],
div[class*="Navigation-module_headerContainer"] {
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
    max-width: 100% !important;
    height: auto !important;
    margin: 0 !important;
    padding: 0 !important;
    position: static !important;
}

/*
 * HEADER LEFT (Logo + Title)
 */
div[class*="Navigation-module_headerLeft"] {
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
    align-items: stretch !important;
}

/*
 * HEADER RIGHT (Language + Settings)
 */
div[class*="Navigation-module_headerRight"] {
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
}

.mpp-menu-collapsed div[class*="Navigation-module_header_"] {
    display: none !important;
}
.mpp-no-progress-bar div[class*="Navigation-module_header_"] {
    height: calc(var(--vh, 1vh) * 100) !important;
}

/*
 * MENU BUTTON
 */
.mpp-expand {
    position: absolute;
    display: none;
    right: 8px;
    top: 8px;
    z-index: 4;
    background: var(--color-dark-gray);
    border: 1px solid var(--color-gray);
    padding: 0.5em 0.75em;
    border-radius: 8px;
    opacity: 0.5;
    cursor: pointer;
}
.mpp-expand:hover {
    opacity: 1;
}
.mpp-menu-collapsed .mpp-expand {
    display: block;
}

/*
 * HEADER: LOGO AND COLLAPSE
 */
.mpp-collapse {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1em;
    cursor: pointer;
    border-right: 1px solid var(--color-gray);
    min-height: 40px;
    background-color: var(--color-dark-gray);
    width: 100%;
    box-sizing: border-box;
}
div[class*="Navigation-module_imageContainer"] {
    display: flex !important;
    flex-direction: row !important;
    margin: 0 !important;
    flex-grow: 0 !important;
    width: 100% !important;
    justify-content: center !important;
    border-bottom: 1px solid var(--color-gray) !important;
}
div[class*="Navigation-module_imageContainer"] a {
    flex-grow: 1 !important;
}
div[class*="Navigation-module_imageContainer"] a:hover,
.mpp-collapse:hover {
    background-color: var(--color-gray) !important;
}
img[class*="Navigation-module_logo"] {
    margin: 0 auto !important;
    padding: 5px 0 !important;
    display: block !important;
    height: auto !important;
    width: 36% !important;
}

/*
 * HEADER: SERIES TITLE
 */
div[class*="Navigation-module_headerLeft"] > a[href*="/titles/"] {
    display: block !important;
    flex-direction: row !important;
    align-items: start !important;
    justify-content: flex-start !important;
    flex-grow: 0 !important;
    box-sizing: border-box;
    border-top: 1px solid var(--color-gray) !important;
    padding: 1em !important;
    width: 100% !important;
    height: auto !important;
    min-height: min-content !important;
    overflow: visible !important;
    text-align: center;
}

div[class*="Navigation-module_headerLeft"] h1 {
    font-size: 1.2em !important;
    line-height: 1.4em !important;
    padding: 0 !important;
    height: auto !important;
    white-space: normal !important;
    word-wrap: break-word !important;
    overflow: visible !important;
    text-overflow: unset !important;
}

/*
 * HEADER: CHAPTER TITLE WRAPPER FIX
 */
div[class*="Navigation-module_chapterTitleWrapper"] {
    border: 0.5px solid var(--color-gray) !important;
    border-radius: 0 !important;
    padding: 0 !important;
    background-color: transparent !important;
    gap: 0 !important;
}

/* Hide the Native Texts completely */
p[class*="Navigation-module_chapterTitle"],
img[class*="Navigation-module_downArrowIcon"] {
    display: none !important;
}

/*
 * HEADER: LANGUAGE BUTTON (With Text)
 */
div[class*="Navigation-module_languageButton"] {
    display: flex !important;
    align-items: center !important;
    justify-content: flex-end !important;
    margin: 0 !important;
    width: 100% !important;
    box-sizing: border-box !important;
    border: none !important;
}
div[class*="Navigation-module_languageButton_"] {
    padding: 0 !important;
}
div[class*="Navigation-module_languageButton"]::before {
    content: "Language";
    margin-right: auto;
    font-size: 1em;
    font-family: Roboto, sans-serif;
    color: #fff;
}
div[class*="LanguageButton-module_svgContainer"] {
    flex-grow: 0 !important;
}
div[class*="Navigation-module_languageButton"]:hover {
    background-color: var(--color-gray) !important;
    cursor: pointer;
}

/*
 * COMMENTS
 */
div.mpp-comments {
    border-top: 1px solid var(--color-gray);
    flex-shrink: 0;
}
div.mpp-comments a {
    display: block;
    padding: 1em;
    font-weight: normal;
    text-align: center;
}
div.mpp-comments a:hover {
    background-color: var(--color-gray);
}

/*
 * CUSTOM SETTINGS (SELECT MENUS)
 */
div.mpp-settings {
    border-top: 1px solid var(--color-gray);
    padding: 1em;
    flex-grow: 1; /* Pushes everything below to bottom */
    overflow-y: auto;
}
div.mpp-settings h2 {
    font-size: 1em;
    margin-bottom: 0.5em;
    font-weight: normal;
    font-family: Roboto,Sans-Serif;
    color: #fff;
    margin-top: 0 !important;
}
.mpp-option-container {
    margin-top: 1em;
    display: flex;
    flex-direction: column;
}
.mpp-option-container label {
    color: #ccc;
    font-size: 0.9em;
    margin-bottom: 0.5em;
    font-family: Roboto, Sans-Serif;
}
.mpp-select {
    background: #111;
    color: #fff;
    border: 1px solid var(--color-gray);
    padding: 0.6em;
    border-radius: 4px;
    font-family: Roboto, Sans-Serif;
    font-size: 0.9em;
    outline: none;
    cursor: pointer;
}
.mpp-select:hover {
    border-color: #888;
}
.mpp-select:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}
.mpp-disabled label {
    opacity: 0.3;
}

#mpp-chapter-select {
    border-radius: 0 !important;
    border: none !important;
    background-color: rgb(25, 25, 25) !important;
}

/*
 * NAVIGATION AREA & PAGE NUMBER
 */
div.mpp-nav {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    border-top: 1px solid var(--color-gray);
    flex-shrink: 0;
}
div.mpp-nav-btn {
    width: 50%;
    flex-grow: 1;
    text-align: center;
    padding: 2em;
    cursor: pointer;
    user-select: none;
}
div.mpp-nav-btn:first-child {
    border-right: 1px solid var(--color-gray);
}
div.mpp-nav-btn:hover {
    background-color: var(--color-gray);
}
.mpp-disabled, .mpp-disabled:hover {
    color: var(--color-dark-gray) !important;
    background-color: var(--color-gray-lt) !important;
    cursor: default;
}

p[class*="Viewer-module_pageNumber"] {
    font-size: 1em !important;
    position: static !important;
    width: 100% !important;
    text-align: center;
    padding: 15px 0 !important;
    margin: 0 !important;
    color: #ccc !important;
    background: transparent !important;
    border-top: 1px solid var(--color-gray) !important;
    flex-shrink: 0;
}

/*
 * FOOTER
 */
div[class*="Viewer-module_footer"] {
    height: 0.6em !important;
    bottom: 0 !important;
    z-index: 4 !important;
    position: relative !important;
    background-color: var(--color-gray) !important;
    padding: 0;
}
div[class*="Viewer-module_footer"] div[class*="Viewer-module_container"] {
    margin-top: 0;
}
div[class*="Viewer-module_slider"] {
    width: 100% !important;
    left: 0 !important;
}
.mpp-no-progress-bar div[class*="Viewer-module_footer"] {
    display: none !important
}

/*
 * FOOTER: SLIDER COLOR
 */
.zao-slider-button::before {
    background-color: var(--color-black) !important;
}
.zao-slider-button,
.zao-slider-bar-previous {
    background-color: var(--color-gray-lt) !important;
}
.zao-slider-bar-next {
    background-color: var(--color-gray) !important;
}

/*
 * HIDE NATIVE COMMENTS
 */
div[class*="Viewer-module_container"] a {
    display: none !important;
}

/*
 * IMAGE CONTAINER
 */
div[class*="Viewer-module_viewerContainer"] {
    height: calc(var(--vh, 1vh) * 100 - 0.6em) !important;
    width: calc(100% - 18em - 8px) !important;
}
.mpp-menu-collapsed div[class*="Viewer-module_viewerContainer"] {
    width: 100vw !important;
}
.mpp-no-progress-bar div[class*="Viewer-module_viewerContainer"] {
    height: calc(var(--vh, 1vh) * 100) !important;
}
.mpp-alt-nav img.zao-image {
    cursor: pointer !important;
}
`);


(function()
{
    /* Constants */
    const MPP_ALT_NAV = "Alt Navigation";
    const MPP_SHOW_PROG = "Progress Bar";
    const MPP_PRELOAD = "Preload Images";

    // User Requested Preload Options
    const PRELOAD_OPTS = ["Default (5)", "10 Pages", "20 Pages", "50 Pages", "100 Pages", "All"];

    function getPreloadCount(val) {
        switch(val) {
            case "10 Pages": return 10;
            case "20 Pages": return 20;
            case "50 Pages": return 50;
            case "100 Pages": return 100;
            case "All": return 999;
            default: return 5;
        }
    }

    /*
     * Class that checks against a condition
     */
    class MppEnabledCondition {
        constructor(enabledCondition, expectedResult) {
            this.name = enabledCondition;
            this.expectedResult = expectedResult;
        }

        isEnabled() {
            var result = window.localStorage[this.name];
            if (!result && this.expectedResult === "horizontal") return true;
            return result == this.expectedResult;
        }
    }
    const READ_HORIZONTAL = new MppEnabledCondition("viewerMode", "horizontal");

    /*
     * Class that represents an option in the sidebar (Select Menu)
     */
    class MppAdvancedOption {
        constructor(name, storageKey, enabledCondition, options, optionValues, disabledIndex, defaultIndex, delegate = () => {}) {
            this.name = name;
            this.storageKey = storageKey;
            this.options = options;
            this.optionValues = optionValues;
            this.disabledOption = disabledIndex;
            this.defaultOption = defaultIndex;

            let savedValue = window.localStorage.getItem(this.storageKey);
            let savedIndex = this.optionValues.indexOf(savedValue);

            if(savedIndex === -1) {
                savedIndex = this.defaultOption;
                window.localStorage.setItem(this.storageKey, this.optionValues[savedIndex]);
            }

            this.currentOption = savedIndex;
            this.enabledCondition = enabledCondition;
            this.element = null;
            this.selectElement = null;
            this.delegate = delegate;
        }

        initHtml(parent) {
            var enabled = this.canBeChanged();
            var container = document.createElement("div");
            container.className = "mpp-option-container";
            if (!enabled) container.className += " mpp-disabled";

            var label = document.createElement("label");
            label.innerText = this.name;

            var select = document.createElement("select");
            select.className = "mpp-select";
            select.disabled = !enabled;

            this.options.forEach((opt, idx) => {
                var option = document.createElement("option");
                option.value = idx;
                option.innerText = opt;
                if (idx === (enabled ? this.currentOption : this.disabledOption)) {
                    option.selected = true;
                }
                select.appendChild(option);
            });

            select.addEventListener("change", (e) => {
                this.currentOption = parseInt(e.target.value);
                window.localStorage.setItem(this.storageKey, this.optionValues[this.currentOption]);
                this.update(true);
            });

            container.appendChild(label);
            container.appendChild(select);
            parent.appendChild(container);

            this.element = container;
            this.selectElement = select;
        }

        canBeChanged() {
            return this.enabledCondition ? this.enabledCondition.isEnabled() : true;
        }

        getValue() {
            return this.optionValues[this.canBeChanged() ? this.currentOption : this.disabledOption];
        }

        update(userChanged = false) {
            var enabled = this.canBeChanged();
            if (this.element) {
                this.element.className = "mpp-option-container" + (enabled ? "" : " mpp-disabled");
            }
            if (this.selectElement) {
                this.selectElement.disabled = !enabled;
                this.selectElement.value = enabled ? this.currentOption : this.disabledOption;
            }
            this.delegate(userChanged);
        }
    }

    /*
     * Class that collects and updates options
     */
    class MppAdvancedOptionCollection {
        constructor() {
            this.options = [];
        }

        addOption(option) {
            this.options.push(option);
            this[option.name] = option;
        }

        update() {
            for (var i = 0; i < this.options.length; ++i) {
                this.options[i].update(false);
            }
        }

        getOption(name) {
            return this[name];
        }

        initHtml(parent) {
            var settingsElement = document.createElement("div");
            settingsElement.className = "mpp-settings";
            settingsElement.innerHTML = "<h2>Settings</h2>";
            parent.appendChild(settingsElement);

            for (var i = 0; i < this.options.length; ++i) {
                var option = this.options[i];
                option.initHtml(settingsElement);
            }

            this.update();
        }
    };

    /* Key event */
    function keyEvent(key) {
        var e = new KeyboardEvent("keydown", { code : key, key: key });
        document.dispatchEvent(e);
    }

    /* Adds/Removes a class depending on condition */
    function mppSetConditionalClass(element, condition, className) {
        if (condition) {
            if (!element.className.includes(className)) {
                element.className += " " + className;
                return true;
            }
        } else {
            if (element.className.includes(className)) {
                element.className = element.className.replace(" " + className, "").trim();
                return true;
            }
        }
        return false;
    }

    /* Add or remove class from root */
    function mppSetConditionalRootClass(condition, className) {
        return mppSetConditionalClass(document.getElementById("app"), condition, className);
    }

    /* Search for element with partial classname */
    function mppGetElementByPartialClassName(element, className) {
        if (!element) return null;
        if (element.className && typeof element.className === 'string' && element.className.includes(className)) {
            return element;
        }
        for (var i = 0; i < element.children.length; ++i) {
            var found = mppGetElementByPartialClassName(element.children[i], className);
            if (found) return found;
        }
        return null;
    }

    /* Locate MangaPlus Native Viewer instance */
    function mppGetViewerFromVue() {
        const app = document.getElementById('app');
        if (!app || !app.__vue__) return null;

        const visited = new Set();
        function search(vueObj) {
            if (!vueObj || visited.has(vueObj)) return null;
            visited.add(vueObj);

            try {
                for (let key in vueObj) {
                    if (key && !key.startsWith('$') && !key.startsWith('_')) {
                        const val = vueObj[key];
                        if (val && val.surface && val.viewerData) {
                            return val;
                        }
                    }
                }
            } catch(e) {}

            if (vueObj.$children) {
                for (let i = 0; i < vueObj.$children.length; i++) {
                    let res = search(vueObj.$children[i]);
                    if (res) return res;
                }
            }
            return null;
        }
        return search(app.__vue__);
    }

    /* Intercept Class via Webpack */
    function mppGetMangaPlusClasses() {
        if (window.mppClasses) return window.mppClasses;

        let req;
        const wp = window.webpackJsonp = window.webpackJsonp || [];
        wp.push([ [Symbol('mpp_extractor')], {
            'mpp_extractor_module': function(m, e, r) { req = r; }
        }, [['mpp_extractor_module']] ]);

        if (!req || !req.c) return null;

        for (let modId in req.c) {
            const mod = req.c[modId];
            if (mod && mod.exports && mod.exports.default) {
                const def = mod.exports.default;
                if (def.Viewer && def.UI && def.Slider) {
                    window.mppClasses = def;
                    return def;
                }
            }
        }
        return null;
    }

    function mppInitPreloadPatch() {
        const classes = mppGetMangaPlusClasses();
        if (classes && classes.Viewer && !classes.Viewer.prototype._mpp_preload_patched) {
            const origCreateSurface = classes.Viewer.prototype.createSurface;

            classes.Viewer.prototype.createSurface = function() {
                const promise = origCreateSurface.apply(this, arguments);
                window.mppViewer = this;

                if (promise && typeof promise.then === 'function') {
                    promise.then(() => {
                        // Access via localStorage to guarantee it works on initialization
                        const val = window.localStorage.getItem("mpp-preload") || "Default (5)";
                        this.viewerData.options.preloadCount = getPreloadCount(val);
                        if (this.surface && typeof this.surface.preloadPages === 'function') {
                            this.surface.preloadPages(this.surface.currentPageNumber || 1);
                        }
                    });
                }
                return promise;
            };
            classes.Viewer.prototype._mpp_preload_patched = true;
        }
    }

    /* Create Custom Chapter Selector */
    function mppInitChapterSelector(header) {
        const titleWrapper = mppGetElementByPartialClassName(header, "Navigation-module_chapterTitleWrapper");
        if (!titleWrapper) return;
        if (document.getElementById('mpp-chapter-select')) return; // Already injected

        // Locate the chapter list array from the native DOM
        let chapterItems = titleWrapper.querySelectorAll('li[class*="SideMenu-module_chapter"]');

        // If the chapter list hasn't rendered yet (because Vue only mounts it on click)
        if (chapterItems.length === 0) {
            if (!titleWrapper.dataset.mppClicked) {
                titleWrapper.dataset.mppClicked = "true";
                // Programmatically click the title wrapper to force Vue to generate the chapter list
                titleWrapper.click();
            }
            // Retry extraction in 50ms
            setTimeout(() => mppInitChapterSelector(header), 50);
            return;
        }

        // Hide native text and arrow (fallback failsafe if CSS missed something)
        const nativeTitle = titleWrapper.querySelector('p[class*="Navigation-module_chapterTitle"]');
        const nativeArrow = titleWrapper.querySelector('img[class*="Navigation-module_downArrowIcon"]');
        if (nativeTitle) nativeTitle.style.display = 'none';
        if (nativeArrow) nativeArrow.style.display = 'none';

        // Build Custom Select Menu
        const select = document.createElement('select');
        select.id = 'mpp-chapter-select';
        select.className = 'mpp-select';
        select.style.width = '100%';
        select.style.margin = '0';
        select.style.display = 'block';
        select.style.textAlign = 'center';
        select.style.fontSize = '1em';
        select.style.fontWeight = 'bold';

        chapterItems.forEach((li, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.innerText = li.innerText.trim();
            if (li.className.includes('routerActive') || li.className.includes('router-link-exact-active')) {
                option.selected = true;
            }
            select.appendChild(option);
        });

        // Add event listener to jump chapters cleanly using native Vue routing attached to original LIs
        select.addEventListener('change', (e) => {
            const targetLi = chapterItems[parseInt(e.target.value)];
            if (targetLi) {
                targetLi.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
            }
        });

        // Insert at top of wrapper
        titleWrapper.insertBefore(select, titleWrapper.firstChild);
    }

    /* Initialize Custom HTML Layout */
    function mppInitHtml(header) {
        try {
            const collapsed = window.localStorage.getItem("mpp-menu-collapsed") === "1";
            mppSetConditionalRootClass(collapsed, "mpp-menu-collapsed");
            if (collapsed) window.dispatchEvent(new Event('resize'));
        } catch(e) {}

        const htmlExpand = document.createElement("div");
        htmlExpand.className = "mpp-expand";
        htmlExpand.innerHTML = "&#9776;";
        htmlExpand.onclick = () => {
            mppSetConditionalRootClass(false, "mpp-menu-collapsed");
            localStorage.setItem("mpp-menu-collapsed", "0");
            window.dispatchEvent(new Event('resize'));
        }
        if(header.parentElement) header.parentElement.appendChild(htmlExpand);

        const htmlCollapse = document.createElement("div");
        htmlCollapse.className = "mpp-collapse";
        htmlCollapse.innerHTML = "&#187;";
        htmlCollapse.onclick = () => {
            mppSetConditionalRootClass(true, "mpp-menu-collapsed");
            localStorage.setItem("mpp-menu-collapsed", "1");
            window.dispatchEvent(new Event('resize'));
        }
        if(header.firstChild) header.insertBefore(htmlCollapse, header.firstChild);
        else header.appendChild(htmlCollapse);

        // Inject Custom Chapter Selector
        mppInitChapterSelector(header);

        const htmlComments = document.createElement("div");
        htmlComments.className = "mpp-comments";
        let pathParts = window.location.pathname.split('/');
        let mangaId = pathParts.length > 2 ? pathParts[2] : "";
        htmlComments.innerHTML = `<a href="/comments/${mangaId}">Comments</a>`;
        header.appendChild(htmlComments);

        // Inject Settings
        mppSettings.initHtml(header);

        // Inject Navigation Area
        const htmlNav = document.createElement("div");
        htmlNav.className = "mpp-nav";
        htmlNav.innerHTML = `<div id="mpp-nav-left" class="mpp-btn mpp-nav-btn ${READ_HORIZONTAL.isEnabled() ? "" : "mpp-disabled"}">Next</div>
                             <div id="mpp-nav-right" class="mpp-btn mpp-nav-btn ${READ_HORIZONTAL.isEnabled() ? "" : "mpp-disabled"}">Previous</div>`;
        header.appendChild(htmlNav);

        document.getElementById("mpp-nav-left").addEventListener("click", function(e) {
            if(READ_HORIZONTAL.isEnabled()) keyEvent("ArrowLeft");
        });

        document.getElementById("mpp-nav-right").addEventListener("click", function(e) {
            if(READ_HORIZONTAL.isEnabled()) keyEvent("ArrowRight");
        });

        let zao = document.getElementsByClassName("zao")[0];
        if(zao) {
            zao.addEventListener("click", function(e) {
                if (mppSettings.getOption("Alt Navigation").getValue() == "1") {
                    e.stopPropagation();
                    if (e.target.className == "zao-image") keyEvent("ArrowLeft");
                }
            }, true);
        }
    }

    function mppInitApp() {
        if (mppLoadedUrl === window.location.href) return;

        mppLoadedUrl = window.location.href;
        if (!window.location.href.includes("mangaplus.shueisha.co.jp/viewer/")) return;

        var interval = setInterval(function() {
            mppInitPreloadPatch();

            var header = mppGetElementByPartialClassName(document.getElementById("app"), "Navigation-module_header_");
            if (header && document.querySelector('.zao')) {
                clearInterval(interval);
                mppInitHtml(header);
            }
        }, 50);
    }

    var mppLoadedUrl = null;

    /* SETTINGS BUILDER */
    var mppSettings = (function() {
        var settings = new MppAdvancedOptionCollection();

        // NATIVE: Reading Direction
        settings.addOption(new MppAdvancedOption(
            "Reading Direction", "viewerMode", null,
            ["Horizontal", "Vertical"], ["horizontal", "vertical"], 0, 0,
            function(userChanged) { if (userChanged) location.reload(); }
        ));

        // NATIVE: Image Quality
        settings.addOption(new MppAdvancedOption(
            "Image Quality", "imageQuality", null,
            ["High", "Low"], ["super_high", "low"], 0, 0,
            function(userChanged) { if (userChanged) location.reload(); }
        ));

        // CUSTOM: Alt Navigation
        settings.addOption(new MppAdvancedOption(
            "Alt Navigation", "mpp-alt-navigation", READ_HORIZONTAL,
            ["Off", "On"], ["0", "1"], 0, 0,
            function() { mppSetConditionalRootClass(this.getValue() === "1", "mpp-alt-nav"); }
        ));

        // CUSTOM: Progress Bar
        settings.addOption(new MppAdvancedOption(
            "Progress Bar", "mpp-progress-bar", READ_HORIZONTAL,
            ["Off", "On"], ["0", "1"], 0, 0,
            function() {
                if (mppSetConditionalRootClass(this.getValue() === "0", "mpp-no-progress-bar")) {
                    window.dispatchEvent(new Event('resize'));
                }
            }
        ));

        // CUSTOM: Preload Images
        settings.addOption(new MppAdvancedOption(
            "Preload Images", "mpp-preload", null,
            PRELOAD_OPTS, PRELOAD_OPTS, 0, 0,
            function(userChanged) {
                if (userChanged) location.reload();
            }
        ));

        return settings;
    })();


    /* LISTENERS */
    window.addEventListener("load", mppInitApp);
    window.addEventListener("popstate", mppInitApp);

    window.addEventListener("contextmenu", e => { e.stopPropagation(); }, true);

    document.addEventListener("mousedown", function(e) {
        if (e && (e.which == 2 || e.button == 4 )) e.stopPropagation();
    }, true);

    document.addEventListener("keydown", function(e) {
        if (e.key == "BrowserRefresh" || e.key == "F5" || e.key == "F11") e.stopPropagation();
    }, true);

    document.addEventListener("click", function(e) {
        if (mppLoadedUrl) {
            setTimeout(() => {
                if (mppLoadedUrl != window.location.href) {
                    mppInitApp();
                    return;
                }
                mppSettings.update();
                var left = document.getElementById("mpp-nav-left");
                var right = document.getElementById("mpp-nav-right");
                if(left) mppSetConditionalClass(left, !READ_HORIZONTAL.isEnabled(), "mpp-disabled");
                if(right) mppSetConditionalClass(right, !READ_HORIZONTAL.isEnabled(), "mpp-disabled");
            }, 500);
        }
    }, true);

    // Initial Preload Backup Trigger
    setTimeout(() => {
        const val = window.localStorage.getItem("mpp-preload") || "Default (5)";
        if (val !== "Default (5)") {
            if (!window.mppViewer) window.mppViewer = mppGetViewerFromVue();
            if (window.mppViewer && window.mppViewer.surface) {
                window.mppViewer.viewerData.options.preloadCount = getPreloadCount(val);
                window.mppViewer.surface.preloadPages(window.mppViewer.surface.currentPageNumber || 1);
            }
        }
    }, 2000);

})();

// Page Number Locator Loop
(function() {
    function movePageNumber() {
        const pageNumberEl = document.querySelector('p[class*="Viewer-module_pageNumber"]');
        const navEl = document.querySelector('.mpp-nav');

        if (!pageNumberEl || !navEl) return;
        if (navEl.previousSibling === pageNumberEl) return;

        if(pageNumberEl.parentNode) pageNumberEl.parentNode.removeChild(pageNumberEl);
        navEl.parentNode.insertBefore(pageNumberEl, navEl);
    }

    window.addEventListener('load', () => {
        let tries = 0;
        const interval = setInterval(() => {
            movePageNumber();
            tries++;
            if (tries > 15) clearInterval(interval);
        }, 500);
    });
})();

document.addEventListener("keydown", function(e) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;

    const containers = document.querySelectorAll(".zao-pages-container");
    if (!containers) return;

    const scrollAmount = 200;
    if (e.key === "ArrowDown") {
        containers.forEach(container => container.scrollTop += scrollAmount);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
        containers.forEach(container => container.scrollTop -= scrollAmount);
    }

    e.preventDefault();
}, { passive: false });
