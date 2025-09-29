import httpWithInterceptor from "./httpWithInterceptor.js";
import Router from "../http/middleware/router.js";
import { param } from "../http/aspect/param.js";
import { getMockDataKeys } from "../http/module/mock.js";

const app = new httpWithInterceptor();
const router = new Router();

app.use(async(ctx, next) => {
  console.log(`${ctx.req.method} ${ctx.req.url}`);
  await next()
})

app.use(param)

app.use(router.get('/fund/index', async({route, res}, next) => {
  const data = getMockDataKeys()
  res.setHeader('Content-Type', 'application/json');
  res.body = JSON.stringify(data);
  await next()
}))

app.use(router.all('/fund/:date', async({route, res}, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.body = {data}
  await next()
}))

app.use(router.all('.*', async({route, res}, next)=> {
  res.setHeader('Content-Type', 'text/html');
  res.body = '<h1>Not Found</h1>';
  res.statusCode = 404;
  await next()
}))

app.listen(1021, () => {
  console.log('Server is running at http://localhost:1021');
});
