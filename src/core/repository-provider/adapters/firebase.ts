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
} from 'firebase/firestore/lite';

import type { BaseRecord, Pagination, ListResult, RepositoryProvider, Sort } from "../types";
import { error } from "@/core/utils/logger";



export class FirebaseRepositoryProvider implements RepositoryProvider {
    private firestore: ReturnType<typeof getFirestore>
    constructor(app: FirebaseApp) {
        this.firestore = getFirestore(app);
    }
    async list<RecordType extends BaseRecord>({
        entity,
        pagination,
        // sort
    }: { entity: string; sort: Sort; pagination: Pagination; }): Promise<ListResult<RecordType>> {
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
            querySnapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    ...doc.data()
                } as RecordType)
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
}