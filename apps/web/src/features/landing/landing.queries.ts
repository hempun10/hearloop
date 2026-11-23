import { queryOptions } from '@tanstack/react-query'
import { getLanding } from './landing.functions'

export const landingQuery = () => queryOptions({ queryKey: ['landing'], queryFn: () => getLanding() })
