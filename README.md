# BigQueryORM

BigQueryORM é uma biblioteca Object-Relational Mapping (ORM) especializada para interagir com o Google BigQuery usando Node.js. Ela fornece uma maneira intuitiva e tipada de realizar operações no BigQuery, mantendo a familiaridade de um ORM tradicional.

## Características

- Definição de datasets e tabelas usando classes e decorators
- Suporte para tipos de dados específicos do BigQuery
- Geração automática de esquemas para tabelas do BigQuery
- Métodos para execução de consultas e carregamento de dados
- Integração com a autenticação do Google Cloud
- Suporte para particionamento e agrupamento de tabelas
- Gerenciamento de jobs do BigQuery

## Instalação

```bash
npm install bigquery-orm
```

## Uso Básico

### Definindo uma Entidade (Tabela)

```javascript
import { Column, Dataset, Index, Table } from "../../src/decorators";

@Dataset('integration_teste_system')
@Table({ tableName: 'user_teste', partitionBy: 'DATE(timestamp)', clusterBy: ['user_id'] })
@Index('user_id', 'event_type')
export class User {
  @Column({ name: 'USER_ID', type: 'STRING', mode: "REQUIRED" })
  id!: string;

  @Column({ name: 'USER_NAME', type: 'STRING', mode: "REQUIRED" })
  name!: string;

  @Column({ name: 'USER_AGE', type: 'FLOAT', mode: "NULLABLE", description: "IDADE" })
  age?: number;

  @Column({ name: 'USER_ACTIVE', type: 'BOOLEAN', mode: "NULLABLE" })
  isActive?: boolean;

  @Column({ name: 'USER_CREATEAT', type: 'DATE', mode: "NULLABLE" })
  createAt?: Date;
}
```

### Executando Consultas

```javascript
// Cria um repositório para a entidade User
  const userRepository = new BigQueryRepository<User>({
    projectId: process.env.GCP_BIGQUERY_PROJECT_ID,
    keyFilename: process.env.GCP_BIGQUERY_KEY_FILE_PATH,
    sync: Boolean(process.env.GCP_BIGQUERY_SYNC),
    dataset: process.env.GCP_BIGQUERY_DATASET_ID,
  }, User);
```

### Gerenciando Jobs

```javascript
const job = await userEventsRepo.createQueryJob(`
  SELECT *
  FROM \`${UserEvents.datasetName}.${UserEvents.tableName}\`
  WHERE DATE(timestamp) BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) AND CURRENT_DATE()
`);

// Verificar o status do job
const status = await job.getStatus();

// Obter os resultados quando o job estiver completo
const [rows] = await job.getQueryResults();
```

## Contribuindo

Contribuições são bem-vindas! Por favor, leia nossas diretrizes de contribuição antes de submeter um pull request.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](https://github.com/cirebox/bigqueryorm/blob/main/LICENSE) para detalhes.
