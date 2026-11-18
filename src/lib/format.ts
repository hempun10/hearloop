import { format, formatDistanceToNowStrict } from 'date-fns'

export const timeAgo = (d: Date) => formatDistanceToNowStrict(d, { addSuffix: true })
export const shortDate = (d: Date) => format(d, 'MMM d')
export const longDate = (d: Date) => format(d, 'MMM d, yyyy')
