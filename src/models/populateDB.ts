import { parseArgs } from 'node:util';
import { Client } from 'pg';
import fs from 'node:fs';

async function runSql(client: Client, fileName: string) {
  const query = fs.readFileSync(fileName, 'utf-8');
  await client.query(query);
}

async function main() {
  const { values } = parseArgs({
    options: {
      sql: { type: 'string' },
      uri: { type: 'string' },
    },
  });
  const dbUri = values.uri || process.env.DB_URI;

  if (!dbUri) {
    console.error('Error: No database URI provided in .env or arguments.');
    process.exit(1);
  }

  if (!values.sql) {
    console.error('Error: No sql file provided in arguments.');
    process.exit(1);
  }

  const client = new Client({ connectionString: dbUri });

  try {
    await client.connect();

    if (values.sql) {
      await runSql(client, values.sql);
      console.log(values.sql, 'executed successfully!');
    }
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});
