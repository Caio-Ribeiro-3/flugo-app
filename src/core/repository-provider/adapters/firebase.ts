import { initializeApp } from "firebase/app";
import {
    getFirestore,
    getDocs,
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    startAfter,
    type DocumentData,
    type OrderByDirection,
} from 'firebase/firestore/lite';
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';

import type { BaseRecord, Pagination, ListResult, RepositoryProvider, Sort } from "../types";
import { error } from "@/core/utils/logger";



export class FirebaseRepositoryProvider implements RepositoryProvider {
    private firestore: ReturnType<typeof getFirestore>
    constructor() {
        // @ts-ignore
        window.FIREBASE_APPCHECK_DEBUG_TOKEN = import.meta.env.DEV;
        const firebaseConfig = {
            apiKey: import.meta.env.VITE_API_KEY,
            authDomain: import.meta.env.VITE_AUTH_DOMAIN,
            projectId: import.meta.env.VITE_PROJECT_ID,
            storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
            messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
            appId: import.meta.env.VITE_APP_ID
        };
        const app = initializeApp(firebaseConfig);
        this.firestore = getFirestore(app);
        if (import.meta.env.DEV) {
            initializeAppCheck(app, {
                provider: new ReCaptchaEnterpriseProvider(import.meta.env.VITE_RECAPTCHA_SITE_KEY),
            })
        }
    }
    async list<RecordType extends BaseRecord>({
        entity,
        pagination,
        sort
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
            await addDoc(collection(this.firestore, entity), payload as DocumentData);
        } catch (e) {
            error(e)
            throw new Error('Não foi possível executar o comando de criação do FirebaseRepositoryProvider')
        }
    }
}