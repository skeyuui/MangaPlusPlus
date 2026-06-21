// ==UserScript==
// @name         MangaPlusPlus
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  Overhaul for the MangaPlus reader
// @author       Fixed by Gemini Vibecoding
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
.zao-surface
{
    background-color: transparent !important;
}

/*
 * SETTINGS MODAL (MangaPlus Original Modal) - FIX
 * Forces the modal to center screen and break out of sidebar overflow
 */
div[class*="Modal-module_modal"]
{
    position: fixed !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    z-index: 10001 !important;
    background-color: var(--color-dark-gray) !important;
    /* Ensure default background doesn't override */
    background: #191919 !important;
    border: 1px solid var(--color-gray) !important;
    box-shadow: 0 0 20px rgba(0,0,0,0.5) !important;
    max-height: 90vh !important;
    overflow-y: auto !important;
    width: auto !important;
    min-width: 300px;
    right: unset !important;
    bottom: unset !important;
    margin: 0 !important;
}

/*
 * SETTINGS MODAL OVERLAY (Background)
 * Forces the dim background to cover the whole screen
 */
div[class*="Modal-module_sideMenuBackground"]
{
    position: fixed !important;
    top: 0 !important; left: 0 !important;
    width: 100vw !important; height: 100vh !important;
    z-index: 10000 !important;
    background-color: rgba(0,0,0,0.7) !important;
}

/*
 * LANGUAGE MODAL FIX
 */
div[class*="LanguageModal-module_modal"]
{
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
div[class*="Navigation-module_header_"]
{
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
div[class*="Navigation-module_headerContainer"]
{
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
div[class*="Navigation-module_headerLeft"]
{
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
    align-items: center !important;
}

/*
 * HEADER RIGHT (Language + Settings)
 */
div[class*="Navigation-module_headerRight"]
{
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
}


.mpp-menu-collapsed div[class*="Navigation-module_header_"]
{
    display: none !important;
}
.mpp-no-progress-bar div[class*="Navigation-module_header_"]
{
    height: calc(var(--vh, 1vh) * 100) !important;
}


/*
 * MENU BUTTON
 */
.mpp-expand
{
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
.mpp-expand:hover
{
    opacity: 1;
}
.mpp-menu-collapsed .mpp-expand
{
    display: block;
}


/*
 * HEADER: LOGO AND COLLAPSE
 */
.mpp-collapse
{
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
div[class*="Navigation-module_imageContainer"]
{
    display: flex !important;
    flex-direction: row !important;
    margin: 0 !important;
    flex-grow: 0 !important;
    width: 100% !important;
    justify-content: center !important;
    border-bottom: 1px solid var(--color-gray) !important;
}
div[class*="Navigation-module_imageContainer"] a
{
    flex-grow: 1 !important;
}
div[class*="Navigation-module_imageContainer"] a:hover,
.mpp-collapse:hover
{
    background-color: var(--color-gray) !important;
}
img[class*="Navigation-module_logo"]
{
    margin: 0 auto !important;
    padding: 20px 0 !important;
    display: block !important;
}


/*
 * HEADER: SERIES TITLE
 */
div[class*="Navigation-module_headerLeft"] > a[href*="/titles/"]
{
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
}

div[class*="Navigation-module_headerLeft"] h1
{
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
 * HEADER: CHAPTER TITLE (No Arrow)
 */
div[class*="Navigation-module_chapterTitleWrapper"]
{
    width: 100%;
    padding: 1em !important;
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: center !important;
    margin-top: 8px;
    box-sizing: border-box;
    position: relative !important;
    min-height: 3em !important;
}

/* Text Styling */
p[class*="Navigation-module_chapterTitle"]
{
    width: auto !important;
    display: block !important;
    font-size: 1.1em !important;
    margin: 0 !important;
    padding: 0 !important;
    flex-grow: 0 !important;
    line-height: 1 !important;
}

/* Remove Arrow */
img[class*="Navigation-module_downArrowIcon"]
{
    display: none !important;
}

/* Dropdown Container Fix */
div[class*="Navigation-module_chapterTitleWrapper"] > div
{
    position: absolute !important;
    top: 100% !important;
    left: 0 !important;
    width: 100% !important;
    z-index: 100 !important;
}

div[class*="Navigation-module_chapterTitleWrapper"]:hover,
div[class*="Navigation-module_headerLeft"] > a:hover
{
    opacity: var(--hover-opacity, 0.7);
}
p[class*="Navigation-module_chapterTitle"]::after
{
    display: none !important;
}

/*
 * HEADER: LANGUAGE BUTTON (FIXED v7 - With Text)
 */
div[class*="Navigation-module_languageButton"]
{
    display: flex !important;
    align-items: center !important;
    justify-content: flex-end !important; /* Icon to right */
    padding: 1em !important;
    margin: 0 !important;
    border-top: 1px solid var(--color-gray) !important;
    width: 100% !important;
    box-sizing: border-box !important;
}

div[class*="Navigation-module_languageButton"]::before
{
    content: "Language";
    margin-right: auto; /* Pushes icon to the right */
    font-size: 1em;
    font-family: Roboto, sans-serif;
    color: #fff;
}

/* Ensure inner SVG container doesn't break flex */
div[class*="LanguageButton-module_svgContainer"]
{
    flex-grow: 0 !important;
}

div[class*="Navigation-module_languageButton"]:hover
{
    background-color: var(--color-gray) !important;
    cursor: pointer;
}

/*
 * HEADER: SETTINGS BUTTON REPLACEMENT
 */
div[class*="Navigation-module_settingsContainer"]
{
    flex-grow: 0 !important;
    border-top: 1px solid var(--color-gray) !important;
    padding: 1em !important;
    flex-basis: unset !important;
    width: 100% !important;
    box-sizing: border-box;
    display: flex !important;
    align-items: center !important;
    cursor: pointer;
    text-align: left !important;
    position: relative !important;
}

/* Hide the Gear Icon */
img[class*="Navigation-module_settingLogo"]
{
    display: none !important;
}

/* Add Text "MangaPlus Settings" */
div[class*="Navigation-module_settingsContainer"]::before
{
    content: "MangaPlus Settings";
    font-size: 1em;
    font-family: Roboto, sans-serif;
    color: #fff;
    text-transform: none;
    font-weight: normal;
}

div[class*="Navigation-module_settingsContainer"]:hover
{
    background-color: var(--color-gray) !important;
}

/*
 * Settings Modal Injection Anchor Fix
 * Ensures the internal anchor for the modal doesn't break layout
 */
div[class*="Navigation-module_settingsContainer"] > div
{
    position: static !important;
}


div[class*="Navigation-module_kebabMenu"]
{
    margin: 0 !important;
    padding: 0 !important;
    width: max-content !important;
}
div[class*="Navigation-module_kebabMenu"]::before
{
    content: "Settings...";
    margin-right: 1em;
    font-size: 1em;
    font-weight: normal;
}
div[class*="Navigation-module_circle"]
{
    display: none !important;
}

/*
 * COMMENTS
 */
div.mpp-comments
{
    border-top: 1px solid var(--color-gray);
    flex-shrink: 0;
}
div.mpp-comments a
{
    display: block;
    padding: 1em;
    font-weight: normal;
}
div.mpp-comments a:hover
{
    background-color: var(--color-gray);
}

/*
 * CUSTOM SETTINGS
 */
div.mpp-settings
{
    border-top: 1px solid var(--color-gray);
    padding: 1em;
    flex-grow: 99999;
    overflow-y: auto;
}
div.mpp-settings h2
{
    font-size: 1em;
    margin-bottom: 1em;
    font-weight: normal;
    animation: unset !important;
    -webkit-animation: unset !important;
    text-shadow: unset !important;
    text-transform: unset !important;
    margin-top: 0 !important;
    font-family: Roboto,Sans-Serif;
    color: #fff;
}

div.mpp-settings p
{
    color: #ccc;
    background: #0004;
    border: 1px solid var(--color-gray);
    border-radius: 8px;
    padding: 0.75em 1em;
    margin-top: 0.5em;
    display: block;
    font-weight: normal;
    cursor: pointer;
    font-size: 0.9em;
    user-select: none;
}

div.mpp-settings p:hover
{
    background-color: var(--color-gray);
}
div.mpp-nav
{
    display: flex;
    flex-direction: row;
    align-items: stretch;
    border-top: 1px solid var(--color-gray);
    flex-shrink: 0;
}

div.mpp-nav-btn
{
    width: 50%;
    flex-grow: 1;
    text-align: center;
    padding: 2em;
    cursor: pointer;
    user-select: none;
}
div.mpp-nav-btn:first-child
{
    border-right: 1px solid var(--color-gray);
}
div.mpp-nav-btn:hover
{
    background-color: var(--color-gray);
}
.mpp-disabled,
.mpp-disabled:hover
{
    color: var(--color-dark-gray) !important;
    background-color: var(--color-gray-lt) !important;
    cursor: default;
}


/*
 * PAGE NUMBER
 */
p[class*="Viewer-module_pageNumber"]
{
    font-size: 1em !important;
    position: unset !important;
    bottom: calc(10px + 1em) !important;
    width: 100% !important;
    right: 0 !important;
    line-height: unset !important;
    text-align: center;
    padding: 0.5em 0;
}


/*
 * FOOTER
 */
div[class*="Viewer-module_footer"]
{
    height: 0.6em !important;
    bottom: 0 !important;
    z-index: 4 !important;
    position: relative !important;
    background-color: var(--color-gray) !important;
    padding: 0;
    position: relative;
}
div[class*="Viewer-module_footer"] div[class*="Viewer-module_container"]
{
    margin-top: 0;
}
div[class*="Viewer-module_slider"]
{
    width: 100% !important;
    left: 0 !important;
}
.mpp-no-progress-bar div[class*="Viewer-module_footer"]
{
    display: none !important
}


/*
 * FOOTER: SLIDER COLOR
 */
.zao-slider-button::before
{
    background-color: var(--color-black) !important;
}
.zao-slider-button,
.zao-slider-bar-previous
{
    background-color: var(--color-gray-lt) !important;
}
.zao-slider-bar-next
{
    background-color: var(--color-gray) !important;
}


/*
 * HIDE COMMENTS
 */
div[class*="Viewer-module_container"] a
{
    display: none !important;
}


/*
 * IMAGE CONTAINER
 */
div[class*="Viewer-module_viewerContainer"]
{
    height: calc(var(--vh, 1vh) * 100 - 0.6em) !important;
    width: calc(100% - 18em - 8px) !important;
}
.mpp-menu-collapsed div[class*="Viewer-module_viewerContainer"]
{
    width: 100vw !important;
}
.mpp-no-progress-bar div[class*="Viewer-module_viewerContainer"]
{
    height: calc(var(--vh, 1vh) * 100) !important;
}
.mpp-alt-nav img.zao-image
{
    cursor: pointer !important;
}
`);


(function()
{
    /* Constants */
    const MPP_ALT_NAV = "Alt Navigation";
    const MPP_SHOW_PROG = "Progress Bar";
    const MPP_PRELOAD = "Preload Images";

    // Used for options tracking
    const PRELOAD_OPTS = ["Default (5)", "10 Pages", "20 Pages", "50 Pages", "100 Pages", "All"];
    function getPreloadCount(val) {
        switch(val) {
            case "10 Pages": return 10;
            case "20 Pages": return 20;
            case "50 Pages": return 50;
            case "100 Pages": return 100;
            case "All": return 9999;
            default: return 5;
        }
    }


    /*
     * Class that checks against a condition
     */
    class MppEnabledCondition
    {
        constructor(enabledCondition, expectedResult)
        {
            this.name = enabledCondition;
            this.expectedResult = expectedResult;
        }

        isEnabled()
        {
            var result = window.localStorage[this.name];
            return result == this.expectedResult;
        }
    }
    const READ_HORIZONTAL = new MppEnabledCondition("viewerMode", "horizontal");

    /*
     * Class that represents an option in the sidebar
     */
    class MppAdvancedOption
    {
        constructor(name, enabledCondition, options, disabledIndex, defaultIndex, delegate = () => {})
        {
            this.name = name;
            this.id = "mpp-" + name.toLowerCase().replace(/ /g, '-');
            this.valueId = this.id + "-value";
            this.options = options;
            this.disabledOption = disabledIndex;
            this.defaultOption = defaultIndex;
            this.currentOption = parseInt(window.localStorage[this.id]) || this.defaultOption;
            this.enabledCondition = enabledCondition;
            this.element = null;
            this.valueElement = null;
            this.delegate = delegate;
        }

        initHtml(parent)
        {
            var enabled = this.canBeChanged();
            var html = document.createElement("p");
            html.id = this.id;
            html.className = enabled ? "" : "mpp-disabled";
            html.innerHTML = `${this.name}: <span id="${this.valueId}">${this.getValue()}</span>`;

            this.element = parent.appendChild(html);
            this.valueElement = document.getElementById(this.valueId);
        }

        canBeChanged()
        {
            return this.enabledCondition ? this.enabledCondition.isEnabled() : true;
        }

        getValue()
        {
            return this.options[this.canBeChanged() ? this.currentOption : this.disabledOption];
        }

        update()
        {
            this.element.className = this.canBeChanged() ? "" : "mpp-disabled";
            this.valueElement.innerHTML = this.getValue();
            this.delegate();
        }

        next()
        {
            this.currentOption = (this.currentOption + 1) % this.options.length;
            window.localStorage[this.id] = this.currentOption;
        }
    }

    /*
     * Class that collects and updates options
     */
    class MppAdvancedOptionCollection
    {
        constructor()
        {
            this.options = [];
        }

        addOption(option)
        {
            this.options.push(option);
            this[option.name] = option;
        }

        update()
        {
            for (var i = 0; i < this.options.length; ++i)
            {
                this.options[i].update();
            }
        }

        getOption(name)
        {
            return this[name];
        }

        initHtml(parent)
        {
            var settingsElement = (function()
                                   {
                var html = document.createElement("div");
                html.className = "mpp-settings";
                html.innerHTML = "<h2>Advanced Options</h2>";
                return parent.appendChild(html);
            })();

            var self = this;
            var onclick = function()
            {
                if (this.canBeChanged())
                {
                    this.next();
                    self.update();
                }
            };

            for (var i = 0; i < this.options.length; ++i)
            {
                var option = this.options[i];
                option.initHtml(settingsElement);
                option.element.addEventListener("click", onclick.bind(option));
            }

            this.update();
        }
    };


    /* Key event */
    function keyEvent(key)
    {
        var e = new KeyboardEvent("keydown",
        {
            code : key,
            key: key
        });
        document.dispatchEvent(e);
    }

    /* Removes a class from an element */
    function mppRemoveClass(element, className)
    {
        if (element.className.includes(className))
        {
            element.className = element.className.replace(" " + className, "");
            return true;
        }
        return false;
    }

    /* Adds a class to an element */
    function mppAddClass(element, className)
    {
        if(!element.className.includes(className))
        {
            element.className += " " + className;
            return true;
        }
        return false;
    }

    /* Add or remove class from root, depending on condition */
    function mppSetConditionalClass(element, condition, className)
    {
        return condition ? mppAddClass(element, className) : mppRemoveClass(element, className);
    }

    /* Add or remove class from root, depending on condition */
    function mppSetConditionalRootClass(condition, className)
    {
        return mppSetConditionalClass(document.getElementById("app"), condition, className);
    }

    /* Recursively search for element with class that contains a certain string */
    function mppGetElementByPartialClassName(element, className)
    {
        if (element.className.includes(className))
        {
            return element;
        }

        for (var i = 0; i < element.children.length; ++i)
        {
            var found = mppGetElementByPartialClassName(element.children[i], className);
            if (found)
            {
                return found;
            }
        }
        return null;
    }

    /*
     * We retrieve the raw Viewer object instantiated by Vue using a highly robust tree search
     * this guarantees we get it even if the userscript loads slightly delayed.
     */
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
                            return val; // Returns MangaPlus' Internal Viewer class!
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

    /*
     * Using MangaPlus's Webpack module cache, we can actively intercept class definitions
     * and overwrite their prototypes with hooks to automatically apply our settings to any future Viewers.
     */
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
        // If Webpack exposed the viewer class and we haven't intercepted it yet...
        if (classes && classes.Viewer && !classes.Viewer.prototype._mpp_preload_patched) {
            const origCreateSurface = classes.Viewer.prototype.createSurface;

            classes.Viewer.prototype.createSurface = function() {
                const promise = origCreateSurface.apply(this, arguments);
                window.mppViewer = this; // Capture the current viewer globally

                if (promise && typeof promise.then === 'function') {
                    promise.then(() => {
                        const val = mppSettings.getOption(MPP_PRELOAD).getValue();
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


    /* Init html */
    function mppInitHtml(header)
    {
        // Initial menu state
        try {
            const collapsed = window.localStorage.getItem("mpp-menu-collapsed") === "1";
            mppSetConditionalRootClass(collapsed, "mpp-menu-collapsed");
            if (collapsed) {
                window.dispatchEvent(new Event('resize'));
            }
        } catch(e) {}

        // Expand menu
        const htmlExpand = document.createElement("div");
        htmlExpand.className = "mpp-expand";
        htmlExpand.innerHTML = "&#9776;";
        htmlExpand.onclick = () => {
            mppSetConditionalRootClass(false, "mpp-menu-collapsed");
            localStorage.setItem("mpp-menu-collapsed", "0");
            window.dispatchEvent(new Event('resize'));
        }

        if(header.parentElement) {
            header.parentElement.appendChild(htmlExpand);
        }

        // Collapse menu
        const htmlCollapse = document.createElement("div");
        htmlCollapse.className = "mpp-collapse";
        htmlCollapse.innerHTML = "&#187;";
        htmlCollapse.onclick = () => {
            mppSetConditionalRootClass(true, "mpp-menu-collapsed");
            localStorage.setItem("mpp-menu-collapsed", "1");
            window.dispatchEvent(new Event('resize'));
        }

        if(header.firstChild) {
            header.insertBefore(htmlCollapse, header.firstChild);
        } else {
            header.appendChild(htmlCollapse);
        }

        // Comment link
        const htmlComments = document.createElement("div");
        htmlComments.className = "mpp-comments";
        let pathParts = window.location.pathname.split('/');
        let mangaId = pathParts.length > 2 ? pathParts[2] : "";
        htmlComments.innerHTML = `<a href="/comments/${mangaId}">Comments</a>`;
        header.appendChild(htmlComments);

        // Settings
        mppSettings.initHtml(header);

        // Navigation buttons
        const htmlNav = document.createElement("div");
        htmlNav.className = "mpp-nav";
        htmlNav.innerHTML = `<div id="mpp-nav-left" class="mpp-btn mpp-nav-btn ${READ_HORIZONTAL.isEnabled() ? "" : "mpp-disabled"}">Next</div>
                             <div id="mpp-nav-right" class="mpp-btn mpp-nav-btn ${READ_HORIZONTAL.isEnabled() ? "" : "mpp-disabled"}">Previous</div>`;
        header.appendChild(htmlNav);

        document.getElementById("mpp-nav-left").addEventListener("click", function(e)
        {
            if(READ_HORIZONTAL.isEnabled()) keyEvent("ArrowLeft");
        });

        document.getElementById("mpp-nav-right").addEventListener("click", function(e)
        {
            if(READ_HORIZONTAL.isEnabled()) keyEvent("ArrowRight");
        });

        // Go forward on image click
        let zao = document.getElementsByClassName("zao")[0];
        if(zao) {
            zao.addEventListener("click", function(e)
            {
                if (mppSettings[MPP_ALT_NAV].getValue() == "On")
                {
                    e.stopPropagation();

                    if (e.target.className == "zao-image")
                    {
                        keyEvent("ArrowLeft");
                    }
                }
            }, true);
        }
    }

    function mppInitApp()
    {
        if (mppLoadedUrl === window.location.href )
        {
            return;
        }

        mppLoadedUrl = window.location.href;
        if (!window.location.href.includes("mangaplus.shueisha.co.jp/viewer/"))
        {
            return;
        }

        var interval = setInterval(function()
        {
            mppInitPreloadPatch(); // Hook into webpack continuously until valid!

            var header = mppGetElementByPartialClassName(document.getElementById("app"), "Navigation-module_header_");
            if (header)
            {
                clearInterval(interval);
                mppInitHtml(header);
            }
        }, 50);
    }



    var mppLoadedUrl = null;


    /* Settings */
    var mppSettings = (function()
    {
        var settings = new MppAdvancedOptionCollection();

        settings.addOption(new MppAdvancedOption(MPP_ALT_NAV, READ_HORIZONTAL, ["Off", "On"], 0, 0, function()
        {
            mppSetConditionalRootClass(mppSettings[MPP_ALT_NAV].getValue() == "On", "mpp-alt-nav");
        }));

        settings.addOption(new MppAdvancedOption(MPP_SHOW_PROG, READ_HORIZONTAL, ["Off", "On"], 0, 0, function()
        {
            if (mppSetConditionalRootClass(settings.getOption(MPP_SHOW_PROG).getValue() == "Off", "mpp-no-progress-bar"))
            {
                window.dispatchEvent(new Event('resize'));
            }
        }));

        settings.addOption(new MppAdvancedOption(MPP_PRELOAD, null, PRELOAD_OPTS, 0, 0, function()
        {
            if (!window.mppViewer) window.mppViewer = mppGetViewerFromVue();

            if (window.mppViewer && window.mppViewer.surface) {
                const count = getPreloadCount(this.getValue());
                window.mppViewer.viewerData.options.preloadCount = count;
                // Re-trigger preload queue with the new limit
                window.mppViewer.surface.preloadPages(window.mppViewer.surface.currentPageNumber || 1);
            }
        }));

        return settings;
    })();


    /* HTML */
    window.addEventListener("load", mppInitApp);
    window.addEventListener("popstate", mppInitApp);

    // Allow context menu
    window.addEventListener("contextmenu", e => { e.stopPropagation(); }, true);

    // Allow middle mouse scrolling
    document.addEventListener("mousedown", function(e)
    {
        if (e && (e.which == 2 || e.button == 4 )) e.stopPropagation();
    }, true);

    // Allow page refresh
    document.addEventListener("keydown", function(e)
    {
        if (e.key == "BrowserRefresh" || e.key == "F5" || e.key == "F11") e.stopPropagation();
    }, true);

    // Refresh UI
    document.addEventListener("click", function(e)
    {
        if (mppLoadedUrl)
        {
            setTimeout(() =>
            {
                if (mppLoadedUrl != window.location.href)
                {
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

    // Initial backup trigger
    // In case the prototype hook misses but Preload is toggled ON from prior localStorage state
    setTimeout(() => {
        const val = mppSettings.getOption(MPP_PRELOAD).getValue();
        if (val !== "Default (5)") {
            if (!window.mppViewer) window.mppViewer = mppGetViewerFromVue();
            if (window.mppViewer && window.mppViewer.surface) {
                window.mppViewer.viewerData.options.preloadCount = getPreloadCount(val);
                window.mppViewer.surface.preloadPages(window.mppViewer.surface.currentPageNumber || 1);
            }
        }
    }, 2000);

})();

(function() {
    function movePageNumber() {
        const pageNumberEl = document.querySelector('p[class*="Viewer-module_pageNumber"]');
        if (!pageNumberEl) return;

        const targetContainer = document.querySelector('div[class*="Navigation-module_headerLeft"]');
        if (!targetContainer) return;

        if (targetContainer.contains(pageNumberEl)) return;

        if(pageNumberEl.parentNode) pageNumberEl.parentNode.removeChild(pageNumberEl);
        targetContainer.appendChild(pageNumberEl);

        pageNumberEl.style.position = 'static';
        pageNumberEl.style.marginTop = '0.5em';
    }

    window.addEventListener('load', () => {
        movePageNumber();
        let tries = 0;
        const interval = setInterval(() => {
            movePageNumber();
            tries++;
            if (tries > 10) clearInterval(interval);
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
