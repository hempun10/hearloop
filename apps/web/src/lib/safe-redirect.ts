// only same-site paths, never //evil.com
export const safeRedirect = (path?: string) => (path?.startsWith('/') && !path.startsWith('//') ? path : undefined)
