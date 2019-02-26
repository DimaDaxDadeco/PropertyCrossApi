import * as Koa from 'koa';
import * as logger from 'koa-logger';
import { locationRouter } from '../routes';

export const app: Koa = new Koa();

app.use(logger());
app.use(locationRouter.routes());
app.use(locationRouter.allowedMethods());

app.on('error', console.error);
