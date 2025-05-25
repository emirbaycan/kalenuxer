# kalenuxer

A scalable, modular, and fully-automated web project framework and code utility set for Node.js. *Built for multi-site, multi-language, rapid deployment environments.*

---

## Table of Contents

* [Project Overview](#project-overview)
* [Folder Structure](#folder-structure)
* [Core: ](#core-lib-module-structure)[`/lib`](#core-lib-module-structure)[ Module Structure](#core-lib-module-structure)
* [Website Projects: ](#website-projects-websiteswebsitename)[`/websites/website_name`](#website-projects-websiteswebsitename)

  * [datas/ Directory](#datas-directory)
  * [dist/ Directory](#dist-directory)
  * [store/ Directory](#store-directory)
  * [site/ Directory & Automation](#site-directory--automation)
* [Automatic Asset & Template Binding](#automatic-asset--template-binding)
* [Templating Language Features](#templating-language-features)
* [Language-Specific Routing and Path-Sensitive Data](#language-specific-routing-and-path-sensitive-data)
* [Dynamic Output Filename with "page" Key](#dynamic-output-filename-with-page-key)
* [Advanced Features](#advanced-features)
* [Build & Deployment Process](#build--deployment-process)
* [Typical Usage Workflow](#typical-usage-workflow)
* [Development, Contribution, and Best Practices](#development-contribution-and-best-practices)
* [License](#license)
* [Author](#author)
* [Quick Start](#quick-start)

---

## Project Overview

**kalenuxer** is a Node.js-based framework designed to organize, automate, and scale multiple web projects with reusable modules, asset automation, and advanced file binding logic. It supports multi-language content, template injection, automatic asset compilation, and versioning—all optimized for professional development and rapid deployment.

---

## Folder Structure

```
kalenuxer/
├── lib/               # Core utility and processing modules (shared)
├── websites/          # Isolated website projects
├── node_modules/      # Node.js dependencies
├── package.json
├── run.js             # Entrypoint/main runner script
└── README.md
```

---

## Core: `/lib` Module Structure

All core logic and utilities reside under `lib/`, grouped by function. This is where all data manipulation, template processing, and utility helpers live.

```
lib/
├── general/       # General-purpose JS helpers: data, merging, replacements, timers, etc.
│   ├── adjustments.js
│   ├── data_handler.js
│   ├── for_eachs.js
│   ├── html_functions.js
│   ├── merge_jsons.js
│   ├── oncer.js
│   ├── replacements.js
│   └── timers.js
│
├── prepare/       # Pre-processing, file transforms, source code automation
│   ├── main.js
│   ├── api/         # API source manipulation (e.g., PHP, Laravel)
│   ├── css/         # CSS preprocessing, obfuscation, combining
│   ├── fonts/       # Font helpers
│   ├── general/     # Generic pre-processors and translators
│   ├── handler/     # Request handlers
│   ├── html/        # HTML template, linking, and content logic
│   ├── icons/       # Icon manipulation and automation
│   ├── img/         # Image asset helpers
│   ├── js/          # JS file manipulation, obfuscation
│   ├── plugins/     # Plugin logic
│   ├── statics/     # Static file helpers
│   ├── svgs/        # SVG logic and batch operations
│   └── vendor/      # Third-party/Vendor integrations
│
└── release/        # Build/release helpers (planned)
```

All submodules can be used independently or chained in workflows.

---

## Website Projects: `/websites/website_name`

Every website is an isolated project under `websites/website_name/`. This allows for unlimited parallel sites, themes, or client projects in a single kalenuxer repository.

Example structure:

```
websites/
└── website_name/
    ├── datas/
    ├── dist/
    ├── store/
    └── site/
```

### datas/ Directory

**Purpose:**

* Contains all *content* and *language files* for the website.
* Organized by content type (`html/`, `css/`, `js/`, `php/`, etc.)
* Each folder contains JSON files, e.g.:

  * `tr.json`, `en.json`, `ar.json`, `general.json`
  * Main site options/config: `options.json`, `templates.json`, `html.json`

**Example:**

```
datas/
├── css/
├── html/
│   ├── tr.json
│   ├── en.json
│   ├── ar.json
│   └── general.json
├── js/
├── php/
├── html.json
├── options.json
└── templates.json
```

* Add new languages/content types by simply creating a new JSON file. System auto-detects.

### dist/ Directory

**Purpose:**

* Holds the compiled (build) and production-ready output.
* Contains `test/` and `release/` for build environments.

**Example:**

```
dist/
├── test/       # For test builds
└── release/    # For live/production deployment
```

* After build (via gulp or other runner), all static files and assets are here.

### store/ Directory

**Purpose:**

* Stores versioned files, historical backups, or site snapshots.
* Managed by kalenuxer for backup, rollback, or comparison purposes.

### site/ Directory & Automation

**Purpose:**

* All actual code and asset sources for the site.
* Contains every element of the website (HTML, CSS, JS, icons, APIs, etc.).

**Key Directories:**

```
site/
├── api/                # Backend endpoints (Node, PHP, etc.)
├── css/                # Stylesheets (mirrored by structure to html/)
├── database/           # SQL or DB schema files
├── font/               # Font assets
├── handler/            # Public files, .htaccess, sitemaps, robots.txt, etc.
├── html/               # Page templates, HTML partials and main content
├── html_functions/     # HTML-specific JS helpers
├── icons/              # Icon SVG sets (see below)
├── img/                # Image assets
├── js/                 # Javascript (mirrored by structure to html/)
├── plugins/            # Plugins, add-ons
├── static_templates/   # Ready-to-use static HTML templates
├── svgs/               # SVG icon sources (see below)
├── template/           # Dynamic HTML template snippets
├── vendor/             # Third-party scripts/libraries
└── z/                  # Temporary, experimental or legacy files (optional)
```

#### Directory Explanations

* **api/**: Backend logic, endpoints, and server-side code (Node.js, PHP, etc.).
* **css/**: Stylesheets. Folder structure mirrors `html/` for automatic asset binding. E.g., `css/main/pages/about.css` auto-included in `html/main/pages/about.kalenux.html`.
* **database/**: SQL schemas or data files specific to the site.
* **font/**: Custom or third-party font files.
* **handler/**: Public folder; all contents are copied as-is to the build output (for files like `.htaccess`, `robots.txt`, `sitemap.xml`, etc.).
* **html/**: All main page templates and HTML partials. **All HTML and template files must have the ****\`\`**** extension for automatic processing and asset binding.**
* **html\_functions/**: Javascript helper modules for HTML processing.
* **icons/**: SVG icon sets, organized by section (e.g. `main/`, `panel/`, and `general/`). `general/` icons are injected globally. All icons are processed and uploaded to the server during build (e.g., with gulp).
* **img/**: Image assets.
* **js/**: Javascript source files. Folder structure mirrors `html/` for automatic binding. E.g., `js/main/pages/about.js` auto-included in `html/main/pages/about.kalenux.html`.
* **plugins/**: Plugins and add-ons for the site.
* **static\_templates/**: Static, ready-to-use HTML skeletons/templates.
* **svgs/**: Standalone SVG sources. SVGs here are auto-registered and referenced in HTML using `{svg_icon_name}`.
* **template/**: Dynamic HTML snippets or partials for inclusion, accessible via `!template_name!` notation.
* **vendor/**: Third-party scripts, libraries, and assets.
* **z/**: Temporary, experimental, or legacy files. Not required for production.

---

## Automatic Asset & Template Binding

* **File Structure Matters:** Any `.kalenux.html` or `.kalenux.php` file in the `html/` or `template/` directory will automatically receive its corresponding CSS and JS files if they exist in `css/` and `js/` with the same relative path and filename.

  **Example:**

  * `html/main/pages/about.kalenux.html`
  * `css/main/pages/about.css` → automatically linked
  * `js/main/pages/about.js`   → automatically linked

* **Global Inheritance:**

  * Files under `css/main/general/general.css` or `js/main/general/general.js` are injected into all HTML files in `html/main/` and its subdirectories.

* **Icons & SVGs:**

  * SVG files in `icons/general/` are injected into all icon sets (`main/`, `panel/`, etc.).
  * SVGs in `svgs/` can be referenced using `{svg_icon_name}` in any HTML content. The build process resolves these dynamically based on language/content mapping.

* **Templates:**

  * Files in the `template/` directory can be injected anywhere using the `!template_name!` notation inside `.kalenux.html` or content JSON.

* **handler/**

  * Used for any files that must be copied to the output without changes (e.g., `.htaccess`, `sitemap.xml`, robots).

**File Naming Rule:** All HTML and template files to be processed automatically must be named as `filename.kalenux.html` or `filename.kalenux.php`. This extension is required for automatic asset inclusion, template injection, and all pipeline automation.

* The structure is designed for maximum automation and minimal manual linking. To add a new page or component, simply create the HTML file with the `.kalenux.html` (or `.kalenux.php`) extension, and any CSS or JS with a matching path/name will be injected automatically during the build process.

---

## Templating Language Features

**kalenuxer** includes a custom templating language that can be used in HTML, JS, and CSS files to inject data, loop through arrays, and include external template files or CSS chunks. Here are the main features and usage examples:

### HTML Templating

**1. Variable Injection** Define your variables in your language/content JSON file, for example:

```json
{
  "title": "Home Page"
}
```

Usage in HTML:

```html
<meta name="title" value="{title}">
<!-- Result after build: <meta name="title" value="Home Page"> -->
```

**2. Array Looping** Given a JSON array in your data file:

```json
"services": [
  {"header":"A Service"},
  {"header":"B Service"}
]
```

You can loop through this array in HTML:

```html
[services]
@header@
[services]
<!-- Output:
A Service
B Service
-->
```

Or for HTML blocks:

```html
<ul>
[services]
<li>@header@</li>
[services]
</ul>
<!-- Output:
<ul>
  <li>A Service</li>
  <li>B Service</li>
</ul>
-->
```

**3. Including HTML Templates** If you have a file called `top.kalenux.html` in the template folder's `main/general` directory with some HTML code:

```html
<html><head>
```

You can include this file in any HTML file inside or under the `main` folder using:

```html
!top! <-- write tags --> </head>
```

The contents of `top.kalenux.html` will be injected at the position of `!top!`.

### JS Templating

**1. Variable Injection** You can use `@variable_name@` in your JS files to inject text values from the content JSON file.

```js
const pageTitle = '@title@';
```

**2. Array/Object Injection** For array/object data, the syntax:

```js
__array_name = { "!key!": "!value!" }
```

will be replaced with the data defined in your JSON.

### CSS Templating

**1. CSS File Inclusion** You can include the CSS code from a file that exists in `/css/lib/` by using:

```css
!file_name!
```

For example, if there is a file named `reset.css` in `/css/lib/`, then using `!reset!` in another CSS file will inject the contents of `reset.css`.

---

## Language-Specific Routing and Path-Sensitive Data

#### 1. Language-Aware "subs" Routing for URLs

Within each language file under `datas/html/`, you can define a `subs` array in the `general` object. The build process will automatically \*\*map each sub-folder name under \*\*\`\` to the corresponding values in each language's `subs` definition. This allows you to generate **different URL paths per language** for SEO-friendly, native navigation.

**Example structure:** *tr.json*

```json
{
  "general": {
    "subs": [
      { "key": "services", "value": "hizmetler" },
      { "key": "products", "value": "urunler" }
    ]
  }
}
```

*en.json*

```json
{
  "general": {
    "subs": [
      { "key": "services", "value": "services" },
      { "key": "products", "value": "products" }
    ]
  }
}
```

**How it works:**

* If you have `/html/main/products/services.kalenux.html`, the build will generate routes like:

  * `/urunler/hizmetler` for Turkish (tr)
  * `/products/services` for English (en)
* The "key" matches the internal folder/file name; the "value" is the external, language-specific slug or segment.

#### 2. Path-Sensitive Values in datas/ (html, js, css, php)

All language and content files in `datas/html/`, `datas/js/`, `datas/css/`, and `datas/php/` are **sensitive to directory and file path structure.**

* The main object can contain nested objects (like `pages`, `main`, etc.), and within each, you can define values **specific to exact file paths**.

**Example structure:**

```json
{
  "main": {
    "pages": {
      "about": {
        "title": "About Us",
        "description": "Learn about our company"
      },
      "services": {
        "title": "Our Services",
        "description": "What we offer"
      }
    },
    "general": {
      "companyName": "Kalenuxer Inc."
    }
  }
}
```

* The build process injects `"title"` and `"description"` from `main.pages.about` into `/html/main/pages/about.kalenux.html`, etc.
* Keys under `"main.general"` apply to **all files inside ****\`\`**** and its subfolders**, serving as *global variables for that path*.

**Summary of Key Features:**

* **Language-specific sub-routing:** Generate unique, localized URLs by defining `subs` mappings for each language.
* **Path-sensitive variables:** Insert any custom values (titles, metadata, configs) at any file or folder level; use `"general"` to create variables available to all files in that path.
* **Automatic injection:** All variables, including `subs`, are auto-injected during build; manual lookup or mapping is never required.

**This structure enables:**

* Effortless multi-language URL management
* Clean, maintainable content injection for all file types
* Maximum flexibility for growth and localization

**Example: Localized Route Generation**

* `/html/main/products/services.kalenux.html`

  * Turkish route: `/urunler/hizmetler`
  * English route: `/products/services`

**Example: Path-Sensitive Content Injection**

* Variable `"title"` in `main.pages.services` will be available in `/html/main/pages/services.kalenux.html`
* Variable `"companyName"` in `main.general` will be available in all `/html/main/` files

*Respect the directory structure and naming conventions for best results. All automation relies on this logic.*

---

## Dynamic Output Filename with "page" Key (continued)

During the build process, if you define a `"page"` key for any page inside your language file (e.g., `datas/html/tr.json`) following the directory/object path corresponding to the HTML file, the **compiled output file will be renamed to the value of this key**.

**Example:**

* **Source file:**  `sites/html/main/pages/home.kalenux.html`
* **Language definition (**\`\`**):**

  ```json
  {
    "main": {
      "pages": {
        "home": {
          "title": "Ana Sayfa",
          "page": "anasayfa"
        }
      }
    }
  }
  ```
* **Result after build:**  The compiled file will be output as: `anasayfa.html` (for Turkish build)

**How it works:**

* The builder looks up the path `main->pages->home` in the current language JSON.
* If a `"page"` key exists, it uses this value as the filename for the output HTML (or PHP).
* This allows you to easily localize URLs and file names per language without changing the actual folder or file structure.

**Use cases:**

* Effortless SEO-friendly URL and file naming for different languages.
* No need to manually rename or create copies for each locale.
* Can be combined with `"subs"` for fully dynamic, multi-language routing and slugs.

**Important:**

* If `"page"` is not defined, the original file name is used.
* You can safely use `"page"` in any language or path and have complete control over output names.

**Example Result:**

* English: `home.html`
* Turkish: `anasayfa.html`  (based on their respective `"page"` values)

*This feature is designed to support large-scale, multi-language web applications with minimal manual intervention and maximum automation.*

---

## Advanced Features

### 1. Automatic Cache Busting for Static Assets

For every `href` or `src` attribute inside HTML files, and for every link pointing to internal site folders like `img`, `js`, `css`, etc., the compiler automatically appends a query parameter with the last modification timestamp as a cache buster. This ensures that browsers always load the most recent version of your assets after deployment.

**Example:**

```html
<!-- Original HTML -->
<link rel="stylesheet" href="/css/main/pages/about.css">
<img src="/img/logo.png">
<script src="/js/main/pages/about.js"></script>
```

**After compilation:**

```html
<link rel="stylesheet" href="/css/main/pages/about.css?_t=mcbyimm1nyiibcnab">
<img src="/img/logo.png?_t=mcbyimm1nyiibcnab">
<script src="/js/main/pages/about.js?_t=mcbyimm1nyiibcnab"></script>
```

* The `?_t=mcbyimm1nyiibcnab` (or similar) value is a unique string generated from the file’s last modification timestamp.
* This eliminates the need for manual versioning or cache clearing.

---

### 2. Obfuscation: Automatic Minification and Renaming of Classes, IDs, and Functions

The kalenuxer compiler includes a powerful `obfuscate` function. If obfuscation is enabled, all HTML, JS, and CSS files are processed after compilation so that every `class`, `id`, and function name is replaced by a short, random, pre-generated identifier. This significantly increases code security and makes reverse engineering more difficult, as well as reducing file size.

**Example:**

*Before obfuscation:*

```html
<div class="class-name"><div class="class-name"></div></div>
<div class="class-name2"></div>
```

*After obfuscation:*

```html
<div class="a"><div class="a"></div></div>
<div class="b"></div>
```

* The same logic is applied to IDs and function names in both HTML and all referenced JS/CSS.
* The mapping is unique for each build and consistent within the same build (i.e., all references are correctly updated).

**How it works:**

* All class, id, and function names are parsed and replaced with short obfuscated names (e.g., `a`, `b`, `c`, ...).
* This is performed globally and ensures that all usage in HTML, CSS, and JS remains synchronized.

**Benefits:**

* Improves site performance by reducing file size.
* Makes it harder for competitors or bots to scrape and understand your site structure.
* Increases client-side security and protects intellectual property.

**Note:**

* Obfuscation is optional and can be toggled per build.
* Only affects output files; your source files remain clean and readable.

*These advanced features ensure your site is always fresh, secure, and production-ready with minimal manual work.*

---

## Build & Deployment Process

* Asset compilation, injection, and deployment is automated (typically via gulp or a custom runner).
* Any change to source files (css/js/html/icons/svg/templates) triggers a build, updating `dist/` for deployment.
* Asset pipeline resolves and injects all dependencies automatically based on directory and naming conventions.

---

## Typical Usage Workflow

1. **Add a new page:**

   * Create `html/main/pages/about.kalenux.html`.
   * Add optional `css/main/pages/about.css` and/or `js/main/pages/about.js`.
   * These CSS/JS files will be auto-included on the HTML page.

2. **Global styles/scripts:**

   * Place in `css/main/general/general.css` or `js/main/general/general.js` to be applied across all subpages.

3. **Add a new SVG icon:**

   * Place in `svgs/`, and reference as `{svg_icon_name}` in any HTML content or template.
   * The icon will be auto-included and mapped for all languages if defined.

4. **Templates:**

   * Add dynamic snippets to `template/` and call them in HTML with `!template_name!`.

5. **Add language/content:**

   * Add/extend JSON files in `datas/html/`, e.g. `en.json`, `tr.json`.
   * All new language keys or templates will be auto-detected and injected where needed.

6. **Build:**

   * Run the build pipeline (usually with gulp or your custom tool).
   * All assets, templates, icons, and configs are processed and output to `dist/`.

7. **Version/Backup:**

   * Previous builds are versioned and stored under `store/`.

---

## Development, Contribution, and Best Practices

* **Extending functionality:**

  * New modules should go under `lib/` in appropriate subfolders.
  * Each website is isolated, so new projects can be created by copying an existing structure.

* **Do not manually edit files in **\`\`** or ****\`\`****.**

* **All asset and language bindings are automated.**

  * Respect naming conventions and folder structure for best results.

* **Pull requests and contributions:**

  * Open an issue to discuss feature ideas or improvements.
  * Fork the repo and send a PR with clear commit messages.

* **Automate where possible:**

  * The philosophy of kalenuxer is zero manual asset linking or copying — let the system do it.

---

## License

[GPL-3.0 License](LICENSE)

---

## Author

Developed by [emirbaycan](https://github.com/emirbaycan)

---

## Quick Start

```sh
git clone https://github.com/emirbaycan/kalenuxer.git
cd kalenuxer
npm install
node run.js    # or start your own custom runner/build script
```

* To start a new site, copy `/websites/website_name/` structure.
* Edit/add files in `site/` and `datas/`, then build.
* Deploy files from `dist/release/`.

---

# End of README

If you have any questions, open an issue or contact the author via GitHub.

---
