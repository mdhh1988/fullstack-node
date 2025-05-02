// 返回大于min小于max的随机整数
export function randomInt(min, max) {
  const p = Math.random();
  return Math.floor(min * (1 - p) + max * p)
}

//  随机选出数组中的一个元素
export function randomPick(arr) {
  const len = arr.length - 1;
  const index = randomInt(0, len);
  [arr[index], arr[len]] = [arr[len], arr[index]]
  return arr[index]
}

// 高阶随机选出数组中的一个元素
export function createRandomPicker(arr) {
  arr = [...arr]
  function randomPick() {
    const len = arr.length - 1;
    const index = randomInt(0, len);
    const picked = arr[index];
    [arr[index], arr[len]] = [arr[len], arr[index]]
    return picked;
  }
  randomPick()
  return randomPick;
}