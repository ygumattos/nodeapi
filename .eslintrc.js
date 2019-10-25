module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier' 
  ],
  plugins: ['prettier'], 
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier": "error", //Informar que qualquer problema do prettier, retorne erro
    "class-methods-use-this": "off", //Tira a obrigação do uso do this
    "no-param-reassign" : "off", //Permite receber e alterar parametros
    "camelcase":"off", //Tirar o padrão camelcase
    "no-unused-vars": ["error", { "argsIgnorePattern": "next"}] // Proibe a permanencia 
    //de variaveis sem uso, com exceção do next                                                             //eu não vá utilizar, com exceção do                                                            //'next'
  },
};