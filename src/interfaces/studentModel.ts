import { EventLevel } from "../enums";
import GetSheetDone from "get-sheet-done";
export interface EventRowValues {
  start: Date;
  end: Date;
  title: string;
  info: string;
  tags: string;
  category: EventLevel;
}

/**
 * Generic GoogleSheet with type argument 
   which we use only when fetching our sheets.
   Currently te
 */
export interface GoogleSheet<T> {
  data: Array<T>;
  title: string;
  updated: string;
}

export function getSheet<T>(
  key: string,
  sheetNumber: number
): Promise<GoogleSheet<T>> {
  return new Promise<GoogleSheet<T>>(function (resolve, reject) {
    GetSheetDone.labeledCols(key, sheetNumber)
      .then((sheet: any) => {
        resolve(sheet);
      })
      .catch((err: any) => {
        console.error(
          `Error fetching DOC_KEY ${key}, sheet number ${sheetNumber}, ${err}`
        );
      });
  });
}

const fetchRetry = async (
  url: string,
  retries: number,
  backoff: number
): Promise<Response> => {
  /* 1 */
  const retryCodes = [408, 400, 404, 500, 502, 503, 504, 522, 524];
  return fetch(url)
    .then((res) => {
      if (res.ok) return res.json();

      if (retries > 0 && retryCodes.includes(res.status)) {
        setTimeout(() => {
          /* 2 */
          return fetchRetry(url, retries - 1, backoff * 2); /* 3 */
        }, backoff); /* 2 */
      } else {
        throw new Error(JSON.stringify(res));
      }
    })
    .catch(console.error);
};
