// @ts-check

/**
 * @typedef {Object} ExtendedOptions
 * @property {string} [$schema]
 */

/** @type {import('prettier').Config & ExtendedOptions} */
export default {
    $schema: 'http://json.schemastore.org/prettierrc',
    arrowParens: 'avoid',
    bracketSameLine: true,
    bracketSpacing: true,
    endOfLine: 'lf',
    jsxSingleQuote: true,
    printWidth: 120,
    proseWrap: 'preserve',
    quoteProps: 'consistent',
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
    useTabs: false,
    tabWidth: 4,

    overrides: [{ files: '*.json', options: { parser: 'json' } }],
}
