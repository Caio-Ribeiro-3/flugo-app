import type { BaseRecord, Filter } from "../repository-provider/types";



/**
 * Filtra um array de objetos com base em múltiplos critérios.
 * 
 */
export function deepFilter<T>(arr: T[], filters: Filter, context: Record<string, BaseRecord[]> = {}): T[] {
    if (!filters.length) return arr

    return arr.filter(element => {

        let includes = true

        for (let i = 0; i < filters.length; i++) {

            const { field, value, entity, entityField } = filters[i]

            const elementValue = entityField ? context[entity as keyof typeof context].find(el => el.id === element[field as keyof typeof element])?.[entityField] : element[field as keyof typeof element]

            if (typeof elementValue === 'string') {

                if (elementValue && !elementValue.toLowerCase().includes(value.toLowerCase())) {
                    includes = false
                    break
                }

            }

        }

        return includes
    })
}