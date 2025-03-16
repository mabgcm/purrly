module.exports = {
    parserOptions: {
        ecmaVersion: 8, // or whatever version you're using
    },
    env: {
        node: true,
        es6: true,
    },
    rules: {
        "no-unused-vars": ["error", { "varsIgnorePattern": "functions" }],
    },
};
