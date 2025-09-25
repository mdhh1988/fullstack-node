import {Interceptor} from "../http/interceptor.js"

/**
 * 拦截器例子
 */
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

const inter = new Interceptor()

const task = function(id) {
  return async(ctx, next) => {
    try {
      console.log(`task ${id} start`)
      ctx.count++;
      await wait(1000)
      console.log(`count: ${ctx.count}`)
      await next()
      console.log(`task ${id} end`)
    } catch (error) {
      console.error(`task ${id} error: ${error.message}`)
    }
  }
}

inter.use(task(0))
inter.use(task(1))
inter.use(task(2))
inter.use(task(3))
inter.use(task(4))

inter.run({count:0})