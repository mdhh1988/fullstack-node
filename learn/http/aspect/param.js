import url from 'url'
import querystring from 'querystring'

export async function param(ctx, next) {
  const { req } = ctx
  const {query} = url.parse(`http://${req.headers.host}${req.url}`)
  ctx.params = querystring.parse(query)
  await next()
}