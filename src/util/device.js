const ua = window.navigator.userAgent

export const isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
