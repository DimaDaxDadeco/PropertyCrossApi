import * as Koa from 'koa';
import * as logger from 'koa-logger';
import { locationRouter } from '../routes';
import * as cors from '@koa/cors';

export const app: Koa = new Koa();

app.use(logger());
app.use(cors());
app.use(locationRouter.routes());
app.use(locationRouter.allowedMethods());

app.on('error', console.error);
