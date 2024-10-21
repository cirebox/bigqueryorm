import { Linter } from 'eslint'; // Importa os tipos do ESLint

const config: Linter.Config = {
  root: true, // Indica que este é o arquivo de configuração raiz para o ESLint
  env: {
    node: true, // Define que o ambiente será Node.js
    es2021: true, // Suporte para ES2021
  },
  parser: '@typescript-eslint/parser', // Define o parser do TypeScript
  parserOptions: {
    ecmaVersion: 2021, // Versão do ECMAScript que será utilizada
    sourceType: 'module', // Permite o uso de imports e exports
  },
  plugins: [
    '@typescript-eslint', // Adiciona o plugin do TypeScript
  ],
  extends: [
    'eslint:recommended', // Regras recomendadas do ESLint
    'plugin:@typescript-eslint/recommended', // Regras recomendadas do TypeScript
    'prettier', // Integração com Prettier para formatação de código
  ],
  rules: {
    'no-console': 'warn', // Aviso ao usar console.log
    'no-unused-vars': 'off', // Desativado porque o TypeScript já cuida disso
    '@typescript-eslint/no-unused-vars': ['error'], // Erro ao ter variáveis não utilizadas
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Não obriga definição de tipos explícitos nas funções
    '@typescript-eslint/no-explicit-any': 'warn', // Aviso ao usar "any"
    'prettier/prettier': ['error', { singleQuote: true, semi: true }], // Regras de formatação do Prettier
  },
};

export default config;