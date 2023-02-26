import crypto from 'crypto';

export const sha1 = (data) => {
  return crypto.createHash("sha1").update(data, "binary").digest("hex");
}