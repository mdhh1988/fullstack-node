import url from 'node:url';
import path from 'node:path'

function check(rule, pathname) {
  // Normalize path separators to forward slashes
  rule = rule.replace(/\\/g, '/')
  const paraMatched = rule.match(/:[^/]+/g)
  const ruleExp = new RegExp(`^${rule.replace(/:[^/]+/g, '([^/]+)')}$`)

  const ruleMatched = pathname.match(ruleExp)

  if(ruleMatched) {
    const ret = {}
    if(paraMatched) {
      for(let i = 0; i < paraMatched.length; i++) {
        ret[paraMatched[i].slice(1)] = ruleMatched[i+1]
      }
    }
    return ret
  }
  return null
}

function route(method, rule, aspect) {
  return async (ctx, next) => {
    const req = ctx.req
    if(!ctx.url) {
      ctx.url = url.parse(`http://${req.headers.host}${req.url}`)
    }
    const checked = check(rule, ctx.url.pathname)
    if(!ctx.route && (method === '*' || req.method === method) && !!checked){
      ctx.route = checked
      await aspect(ctx, next)
    } else {
      await next()
    }
  }
}

export default class Router {
  constructor(base = '') {
    this.baseUrl = base
  }
  get(rule, aspect) {
    return route('GET', path.join(this.baseUrl, rule), aspect)
  }
  post(rule, aspect) {
    return route('POST', path.join(this.baseUrl, rule), aspect)
  }
  put(rule, aspect) {
    return route('PUT', path.join(this.baseUrl, rule), aspect)
  }
  delete(rule, aspect) {
    return route('DELETE', path.join(this.baseUrl, rule), aspect)
  }
  all(rule, aspect) {
    return route('*', path.join(this.baseUrl, rule), aspect)
  }
}