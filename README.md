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
const { Dataset, Table, Column } = require('bigquery-orm');

@Dataset('my_dataset')
class UserEvents {
  @Table({ partitionBy: 'DATE(timestamp)', clusterBy: ['user_id'] })
  @Column({ type: 'STRING', mode: 'REQUIRED' })
  user_id;

  @Column({ type: 'TIMESTAMP', mode: 'REQUIRED' })
  timestamp;

  @Column({ type: 'STRING', mode: 'REQUIRED' })
  event_type;

  @Column({ type: 'JSON' })
  event_data;
}
```

### Configurando a Conexão

```javascript
const { BigQueryConnection } = require('bigquery-orm');

const connection = new BigQueryConnection({
  projectId: 'your-project-id',
  keyFilename: '/path/to/your/keyfile.json'
});

await connection.connect();
```

### Executando Consultas

```javascript
const { BigQueryRepository } = require('bigquery-orm');

const userEventsRepo = new BigQueryRepository(connection, UserEvents);

// Inserir dados
await userEventsRepo.insert([
  { user_id: '123', timestamp: new Date(), event_type: 'login', event_data: { ip: '192.168.1.1' } }
]);

// Executar uma consulta
const results = await userEventsRepo.query(`
  SELECT event_type, COUNT(*) as count
  FROM \`${UserEvents.datasetName}.${UserEvents.tableName}\`
  WHERE DATE(timestamp) = CURRENT_DATE()
  GROUP BY event_type
`);

// Carregar dados de um arquivo CSV
await userEventsRepo.loadFromCsv('gs://your-bucket/user_events.csv');
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

## Recursos Avançados

- Suporte para views materializadas
- Gerenciamento de permissões de dataset e tabela
- Integração com o BigQuery ML para modelos de aprendizado de máquina
- Suporte para funções definidas pelo usuário (UDFs)
- Gerenciamento de slots de consulta e cotas

## Contribuindo

Contribuições são bem-vindas! Por favor, leia nossas diretrizes de contribuição antes de submeter um pull request.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](https://github.com/cirebox/bigqueryorm/blob/main/LICENSE) para detalhes.
