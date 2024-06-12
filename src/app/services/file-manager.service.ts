import { Injectable } from '@angular/core';
import * as fs from 'fs';


@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  moveFile(sourcePath: string, destinationPath: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      fs.rename(sourcePath, destinationPath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
