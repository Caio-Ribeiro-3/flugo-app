export type BaseRecord<RecordData extends Record<string, unknown> = Record<string, unknown>> = RecordData & {
    id: string;
}

export interface Pagination {
    page?: number;
    perPage?: number;
}

export type Sort = { field: string, direction: 'asc' | 'desc' }[]

export type Filter = {
    field: string;
    strategy: 'includes';
    value: string;
    entity: string;
    entityField?: string;
}[]

export interface ListResult<RecordType extends BaseRecord> extends Pagination {
    data: RecordType[];
    total?: number;
}

export interface ListPayload {
    entity: string;
    sort?: Sort;
    pagination: Pagination;
}

export interface RepositoryProvider {
    list<RecordType extends BaseRecord>(args: ListPayload): Promise<ListResult<RecordType>>
    create<RecordType extends BaseRecord>(args: { entity: string; payload: Partial<RecordType> }): Promise<void>
    update<RecordType extends BaseRecord>(args: { id: string; entity: string; payload: Partial<RecordType> }): Promise<void>
    delete(args: ({ ids: string[]; } | { id: string; }) & { entity: string; }): Promise<void>
}