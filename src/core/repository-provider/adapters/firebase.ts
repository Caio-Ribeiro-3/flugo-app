import { initializeApp } from "firebase/app";
import {
    getFirestore,
    getDocs,
    collection,
    addDoc
} from 'firebase/firestore/lite';
import type { BaseRecord, Filter, Pagination, ListResult, RepositoryProvider, Sort } from "../types";



export class FirebaseRepositoryProvider implements RepositoryProvider {
    private firestore: ReturnType<typeof getFirestore>
    constructor() {
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
    }
    async list<RecordType extends BaseRecord>({
        entity,
        filter,
        pagination,
        sort
    }: { entity: string; sort: Sort; pagination: Pagination; filter: Filter; }): Promise<ListResult<RecordType>> {
        try {
            const querySnapshot = await getDocs(collection(this.firestore, entity));
            const data: RecordType[] = []
            querySnapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    ...doc.data()
                } as RecordType)
            });
            return {
                data,
                limit: 10,
                offset: 0
            }
        } catch (e) {
            throw new Error('Não foi possível executar o comando de listagem do FirebaseRepositoryProvider')
        }
    }
    async create<RecordType extends BaseRecord>({
        entity,
        payload
    }: { entity: string; payload: Partial<RecordType>; }): Promise<void> {
        try {
            await addDoc(collection(this.firestore, entity), {
                name: 'Mari Froes',
                email: 'marifroes@flugo.com',
                role: 'Marketing',
                status: true
            });
        } catch (e) {
            throw new Error('Não foi possível executar o comando de criação do FirebaseRepositoryProvider')
        }
    }
}