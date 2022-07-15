module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    // plugins: ['@typescript-eslint/eslint-plugin'],
    plugins: ['prettier'],
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        // 'prettier/prettier': [
        //     'error',
        //     {
        //         printWidth: 120,
        //         tabWidth: 4,
        //         useTabs: false,
        //         semi: false,
        //         singleQuote: true,
        //         jsxSingleQuote: false,
        //         requireConfig: false,
        //         trailingComma: 'es5',
        //         endOfLine: 'auto',
        //     },
        // ],
        '@typescript-eslint/no-useless-constructor': 'off',
    },
}
