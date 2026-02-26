/**
 * Utilidade para criar strings aleatórias
 */
export function getId() {
    // Idealmente deve usar uma dependência especializada com uuid mas, no momento, basta
    return `${Math.random()}${Math.random()}${Math.random()}${Math.random()}`
}