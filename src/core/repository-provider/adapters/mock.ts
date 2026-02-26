/* eslint-disable @typescript-eslint/no-explicit-any */

import type { BaseRecord, Pagination, ListResult, RepositoryProvider, Sort } from "../types";

import avatar2 from '@/assets/avatar2.png'
import avatar3 from '@/assets/avatar3.png'
import avatar4 from '@/assets/avatar4.png'
import avatar5 from '@/assets/avatar5.png'
import { deepCopy } from "@/core/utils/deep-copy";
import { deepSort } from "@/core/utils/deep-sort";
import { getId } from "@/core/utils/get-id";

export class MockRepositoryProvider implements RepositoryProvider {
    private _storage: Record<string, unknown[]> = {
        colaboradores: [
            {
                id: getId(),
                avatar: avatar2,
                name: 'Fernanda Torres',
                email: 'fernandatorres@flugo.com',
                role: 'Design',
                status: true
            },
            {
                id: getId(),
                avatar: avatar3,
                name: 'Joana D’Arc',
                email: 'joanadarc@flugo.com',
                role: 'TI',
                status: true
            },
            {
                id: getId(),
                avatar: avatar4,
                name: 'Mari Froes',
                email: 'marifroes@flugo.com',
                role: 'Marketing',
                status: true
            },
            {
                id: getId(),
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
        const entityStorage = deepSort(deepCopy(this._storage[entity]) as Record<string, any>[], sort)

        if (pagination.perPage && pagination.page) {
            entityStorage.splice(pagination.page * pagination.perPage, pagination.perPage)
        }

        return new Promise(resolve => setTimeout(() => resolve({
            data: entityStorage as RecordType[],
            perPage: pagination.perPage,
            page: pagination.perPage && pagination.page ? pagination.perPage * pagination.page : 1,
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

        const newEntity = { id: getId(), ...payload }

        entityStorage.push(newEntity)

        await new Promise<RecordType>(resolve => {
            setTimeout(() => resolve(newEntity as RecordType), 1000)
        })
    }
}