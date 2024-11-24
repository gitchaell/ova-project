import { put } from '@vercel/blob';
import * as dotenv from 'dotenv';

dotenv.config();
class StorageService {
  static async upload(file) {
    const result = await put(file.name, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN
    });
    return result.url;
  }
}

export { StorageService as S };
