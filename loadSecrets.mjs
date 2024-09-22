import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

async function accessSecretVersion(name) {
  const client = new SecretManagerServiceClient();
  const [version] = await client.accessSecretVersion({ name });
  const payload = version.payload.data.toString('utf8');
  return payload;
}

export async function loadSecrets() {
  const secrets = {
    MONGODB_URI: 'projects/dvunitedblogs/secrets/MONGODB_URI/versions/latest',
    JWT_SECRET: 'projects/dvunitedblogs/secrets/JWT_SECRET/versions/latest',
  };

  for (const [key, secretName] of Object.entries(secrets)) {
    process.env[key] = await accessSecretVersion(secretName);
  }
  
}