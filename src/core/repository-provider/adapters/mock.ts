import type { BaseRecord, Pagination, ListResult, RepositoryProvider, Sort } from "../types";

import avatar2 from '@/assets/avatar2.png'
import avatar3 from '@/assets/avatar3.png'
import avatar4 from '@/assets/avatar4.png'
import avatar5 from '@/assets/avatar5.png'
import { deepCopy } from "@/core/utils/deep-copy";

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
        pagination,
        sort
    }: { entity: string; sort: Sort; pagination: Pagination; }): Promise<ListResult<RecordType>> {
        if (!this._storage[entity]) throw new Error('Entidade nao existe em MockRepositoryProvider')
        const entityStorage = deepCopy(this._storage[entity]) as Record<string, any>[]

        for (const key in sort) {
            entityStorage.sort((a, b) => {
                if (sort[key] === 'desc') return a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0
                return a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0
            })
        }
        entityStorage.splice(pagination.page * pagination.perPage, pagination.perPage)

        return new Promise(resolve => setTimeout(() => resolve({
            data: entityStorage as RecordType[],
            perPage: pagination.perPage,
            page: pagination.perPage * pagination.page,
            total: this._storage[entity].length
        }), 1000))
    }
    async create<RecordType extends BaseRecord>({
        entity,
        payload
    }: { entity: string; payload: Partial<RecordType>; }): Promise<void> {
        let entityStorage = this._storage[entity]
        if (!entityStorage) {
            this._storage[entity] = []
            entityStorage = this._storage[entity]
        }

        const newEntity = { id: String(Math.random()), ...payload }

        entityStorage.push(newEntity)

        await new Promise<RecordType>(resolve => {
            setTimeout(() => resolve(newEntity as RecordType), 1000)
        })
    }
}