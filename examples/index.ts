import { ConnectionOrm } from '../src';
import { User } from './entities';
import { UserRepositoryOrm } from './repositories';

async function main() {
  const connection = new ConnectionOrm({
    projectId: process.env.GCP_BIGQUERY_PROJECT_ID,
    keyFilename: process.env.GCP_BIGQUERY_KEY_FILE_PATH,
    sync: Boolean(process.env.GCP_BIGQUERY_SYNC),
    datasetName: process.env.GCP_BIGQUERY_DATASET_ID,
  });

  // Cria um repositório para a entidade User
  const repo = new UserRepositoryOrm(connection, new User());

  const result = await repo.find();
  console.log(result.total);
}

main().catch(console.error);
