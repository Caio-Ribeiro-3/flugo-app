import type { Sort } from "../repository-provider/types";



/**
 * Ordena um array de objetos com base em múltiplos critérios.
 * 
 * @example
 * 
 * const frameworks = [
 *   { status: true, nome: 'React' },
 *   { status: false, nome: 'Angular' },
 * ]
 * 
 * const criterios = [
 *   { field: 'status', direction: 'asc' },
 *   { field: 'nome', direction: 'desc' }
 * ];
 * const resultado = multiSort(frameworks, criterios);
 */
export function deepSort<T extends Record<keyof Sort[number]['field'], any>>(arr: T[], sort: Sort): T[] {
    if (!sort.length) return arr
    return [...arr].sort((a, b) => {
        for (let i = 0; i < sort.length; i++) {
            const { field, direction } = sort[i]
            let valA = a[field as keyof typeof a];
            let valB = b[field as keyof typeof b];

            if (valA !== valB) {
                const modifier = direction === 'desc' ? -1 : 1;

                if (valA < valB) return -1 * modifier;
                if (valA > valB) return 1 * modifier;
            }
        }
        return 0;
    });
}