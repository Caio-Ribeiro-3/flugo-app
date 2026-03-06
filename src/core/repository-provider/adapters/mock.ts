/* eslint-disable @typescript-eslint/no-explicit-any */

import type { BaseRecord, Pagination, ListResult, RepositoryProvider, Sort } from "../types";

import avatar2 from '@/assets/avatar2.png'
import avatar3 from '@/assets/avatar3.png'
import avatar4 from '@/assets/avatar4.png'
import avatar5 from '@/assets/avatar5.png'
import { deepCopy } from "@/core/utils/deep-copy";
import { deepSort } from "@/core/utils/deep-sort";
import { getId } from "@/core/utils/get-id";
import type { Colaborador } from "@/features/colaboradores/model";
import type { Departamento } from "@/features/departamentos/model";



export class MockRepositoryProvider implements RepositoryProvider {
    private _storage: Record<string, BaseRecord[]> = {};

    constructor() {
        const departamentos: Partial<Departamento>[] = [
            {
                id: getId(),
                name: 'Design',
            },
            {
                id: getId(),
                name: 'TI'
            },
            {
                id: getId(),
                name: 'Marketing'
            },
            {
                id: getId(),
                name: 'Produto'
            }
        ]
        const colaboradores: Partial<Colaborador>[] = [
            {
                id: getId(),
                avatar: avatar2,
                name: 'Fernanda Torres',
                email: 'fernandatorres@flugo.com',
                role: departamentos[0].id,
                status: true,
                admissionDate: new Date(),
                baseWage: 3000,
                jobTitle: 'Lead Designer',
                seniority: 'gestor'
            },
            {
                id: getId(),
                avatar: avatar3,
                name: 'Joana D’Arc',
                email: 'joanadarc@flugo.com',
                role: departamentos[1].id,
                status: true,
                admissionDate: new Date(),
                baseWage: 4000,
                jobTitle: 'Chief Technology Officer',
                seniority: 'gestor'
            },
            {
                id: getId(),
                avatar: avatar4,
                name: 'Mari Froes',
                email: 'marifroes@flugo.com',
                role: departamentos[2].id,
                status: true,
                admissionDate: new Date(),
                baseWage: 4000,
                jobTitle: 'Marketing Researcher',
                seniority: 'gestor'
            },
            {
                id: getId(),
                avatar: avatar5,
                name: 'Clara Costa',
                email: 'claracosta@flugo.com',
                role: departamentos[3].id,
                status: false,
                admissionDate: new Date(),
                baseWage: 5000,
                jobTitle: 'Lead Product Manager',
                seniority: 'gestor'
            },
        ]

        departamentos[0].employees = [colaboradores[0].id!]
        departamentos[1].employees = [colaboradores[1].id!]
        departamentos[2].employees = [colaboradores[2].id!]
        departamentos[3].employees = [colaboradores[3].id!]


        departamentos[0].owner = colaboradores[0].id
        departamentos[1].owner = colaboradores[1].id
        departamentos[2].owner = colaboradores[2].id
        departamentos[3].owner = colaboradores[3].id

        this._storage.departamentos = departamentos as Departamento[]
        this._storage.colaboradores = colaboradores as Colaborador[]
    }

    list = <RecordType extends BaseRecord>({
        entity,
        pagination,
        sort
    }: { entity: string; sort: Sort; pagination: Pagination; }): Promise<ListResult<RecordType>> => {
        if (!this._storage[entity]) throw new Error(`Entidade ${entity} nao existe em MockRepositoryProvider`)
        const entityStorage = deepSort(deepCopy(this._storage[entity]) as Record<string, any>[], sort)

        if (pagination.perPage && pagination.page) {
            entityStorage.splice(pagination.page * pagination.perPage, pagination.perPage)
        }

        return timeoutPromise(() => ({
            data: entityStorage as RecordType[],
            perPage: pagination.perPage,
            page: pagination.perPage && pagination.page ? pagination.perPage * pagination.page : 1,
            total: this._storage[entity].length
        }))
    }

    create = <RecordType extends BaseRecord>({
        entity,
        payload
    }: { entity: string; payload: Partial<RecordType>; }): Promise<void> => {
        let entityStorage = this._storage[entity]
        if (!entityStorage) {
            this._storage[entity] = []
            entityStorage = this._storage[entity]
        }

        const newEntity = { id: getId(), ...payload }

        return timeoutPromise(() => { entityStorage.push(newEntity) })
    }

    update = <RecordType extends BaseRecord>({ id, entity, payload }: { id: string; entity: string; payload: Partial<RecordType>; }): Promise<void> => {
        const entityStorage = this._storage[entity]
        if (!entityStorage) throw new Error(`Entidade ${entity} nao existe em MockRepositoryProvider`)
        const register = entityStorage.find(el => el.id === id)
        if (!register) throw new Error(`Registro de ${entity} com id ${id} nao existe em MockRepositoryProvider`)

        return timeoutPromise(() => {
            this._storage[entity] = entityStorage.map(el => el.id === id ? ({
                ...el,
                ...payload
            }) : el)
        })
    }

    delete = ({ id, entity, ids }: { id?: string; ids?: string[]; entity: string; }): Promise<void> => {
        const entityStorage = this._storage[entity]
        if (!entityStorage) throw new Error(`Entidade ${entity} nao existe em MockRepositoryProvider`)

        if (ids) {

            const registers = entityStorage.every(el => ids.includes(el.id))
            if (!registers) throw new Error(`Registros de ${entity} com ids ${ids.join(', ')} nao existem em MockRepositoryProvider`)

            return timeoutPromise(() => { this._storage[entity] = entityStorage.filter(el => !ids.includes(el.id)) })

        } else {

            const register = entityStorage.find(el => el.id === id)
            if (!register) throw new Error(`Registro de ${entity} com id ${id} nao existe em MockRepositoryProvider`)

            return timeoutPromise(() => { this._storage[entity] = entityStorage.filter(el => el.id !== id) })
        }
    }
}

const DEFAULT_TIMEOUT = 1000

function timeoutPromise<T>(cb: () => T, timeout: number = DEFAULT_TIMEOUT) {
    return new Promise<T>((resolve) => {
        setTimeout(() => {
            resolve(cb())
        }, timeout)
    })
}