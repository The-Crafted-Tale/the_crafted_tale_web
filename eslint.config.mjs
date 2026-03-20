import withNuxt from "./.nuxt/eslint.config.mjs"
// import prettierPlugin from "eslint-plugin-prettier/recommended"

export default withNuxt({
  rules: {
    "vue/first-attribute-linebreak": "off",
    "vue/max-attributes-per-line": "off",
  },
})
