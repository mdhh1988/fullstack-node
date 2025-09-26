import httpWithInterceptor from "./httpWithInterceptor.js";
import Router from "../http/middleware/router.js";

const app = new httpWithInterceptor();
const router = new Router();

app.use(router.all('/test/:course/:lecture', async({route, res}, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.body = route
  await next()
}))

app.use(async({res}, next)=> {
  res.setHeader('Content-Type', 'text/html');
  res.body = '<h1>Hello World</h1>';
  await next()
})

app.listen(1021, () => {
  console.log('Server is running at http://localhost:1021');
});
