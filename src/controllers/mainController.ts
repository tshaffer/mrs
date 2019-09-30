import { Request, Response } from 'express';
import * as path from 'path';

export function getIndex(request: Request, response: Response) {
  const pathToIndex = path.join(__dirname, '../../public', 'index.html');
  response.sendFile(pathToIndex);
  response.sendStatus(200);
}

export function getCSS(request: Request, response: Response) {
  const pathToCSS = path.join(__dirname, '../../public', 'css', 'app.css');
  response.sendFile(pathToCSS);
  response.sendStatus(200);
}

export function getBundle(request: Request, response: Response) {
  const pathToBundle = path.join(__dirname, '../../public', 'build', 'bundle.js');
  response.sendFile(pathToBundle);
  response.sendStatus(200);
}
