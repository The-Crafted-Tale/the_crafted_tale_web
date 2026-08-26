// @ts-check
/**
 * ESLint Flat Config — Nuxt 4 + Bun + TypeScript + SCSS
 * Composition API · Arrow functions · No Prettier
 *
 * How it works:
 *  - `withNuxt` wraps the auto-generated .nuxt/eslint.config.mjs (project-aware)
 *  - We append custom flat config blocks for TS, Vue, style, and ignores
 *  - Stylistic rules replace Prettier (formatting enforced by ESLint itself)
 *
 * Requires in nuxt.config.ts:
 *   modules: ['@nuxt/eslint']
 *   eslint: { config: { stylistic: true } }
 */

import withNuxt from "./.nuxt/eslint.config.mjs"

export default withNuxt(

  // ─── 1. GLOBAL IGNORES ───────────────────────────────────────────────────
  {
    ignores: [
      "**/node_modules/**",
      "**/.nuxt/**",
      "**/.output/**",
      "**/dist/**",
      "**/public/**",
      "**/*.min.js",
      "bun.lockb",
    ],
  },

  // ─── 2. TYPESCRIPT — all .ts files ───────────────────────────────────────
  {
    files: ["**/*.ts"],
    rules: {
      // Disallow `any` — use `unknown` instead and narrow types explicitly
      "@typescript-eslint/no-explicit-any": "error",

      // Require explicit return types on functions (catches silent `undefined`)
      "@typescript-eslint/explicit-function-return-type": ["warn", {
        allowExpressions: true, // const fn = () => {} is fine
        allowTypedFunctionExpressions: true,
      }],

      // Prevent unused variables — prefix with _ to intentionally skip
      "@typescript-eslint/no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      }],

      // Prefer `interface` over `type` for object shapes (easier to extend)
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],

      // Always use `import type` for type-only imports (tree-shaking friendly)
      "@typescript-eslint/consistent-type-imports": ["error", {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      }],

      // No non-null assertions `!` — handle nulls explicitly
      "@typescript-eslint/no-non-null-assertion": "warn",

      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-invalid-void-type": "off",
      "@typescript-eslint/no-extraneous-class": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/ban-ts-comment": ["error", {
        "ts-expect-error": "allow-with-description",
        "ts-ignore": false,
        "ts-nocheck": false,
        "ts-check": false,
      }],
    },
  },

  // ─── 3. VUE — .vue files (Composition API + arrow functions) ─────────────
  {
    files: ["**/*.vue"],
    rules: {
      "vue/html-indent": "off",

      "vue/attributes-per-line": "off",

      // Enforce <script setup> — the Composition API standard in Nuxt 4
      "vue/component-api-style": ["error", ["script-setup"]],

      // Component names must be multi-word (e.g. UserCard, not Card)
      // Exceptions: pages and layouts follow Nuxt file conventions
      "vue/multi-word-component-names": ["error", {
        ignores: [
          "index", "default", "error",
          "[...slug]", "[slug]",
          "Testimonials",
          "about", "contact", "privacy", "terms",
        ],
      }],

      // Props must have types defined
      "vue/require-prop-types": "error",

      // Enforce v-bind shorthand: `:prop` not `v-bind:prop`
      "vue/v-bind-style": "error",

      // Enforce v-on shorthand: `@click` not `v-on:click`
      "vue/v-on-style": "error",

      // Self-close tags with no content: <MyComp /> not <MyComp></MyComp>
      "vue/html-self-closing": ["error", {
        html: { void: "always", normal: "always", component: "always" },
        svg: "always",
        math: "always",
      }],

      // No unused component registrations or variables in <template>
      "vue/no-unused-vars": "error",

      // Consistent order: <script> → <template> → <style> (Nuxt convention)
      "vue/block-order": ["error", {
        order: ["template", "script", "style"],
      }],

      // Enforce defineProps/defineEmits order consistency
      "vue/define-macros-order": ["error", {
        order: ["defineOptions", "defineProps", "defineEmits", "defineSlots"],
      }],

      "vue/no-v-html": "off",
      "vue/html-closing-bracket-newline": ["error", {
        singleline: "never",
        multiline: "never",
      }],
      "vue/multiline-html-element-content-newline": ["error", {
        ignoreWhenEmpty: true,
        allowEmptyLines: true,
      }],
      "vue/first-attribute-linebreak": "off",
      "vue/max-attributes-per-line": "off",
      "vue/max-len": ["error", {
        code: 180,
        template: 180,
        comments: 180,
        ignoreUrls: true,
        ignoreHTMLAttributeValues: true,
        ignoreHTMLTextContents: true,
      }],
      "vue/no-reserved-component-names": ["error", {
        disallowVueBuiltInComponents: false,
        disallowVue3BuiltInComponents: false,
      }],
      "vue/component-name-in-template-casing": ["error", "kebab-case"],
      "vue/component-definition-name-casing": ["error", "PascalCase"],
      "vue/no-unused-components": "error",
      "vue/require-v-for-key": "error",
      "vue/no-use-v-if-with-v-for": "error",
      "vue/require-default-prop": "error",
    },
  },

  // ─── 4. GENERAL JS/TS — arrow functions + code style ─────────────────────
  {
    files: ["**/*.{ts,js,mjs,vue}"],
    rules: {
      // ── Arrow functions (your project standard) ──────────────────────────
      // Enforce arrow functions for callbacks and expressions
      "prefer-arrow-callback": "error",

      // Arrow function body: use braces only when needed
      "arrow-body-style": ["error", "as-needed"],

      // ── Variables ────────────────────────────────────────────────────────
      // No `var` — use `const` or `let`
      "no-var": "error",

      // Use `const` when variable is never reassigned
      "prefer-const": "error",

      // ── Imports ──────────────────────────────────────────────────────────
      // No duplicate imports from the same module
      "no-duplicate-imports": "error",

      // ── Code quality ─────────────────────────────────────────────────────
      // No `console.log` left in production — use a logger instead
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],

      // No `debugger` statements
      "no-debugger": "error",

      // Require `===` and `!==` (no loose equality)
      "eqeqeq": ["error", "always", { null: "ignore" }],

      // Prefer template literals over string concatenation
      "prefer-template": "error",

      // Use object destructuring where possible
      "prefer-destructuring": ["warn", {
        array: false, // array destructuring can be confusing, skip
        object: true,
      }],

      // ── Error detection ──────────────────────────────────────────────────
      "no-undef": "error",
      "no-unreachable": "error",
      "no-duplicate-case": "error",
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-func-assign": "error",
      "no-inner-declarations": "error",
      "no-invalid-regexp": "error",
      "no-irregular-whitespace": "error",
      "no-obj-calls": "error",
      "no-sparse-arrays": "error",
      "use-isnan": "error",
      "valid-typeof": "error",

      // ── Best practices ───────────────────────────────────────────────────
      "curly": ["error", "all"],
      "default-case": "error",
      "dot-notation": "error",
      "no-alert": "warn",
      "no-caller": "error",
      "no-case-declarations": "error",
      "no-empty-pattern": "error",
      "no-eval": "error",
      "no-extend-native": "error",
      "no-extra-bind": "error",
      "no-fallthrough": "error",
      "no-floating-decimal": "error",
      "no-global-assign": "error",
      "no-implied-eval": "error",
      "no-iterator": "error",
      "no-labels": "error",
      "no-lone-blocks": "error",
      "no-loop-func": "error",
      "no-multi-str": "error",
      "no-new": "error",
      "no-new-func": "error",
      "no-new-wrappers": "error",
      "no-octal": "error",
      "no-octal-escape": "error",
      "no-redeclare": "error",
      "no-return-assign": ["error", "always"],
      "no-script-url": "error",
      "no-self-assign": "error",
      "no-self-compare": "error",
      "no-sequences": "error",
      "no-throw-literal": "error",
      "no-unmodified-loop-condition": "error",
      "no-unused-expressions": "error",
      "no-useless-call": "error",
      "no-useless-concat": "error",
      "no-useless-escape": "error",
      "no-void": "error",
      "no-with": "error",
      "wrap-iife": ["error", "any"],
      "yoda": "error",
      "one-var": ["error", "never"],
      "no-else-return": "error",
      "func-style": ["error", "expression", { allowArrowFunctions: true }],
      "max-statements": ["error", 50],
      "max-params": ["error", 5],
      "padding-line-between-statements": [
        "warn",
        {
          blankLine: "always",
          prev: "*",
          next: ["block", "block-like", "case", "class", "const", "continue", "debugger", "default", "do", "export", "for", "function", "if", "let", "return", "switch", "throw", "try", "var", "while", "with"],
        },
        {
          blankLine: "always",
          prev: ["block", "block-like", "case", "class", "const", "continue", "debugger", "default", "do", "export", "for", "function", "if", "let", "return", "switch", "throw", "try", "var", "while", "with"],
          next: "*",
        },
      ],
    },
  },

  // ─── 5. STYLISTIC — formatting (replaces Prettier) ───────────────────────
  // These rules are powered by @stylistic/eslint-plugin (auto-enabled by
  // @nuxt/eslint when `eslint.config.stylistic: true` is set in nuxt.config.ts)
  {
    files: ["**/*.{ts,js,mjs}"],
    rules: {
      "@stylistic/quotes": ["error", "double", { avoidEscape: true }],
      "@stylistic/semi": ["error", "never"], // no semicolons
      "@stylistic/indent": ["error", 2], // 2-space indent
      "@stylistic/comma-dangle": ["error", "always-multiline"],
      "@stylistic/arrow-parens": ["error", "always"], // (x) => not x =>
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/space-before-function-paren": ["error", {
        anonymous: "never",
        named: "never",
        asyncArrow: "always",
      }],
      "@stylistic/max-len": ["warn", { code: 180, ignoreUrls: true, ignoreStrings: true }],
      "@stylistic/no-extra-semi": "error",
      "@stylistic/eol-last": ["error", "always"],
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/no-multi-spaces": "error",
      "@stylistic/array-bracket-spacing": ["error", "never"],
      "@stylistic/computed-property-spacing": ["error", "never"],
      "@stylistic/space-before-blocks": "error",
      "@stylistic/space-in-parens": ["error", "never"],
      "@stylistic/space-infix-ops": "error",
      "@stylistic/keyword-spacing": ["error", { before: true, after: true }],
      "@stylistic/arrow-spacing": ["error", { before: true, after: true }],
      "@stylistic/no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0, maxBOF: 0 }],
      "@stylistic/padded-blocks": ["error", "always"],
    },
  },

  // ─── 6. DISABLE @stylistic IN .vue FILES ────────────────────────────────
  // @nuxt/eslint's generated config applies @stylistic rules to all files.
  // Vue files are handled by vue/* rules; stylistic formatting causes conflicts.
  {
    files: ["**/*.vue"],
    rules: {
      "@stylistic/semi": "off",
      "@stylistic/quotes": "off",
      "@stylistic/indent": "off",
      "@stylistic/comma-dangle": "off",
      "@stylistic/arrow-parens": "off",
      "@stylistic/object-curly-spacing": "off",
      "@stylistic/space-before-function-paren": "off",
      "@stylistic/max-len": "off",
      "@stylistic/no-extra-semi": "off",
      "@stylistic/eol-last": "off",
      "@stylistic/no-trailing-spaces": "off",
      "@stylistic/no-multi-spaces": "off",
      "@stylistic/array-bracket-spacing": "off",
      "@stylistic/computed-property-spacing": "off",
      "@stylistic/space-before-blocks": "off",
      "@stylistic/space-in-parens": "off",
      "@stylistic/space-infix-ops": "off",
      "@stylistic/keyword-spacing": "off",
      "@stylistic/arrow-spacing": "off",
      "@stylistic/no-multiple-empty-lines": "off",
      "@stylistic/padded-blocks": "off",
      "@stylistic/padding-line-between-statements": "off",
    },
  },

  // ─── 7. PER-FILE OVERRIDES ───────────────────────────────────────────────
  {
    files: [
      "app/pages/privacy.vue",
      "app/pages/terms.vue",
    ],
    rules: {
      "vue/max-len": "off",
    },
  },

  // OG image templates are named by nuxt-og-image convention:
  // `<Name>.<renderer>.vue`, e.g. `Default.takumi.vue`. The filename is what
  // `defineOgImageComponent("Default")` resolves, so it cannot be multi-word.
  {
    files: ["app/components/OgImage/**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },

  // ─── 8. NUXT OVERRIDES — relax certain rules for Nuxt-specific files ─────
  {
    files: [
      "nuxt.config.ts",
      "app.config.ts",
      "server/**/*.ts",
      "composables/**/*.ts",
      "plugins/**/*.ts",
    ],
    rules: {
      // Server routes and config files often need `any` for flexibility
      "@typescript-eslint/no-explicit-any": "warn",

      // Nuxt auto-imports mean explicit return types are less critical here
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },

)

// ─── nuxt.config.ts reminder ─────────────────────────────────────────────────
//
// Make sure your nuxt.config.ts has:
//
// export default defineNuxtConfig({
//   modules: ['@nuxt/eslint'],
//   eslint: {
//     config: {
//       stylistic: true,   // enables @stylistic rules (section 5 above)
//     },
//   },
// })
