# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.5] - 2026-04-10

### Changed
- Fixed README encoding issues (UTF-8)
- Improved README with badges and better documentation
- Added `.npmignore` to exclude example and tests from npm package
- Updated `package.json`: added author, fixed homepage URL, added test scripts
- Bumped version from 1.0.4 to 1.0.5

### Added
- Jest configuration for unit testing
- GitHub Actions CI/CD pipeline (lint, test, build)
- `npm publish` step on main branch push
- Test coverage reporting

## [1.0.4] - 2024-10-23

### Added
- Initial release on npm
- Decorators: `@Dataset`, `@Table`, `@Column`, `@Index`
- Query Builders: Select, Insert, Update, Delete
- BigQueryRepository for CRUD operations
- Support for partitioning and clustering
- Example project with Inversify DI