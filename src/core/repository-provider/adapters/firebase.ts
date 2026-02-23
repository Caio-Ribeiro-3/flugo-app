import type { BaseRecord, Filter, Pagination, ListResult, RepositoryProvider, Sort } from "../types";

export class FirebaseRepositoryProvider implements RepositoryProvider {
    constructor() {

    }
    list<RecordType extends BaseRecord>({
        entity,
        filter,
        pagination,
        sort
    }: { entity: string; sort: Sort; pagination: Pagination; filter: Filter; }): Promise<ListResult<RecordType>> {
        return Promise.resolve<ListResult<RecordType>>({
            data: [],
            limit: 10,
            offset: 0
        })
    }
    create<RecordType extends BaseRecord>({
        entity,
        payload
    }: { entity: string; payload: Partial<RecordType>; }): Promise<RecordType> {

    }
}