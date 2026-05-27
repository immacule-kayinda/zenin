import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "zenin";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  }

  const client = new MongoClient(uri);
  return client.connect();
}

let indexesEnsured = false;

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  const db = client.db(dbName);

  if (!indexesEnsured) {
    indexesEnsured = true;
    await db.collection("products").createIndex({ slug: 1 }, { unique: true });
    await db.collection("orders").createIndex({ createdAt: -1 });
    await db.collection("orders").createIndex({ status: 1 });
  }

  return db;
}

export function isMongoConfigured(): boolean {
  return Boolean(uri);
}
