export class Interceptor {
  constructor() {
    // 用于存储拦截切面
    this.aspects = []
  }

  use(functor) {
    // 注册拦截切面
    this.aspects.push(functor)
    return this;
  }

  async run(context){
    // 执行拦截切面
    const aspects = this.aspects

    // 将注册的拦截切面包装成洋葱模型
    const proc = aspects.reduceRight(function(a, b){
      return async () => {
        await b(context, a)
      }
    }, () => Promise.resolve())

    try {
      // 从里到外执行洋葱模型
      await proc();
    } catch(ex) {
      console.error(ex.message);
    }
    return context;
  }
}
