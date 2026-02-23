import type { BaseRecord, Filter, Pagination, ListResult, RepositoryProvider, Sort } from "../types";

import avatar2 from '@/assets/avatar2.png'
import avatar3 from '@/assets/avatar3.png'
import avatar4 from '@/assets/avatar4.png'
import avatar5 from '@/assets/avatar5.png'

export class MockRepositoryProvider implements RepositoryProvider {
    private _storage: Record<string, unknown[]> = {
        colaboradores: [
            {
                avatar: avatar2,
                name: 'Fernanda Torres',
                email: 'fernandatorres@flugo.com',
                role: 'Design',
                status: true
            },
            {
                avatar: avatar3,
                name: 'Joana D’Arc',
                email: 'joanadarc@flugo.com',
                role: 'TI',
                status: true
            },
            {
                avatar: avatar4,
                name: 'Mari Froes',
                email: 'marifroes@flugo.com',
                role: 'Marketing',
                status: true
            },
            {
                avatar: avatar5,
                name: 'Clara Costa',
                email: 'claracosta@flugo.com',
                role: 'Produto',
                status: false
            },
        ]
    }
    constructor(initialStorage?: Record<string, unknown[]>) {
        this._storage = initialStorage || this._storage
    }
    list<RecordType extends BaseRecord>({
        entity,
        filter,
        pagination,
        sort
    }: { entity: string; sort: Sort; pagination: Pagination; filter: Filter; }): Promise<ListResult<RecordType>> {
        const entityStorage = this._storage[entity]
        if (!entityStorage) throw new Error('Entidade nao existe em MockRepositoryProvider')

        return new Promise(resolve => setTimeout(() => resolve({
            data: entityStorage as RecordType[],
            limit: pagination?.limit,
            offset: pagination?.offset,
            total: entityStorage.length
        }), 1000))
    }
    create<RecordType extends BaseRecord>({
        entity,
        payload
    }: { entity: string; payload: Partial<RecordType>; }): Promise<RecordType> {
        let entityStorage = this._storage[entity]
        if (!entityStorage) {
            this._storage[entity] = []
            entityStorage = this._storage[entity]
        }

        console.log({ entity, payload })
        const newEntity = { id: String(Math.random()), ...payload }

        entityStorage.push(newEntity)

        return new Promise<RecordType>(resolve => {
            setTimeout(() => resolve(newEntity as RecordType), 1000)
        })
    }
}