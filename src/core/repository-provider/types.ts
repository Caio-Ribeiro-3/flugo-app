export type BaseRecord<RecordData extends Record<string, unknown> = Record<string, unknown>> = RecordData & {
    id: string;
}

export interface Pagination {
    page?: number;
    perPage?: number;
}

export type Sort = { field: string, direction: 'asc' | 'desc' }[]

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
}