# BigQueryORM

[![npm version](https://img.shields.io/npm/v/bigquery-orm.svg)](https://www.npmjs.com/package/bigquery-orm)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.11.1-brightgreen)](https://nodejs.org/)

**BigQueryORM** é uma biblioteca Object-Relational Mapping (ORM) especializada para interagir com o Google BigQuery usando Node.js. Ela fornece uma maneira intuitiva e tipada de realizar operações no BigQuery, mantendo a familiaridade de um ORM tradicional.

## Características

- Definição de datasets e tabelas usando decorators TypeScript
- Suporte para tipos de dados específicos do BigQuery
- Geração automática de esquemas para tabelas
- Query Builders tipados: Select, Insert, Update, Delete
- Repository pattern para operações CRUD
- Suporte para particionamento e clustering de tabelas
- Integração com autenticação do Google Cloud
- Paginação e ordenação com FindOptions

## Instalação

\\\ash
npm install bigquery-orm
\\\

### Peer Dependencies

\\\ash
npm install @google-cloud/bigquery dayjs reflect-metadata
\\\

## Uso Básico

### Definindo uma Entidade (Tabela)

\\\	ypescript
import { Column, Dataset, Index, Table } from 'bigquery-orm';
import { Type } from 'class-transformer';

@Dataset('meu_dataset')
@Table({ tableName: 'usuarios', partitionBy: 'DATE(created_at)', clusterBy: ['user_id'] })
@Index('user_id', 'event_type')
export class User {
  @Column({ name: 'USER_ID', type: 'STRING', mode: 'REQUIRED' })
  id!: string;

  @Column({ name: 'USER_NAME', type: 'STRING', mode: 'REQUIRED' })
  name!: string;

  @Column({ name: 'USER_AGE', type: 'FLOAT', mode: 'NULLABLE' })
  age?: number;

  @Column({ name: 'USER_ACTIVE', type: 'BOOLEAN', mode: 'NULLABLE' })
  isActive?: boolean;

  @Column({ name: 'CREATED_AT', type: 'TIMESTAMP', mode: 'REQUIRED' })
  createdAt!: Date;
}
\\\

### Criando um Repository

\\\	ypescript
import { BigQueryRepository } from 'bigquery-orm';

const userRepository = new BigQueryRepository<User>({
  projectId: process.env.GCP_PROJECT_ID!,
  keyFilename: process.env.GCP_KEY_FILE_PATH,
}, User);
\\\

### Operações CRUD

\\\	ypescript
// Find one
const user = await userRepository.findOne({
  where: { id: 'user-123' }
});

// Find many com paginação
const users = await userRepository.findMany({
  where: { isActive: true },
  order: { createdAt: 'DESC' },
  take: 10,
  skip: 0,
});

// Insert
const inserted = await userRepository.insert({
  id: 'user-456',
  name: 'João Silva',
  age: 28,
  isActive: true,
  createdAt: new Date(),
});

// Update
const updated = await userRepository.update(
  { id: 'user-456' },
  { name: 'João Santos', isActive: false }
);

// Delete
await userRepository.delete({ id: 'user-456' });
\\\

### Query Builder

\\\	ypescript
const result = await userRepository
  .createSelectBuilder()
  .select(['id', 'name', 'createdAt'])
  .where('isActive =', true)
  .orderBy('createdAt', 'DESC')
  .limit(100)
  .execute();
\\\

### Jobs Assíncronos

\\\	ypescript
const job = await userRepository.createQueryJob(
  SELECT *
  FROM \meu_dataset.usuarios\
  WHERE DATE(created_at) BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) AND CURRENT_DATE()
);

const status = await job.getStatus();
const [rows] = await job.getQueryResults();
\\\

## Arquitetura

\\\
decorators/         # @Dataset, @Table, @Column, @Index
enum/              # Tipos de campos e modos do BigQuery
find-options/      # FindManyOptions, FindOneOptions, Where
query-builder/     # Select, Insert, Update, Delete Builders
repository/        # BigQueryRepository (CRUD principal)
types/             # Metadados de colunas e tabelas
\\\

## Configuração

### Variáveis de Ambiente

\\\ash
GCP_PROJECT_ID=seu-project-id
GCP_KEY_FILE_PATH=./credentials.json
\\\

### Autenticação

O BigQueryORM utiliza as mesmas opções de autenticação do @google-cloud/bigquery:

1. **Service Account Key File** (recomendado):
   \\\	ypescript
   new BigQueryRepository({ keyFilename: './key.json' }, Entity)
   \\\

2. **Application Default Credentials**:
   \\\	ypescript
   new BigQueryRepository({ projectId: 'meu-projeto' }, Entity)
   \\\

## Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o repositório
2. Crie uma branch para sua feature (\git checkout -b feature/nova-funcionalidade\)
3. Commit suas mudanças (\git commit -m 'feat: adiciona nova funcionalidade'\)
4. Push para a branch (\git push origin feature/nova-funcionalidade\)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Autor

**Eric Pereira** - [github.com/cirebox](https://github.com/cirebox)
