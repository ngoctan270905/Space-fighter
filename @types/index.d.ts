declare type Float = number
declare type Integer = number

interface HMR {
  accept: (cb?: () => void) => void
  dispose: (cb?: () => void) => void
}

declare namespace module {
  const hot: HMR
}

declare let process: Process
