export function prettyDate(date: Date) {
  return `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getUTCDate().toString().padStart(2, '0')}`
}

export function newPromise<T = unknown>() {
  let res: (value: T) => void = () => {}
  let rej: (value: T) => void = () => {}

  const promise = new Promise<T>((resolve, reject) => {
    res = resolve
    rej = reject
  })

  return { promise, resolve: res, reject: rej }
}
