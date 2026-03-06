import { type FirebaseApp } from "firebase/app";
import {
    getFirestore,
    getDocs,
    collection,
    addDoc,
    query,
    orderBy,
    type DocumentData,
    serverTimestamp,
    doc,
    getDoc,
    deleteDoc,
    updateDoc,
} from 'firebase/firestore/lite';

import { error } from "@/core/utils/logger";

import type { BaseRecord, Pagination, ListResult, RepositoryProvider, Sort } from "../types";

import { IDENTITY as COLABORADORES_IDENTITY, type Colaborador } from "@/features/colaboradores/model";
import { IDENTITY as DEPARTAMENTOS_IDENTITY, type Departamento } from "@/features/departamentos/model";



export class FirebaseRepositoryProvider implements RepositoryProvider {
    firestore: ReturnType<typeof getFirestore>

    constructor(app: FirebaseApp) {
        this.firestore = getFirestore(app);
    }

    async list<RecordType extends BaseRecord>({
        entity,
        pagination,
        // sort
    }: { entity: string; sort: Sort; pagination: Pagination; }): Promise<ListResult<RecordType>> {
        const formatters = {
            [COLABORADORES_IDENTITY]: ColaboradorBackend.handleFormat
        }
        try {
            // Sort e paginação server side não são necessárias no momento 
            // const commands = []
            // for (const key in sort) {
            //     commands.push(orderBy(key, sort[key] as unknown as OrderByDirection))
            // }
            // if (pagination?.page && pagination?.perPage) {
            //     commands.push(startAfter((pagination.page - 1) * pagination.perPage))
            //     commands.push(limit(pagination.perPage))
            // }
            const entityRef = collection(this.firestore, entity)
            const q = query(
                entityRef,
                orderBy("createdAt", "desc")
                // ...commands,
            );
            const querySnapshot = await getDocs(q);

            const data: RecordType[] = []
            const formatter = formatters[entity as keyof typeof formatters]

            querySnapshot.forEach((doc) => {
                // @ts-ignore
                data.push(formatter ? formatter({
                    id: doc.id,
                    ...doc.data()
                }) : {
                    id: doc.id,
                    ...doc.data()
                })
            });

            return {
                data,
                total: data.length,
                ...pagination
            }
        } catch (e) {
            error(e)
            throw new Error('Não foi possível executar o comando de listagem do FirebaseRepositoryProvider')
        }
    }

    async create<RecordType extends BaseRecord>({
        entity,
        payload
    }: { entity: string; payload: Partial<RecordType>; }): Promise<void> {
        if (entity === COLABORADORES_IDENTITY) {
            return ColaboradorBackend.handleCreate({ payload }, this)
        } else if (entity === DEPARTAMENTOS_IDENTITY) {
            return DepartamentoBackend.handleCreate({ payload }, this)
        }
        try {
            await addDoc(collection(this.firestore, entity), {
                ...payload,
                createdAt: serverTimestamp()
            } as DocumentData);
        } catch (e) {
            error(e)
            throw new Error('Não foi possível executar o comando de criação do FirebaseRepositoryProvider')
        }
    }

    update<RecordType extends BaseRecord>({ entity, id, payload }: { id: string; entity: string; payload: Partial<RecordType>; }): Promise<void> {
        if (entity === COLABORADORES_IDENTITY) {
            return ColaboradorBackend.handleUpdate({ id, payload }, this)
        } else if (entity === DEPARTAMENTOS_IDENTITY) {
            return DepartamentoBackend.handleUpdate({ id, payload }, this)
        }
        error(`Nao ha implementacao para esta entidade ${entity}`)
        return Promise.reject(`Nao ha implementacao para esta entidade ${entity}`)
    }

    delete({ entity, ...rest }: ({ ids: string[]; } | { id: string; }) & { entity: string; }): Promise<void> {
        if (entity === COLABORADORES_IDENTITY) {
            return ColaboradorBackend.handleDelete({ ...rest }, this)
        } else if (entity === DEPARTAMENTOS_IDENTITY) {
            return DepartamentoBackend.handleDelete({ ...rest }, this)
        }
        error(`Nao ha implementacao para esta entidade ${entity}`)
        return Promise.reject(`Nao ha implementacao para esta entidade ${entity}`)
    }
}


class DepartamentoBackend {
    static handleCreate = async ({ payload }: { payload: Partial<Departamento> }, repository: FirebaseRepositoryProvider) => {
        try {
            const employees = payload.employees || []
            console.log({ employees })

            const departamentoMutation = await addDoc(collection(repository.firestore, DEPARTAMENTOS_IDENTITY), {
                ...payload,
                createdAt: serverTimestamp()
            } as DocumentData)

            const [departamentosQuery] = await Promise.all([
                getDocs(collection(repository.firestore, DEPARTAMENTOS_IDENTITY)),
                ...employees.map(colaboradorId => updateDoc(doc(repository.firestore, COLABORADORES_IDENTITY, colaboradorId), ({
                    role: departamentoMutation.id,
                } as Partial<Colaborador>)))
            ])

            const departamentos: Departamento[] = []
            departamentosQuery.forEach((doc) => {
                departamentos.push({
                    id: doc.id,
                    ...doc.data()
                } as Departamento)
            });

            console.log(departamentos)
            const departamentosToUpdate: Departamento[] = []

            departamentos.forEach(departamento => {
                if (departamento.employees.find(employeeId => employees.includes(employeeId)) && departamento.id !== departamentoMutation.id) {
                    departamentosToUpdate.push(departamento)
                }
            })

            await Promise.all(departamentosToUpdate.map(departamento => updateDoc(doc(repository.firestore, DEPARTAMENTOS_IDENTITY, departamento.id), {
                employees: departamento.employees.filter(employeeId => !employees.includes(employeeId))
            })))

        } catch (e) {
            error(e)
            throw new Error('Erro ao criar registro de departamento')
        }
    }

    static handleUpdate = async ({ id, payload }: { id: string; payload: Partial<Departamento> }, repository: FirebaseRepositoryProvider) => {
        try {
            const departamentoQuery = await getDoc(doc(repository.firestore, DEPARTAMENTOS_IDENTITY, id))

            if (!departamentoQuery.exists()) throw new Error('Departamento invalido')

            const departamento = (departamentoQuery.data() as Departamento)

            if (payload.employees) {
                if (!departamento.employees.every(employeeId => payload.employees!.includes(employeeId))) {
                    throw new Error('Remova colaboradores do departamento antes de alterar os colaboradores vinculados')
                }
                const colaboradoresQuery = await getDocs(collection(repository.firestore, COLABORADORES_IDENTITY))
                const colaboradores: Colaborador[] = []
                colaboradoresQuery.forEach((doc) => {
                    colaboradores.push({
                        id: doc.id,
                        ...doc.data()
                    } as Colaborador)
                });


                const departamentosQuery = await getDocs(collection(repository.firestore, DEPARTAMENTOS_IDENTITY))
                const departamentos: Departamento[] = []
                departamentosQuery.forEach((doc) => {
                    departamentos.push({
                        id: doc.id,
                        ...doc.data()
                    } as Departamento)
                });

                const updatedDepartamentos: Departamento[] = []
                departamentos.forEach((departamento) => {
                    if (departamento.employees.find(employeeId => payload.employees!.includes(employeeId)) && departamento.id !== id) {
                        updatedDepartamentos.push(departamento)
                    }
                })

                await Promise.all(updatedDepartamentos.map(departamento => updateDoc(
                    doc(
                        repository.firestore,
                        DEPARTAMENTOS_IDENTITY,
                        departamento.id
                    ),
                    ({
                        employees: departamento.employees.filter(employeeId => !payload.employees!.includes(employeeId)),
                    } as Partial<Departamento>)
                )))

                await Promise.all(payload.employees.map(colaboradorId => updateDoc(doc(repository.firestore, COLABORADORES_IDENTITY, colaboradorId), ({
                    role: departamentoQuery.id,
                } as Partial<Colaborador>))))
            }


            await updateDoc(doc(repository.firestore, DEPARTAMENTOS_IDENTITY, departamentoQuery.id), ({
                ...payload,
            } as Partial<Departamento>))

        } catch (e) {
            error(e)
            throw new Error('Erro ao editar registro de departamento')
        }
    }

    static handleDelete = async (args: ({ ids?: string[]; id?: string; }), repository: FirebaseRepositoryProvider) => {
        if (args.id) {
            try {
                const [departamentoQuery, colaboradoresQuery] = await Promise.all([
                    getDoc(doc(repository.firestore, DEPARTAMENTOS_IDENTITY, args.id)),
                    getDocs(collection(repository.firestore, COLABORADORES_IDENTITY))
                ])

                const departamento = departamentoQuery.data() as Departamento

                const colaboradores: Colaborador[] = []
                colaboradoresQuery.forEach((doc) => {
                    colaboradores.push({
                        id: doc.id,
                        ...doc.data()
                    } as Colaborador)
                });

                console.log(departamento, colaboradores)

                if (colaboradores.find(colaborador => departamento.employees.includes(colaborador.id))) {
                    throw new Error('Nao e possivel excluir registro de departamentos com colaboradores vinculados')
                }

                await deleteDoc(doc(repository.firestore, DEPARTAMENTOS_IDENTITY, args.id));
            } catch (e) {
                error(e)
                throw new Error('Erro ao excluir registro de departamento')
            }

        } else {
            try {
                const ids = args.ids!

                const [departamentosQuery, colaboradoresQuery] = await Promise.all([
                    getDocs(collection(repository.firestore, DEPARTAMENTOS_IDENTITY)),
                    getDocs(collection(repository.firestore, COLABORADORES_IDENTITY))
                ])

                const departamentos: Departamento[] = []
                departamentosQuery.forEach((doc) => {
                    departamentos.push({
                        id: doc.id,
                        ...doc.data()
                    } as Departamento)
                });

                const colaboradores: Colaborador[] = []
                colaboradoresQuery.forEach((doc) => {
                    colaboradores.push({
                        id: doc.id,
                        ...doc.data()
                    } as Colaborador)
                });

                if (departamentos.filter(departamento => ids.includes(departamento.id)).some(departamento => departamento.employees.length)) {
                    throw new Error('Nao e possivel excluir registro de departamentos com colaboradores vinculados')
                }

                await Promise.all(ids.map(departamentoId => deleteDoc(doc(repository.firestore, DEPARTAMENTOS_IDENTITY, departamentoId))))

            } catch (e) {
                error(e)
                throw new Error('Erro ao excluir registros de departamento')
            }
        }
    }
}

class ColaboradorBackend {
    static handleFormat = (coladorador: DocumentData): BaseRecord => {
        coladorador.admissionDate = new Date((coladorador.admissionDate || coladorador.createdAt).seconds * 1000)
        return coladorador as BaseRecord
    }

    static handleCreate = async ({ payload }: { payload: Partial<Colaborador> }, repository: FirebaseRepositoryProvider) => {
        try {
            const role = payload.role!

            const colaboradorMutation = await addDoc(collection(repository.firestore, COLABORADORES_IDENTITY), {
                ...payload,
                createdAt: serverTimestamp()
            } as DocumentData)

            const departamentoQuery = await getDoc(doc(repository.firestore, DEPARTAMENTOS_IDENTITY, role))

            const departamento = (departamentoQuery.data() as Departamento)

            await updateDoc(doc(repository.firestore, DEPARTAMENTOS_IDENTITY, departamentoQuery.id), ({
                employees: [...departamento.employees, colaboradorMutation.id]
            } as Partial<Departamento>))


        } catch (e) {
            error(e)
            throw new Error('Erro ao criar registro de colaborador')
        }
    }

    static handleUpdate = async ({ id, payload }: { id: string; payload: Partial<Colaborador> }, repository: FirebaseRepositoryProvider) => {
        try {
            const colaboradorQuery = await getDoc(doc(repository.firestore, COLABORADORES_IDENTITY, id))

            if (!colaboradorQuery.exists()) throw new Error('Colaborador invalido')

            await updateDoc(doc(repository.firestore, COLABORADORES_IDENTITY, colaboradorQuery.id), ({
                ...payload,
                manager: payload.manager || ''
            } as Partial<Departamento>))

            const colaborador = (colaboradorQuery.data() as Colaborador)

            if (payload.role && (payload.role !== colaborador.role)) {

                const newDepartamentoQuery = await getDoc(doc(repository.firestore, DEPARTAMENTOS_IDENTITY, payload.role!))
                const oldDepartamentoQuery = await getDoc(doc(repository.firestore, DEPARTAMENTOS_IDENTITY, colaborador.role!))

                const newDepartamento = (newDepartamentoQuery.data() as Departamento)
                const oldDepartamento = (oldDepartamentoQuery.data() as Departamento)

                await updateDoc(doc(repository.firestore, DEPARTAMENTOS_IDENTITY, newDepartamentoQuery.id), ({
                    employees: [...newDepartamento.employees, id],
                } as Partial<Departamento>))

                await updateDoc(doc(repository.firestore, DEPARTAMENTOS_IDENTITY, oldDepartamentoQuery.id), ({
                    employees: oldDepartamento.employees.filter(colaboradorId => colaboradorId !== id),
                } as Partial<Departamento>))
            }

        } catch (e) {
            error(e)
            throw new Error('Erro ao editar registro de colaborador')
        }
    }

    static handleDelete = async (args: ({ ids?: string[]; id?: string; }), repository: FirebaseRepositoryProvider) => {
        if (args.id) {
            try {
                // A ordem de operacoes importa
                await deleteDoc(doc(repository.firestore, COLABORADORES_IDENTITY, args.id));

                const departamentosQuery = await getDocs(collection(repository.firestore, DEPARTAMENTOS_IDENTITY))

                const departamentos: Departamento[] = []
                departamentosQuery.forEach((doc) => {
                    departamentos.push({
                        id: doc.id,
                        ...doc.data()
                    } as Departamento)
                });

                await Promise.all(departamentos.map(departamento => {
                    return updateDoc(doc(repository.firestore, DEPARTAMENTOS_IDENTITY, departamento.id), ({
                        owner: departamento.owner === args.id ? '' : departamento.owner,
                        employees: departamento.employees.filter(colaboradorId => colaboradorId !== args.id)
                    } as Partial<Departamento>))
                }))

            } catch (e) {
                error(e)
                throw new Error('Erro ao excluir registro de colaborador')
            }

        } else {
            try {
                const ids = args.ids!

                await Promise.all(ids.map(id => deleteDoc(doc(repository.firestore, COLABORADORES_IDENTITY, id))))

                const departamentosQuery = await getDocs(collection(repository.firestore, DEPARTAMENTOS_IDENTITY))

                const departamentos: Departamento[] = []
                departamentosQuery.forEach((doc) => {
                    departamentos.push({
                        id: doc.id,
                        ...doc.data()
                    } as Departamento)
                });

                console.log(ids, departamentos)

                await Promise.all(departamentos.map(departamento => {
                    return updateDoc(doc(repository.firestore, DEPARTAMENTOS_IDENTITY, departamento.id), ({
                        owner: ids.includes(departamento.owner) ? '' : departamento.owner,
                        employees: departamento.employees.filter(colaboradorId => ids.includes(colaboradorId))
                    } as Partial<Departamento>))
                }))

            } catch (e) {
                error(e)
                throw new Error('Erro ao excluir registros de colaboradores')
            }
        }
    }
}