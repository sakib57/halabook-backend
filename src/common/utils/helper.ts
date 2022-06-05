import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

/**
 * update for subDocument Array
 * @param {schema} currentDocs - The current document that needs to update.
 * @param {schema} newItems - New data transfer object that needs to merge with current document.
 * @returns {schema} the updated document.
 */
export function subDocUpdateWithArray(currentDocs, newItems) {
  newItems.map((item) => {
    if (typeof item === 'object') {
      if (item.hasOwnProperty('_id')) {
        if (item.hasOwnProperty('isDeleted') && item.isDeleted) {
          currentDocs = currentDocs.filter((doc) => doc._id != item['_id']);
        } else {
          currentDocs = currentDocs.map((doc) =>
            item['_id'] == doc._id ? item : doc,
          );
        }
      } else {
        currentDocs.push(item);
      }
    } else {
      currentDocs.push(item);
    }
  });
  return currentDocs;
}

/**
 * update for subDocument object
 * @param {schema} currentDoc - The current document that needs to update.
 * @param {schema} newItem - New data transfer object that needs to merge with current document.
 * @returns {schema} the updated document.
 */
export function subDocUpdateWithObj(currentDoc, newItem) {
  if (newItem && newItem.hasOwnProperty('isDeleted') && newItem.isDeleted) {
    currentDoc = {};
  } else {
    const keys = Object.keys(newItem);
    keys.map((key) => {
      if (
        !(newItem[key] == null || newItem[key] == undefined) &&
        typeof newItem[key] === 'object'
      ) {
        const currentSubDoc =
          (currentDoc[key] && currentDoc[key]._doc) || currentDoc[key] || {};
        newItem[key] = this.subDocUpdateWithObj(currentSubDoc, newItem[key]);
        currentDoc[key] = newItem[key];
      } else if (Array.isArray(newItem[key]) && newItem[key].length > 0) {
        currentDoc[key] = this.subDocUpdateWithArray(
          currentDoc[key],
          newItem[key],
        );
      } else {
        currentDoc[key] = newItem[key];
      }
    });
  }
  return currentDoc;
}

/**
 *
 * @param token
 * @param {string} password
 * @returns
 */
export async function encodeToken(token, password) {
  const iv = randomBytes(16);
  const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
  const cipher = createCipheriv('aes-256-ctr', key, iv);
  const encryptedToken = Buffer.concat([
    cipher.update(JSON.stringify(token)),
    cipher.final(),
  ]);
  return encryptedToken.toString('base64') + 'ILN' + iv.toString('base64');
}

/**
 *
 * @param {string} token
 * @param {string} password
 * @returns
 */
export async function decodeToken(token: string, password: string) {
  const tokenSplit = token.split('ILN');
  const iv = Buffer.from(tokenSplit[1], 'base64');
  const tokenBuff = Buffer.from(tokenSplit[0], 'base64');
  const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
  const decipher = createDecipheriv('aes-256-ctr', key, iv);
  const decrypted = Buffer.concat([
    decipher.update(tokenBuff),
    decipher.final(),
  ]);
  return JSON.parse(decrypted.toString());
}

