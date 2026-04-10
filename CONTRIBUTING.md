# Contributing to BigQueryORM

Thank you for your interest in contributing to BigQueryORM! This document provides guidelines and instructions for contributing.

## Development Setup

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/cirebox/bigqueryorm.git
   cd bigqueryorm
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run tests**
   \`\`\`bash
   npm test
   \`\`\`

4. **Build the project**
   \`\`\`bash
   npm run build
   \`\`\`

## Code Style

- Use **Prettier** for code formatting: \`npm run format\`
- Use **ESLint** for linting: \`npm run lint\`
- Fix linting issues: \`npm run lint:fix\`

## Commit Messages

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

- \`feat:\` - New feature
- \`fix:\` - Bug fix
- \`docs:\` - Documentation changes
- \`test:\` - Adding or updating tests
- \`chore:\` - Maintenance tasks
- \`refactor:\` - Code refactoring

Example:
\`\`\`
feat: add support for ARRAY type columns
fix: correct timestamp format in toBQObject
docs: update README with new examples
\`\`\`

## Pull Request Process

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature/my-new-feature\`
3. Make your changes and add tests
4. Ensure all tests pass: \`npm test\`
5. Commit your changes with a descriptive message
6. Push to your fork and submit a Pull Request

## Reporting Issues

- Use GitHub Issues to report bugs or feature requests
- Include a clear description, steps to reproduce, and expected behavior
- For bugs, include relevant code snippets and error messages

## License

By contributing, you agree that your contributions will be licensed under the MIT License.