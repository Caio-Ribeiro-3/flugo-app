export interface BaseRecord<RecordData extends Record<string, unknown> = Record<string, unknown>> extends RecordData {
    id: string
}

export interface Pagination {
    limit?: number;
    offset?: number;
}

export type Sort = Record<string, 'asc' | 'desc'>

export type FilterOperations = 'eq'

export interface Filter<ActualFilters extends Record<string, any> = Record<string, any>> extends ActualFilters { }

export interface ListResult<RecordType extends BaseRecord> extends Pagination {
    data: RecordType[];
    total?: number;
}

export interface ListPayload {
    entity: string;
    sort?: Sort;
    pagination?: Pagination;
    filter?: Filter
}

export interface RepositoryProvider {
    list<RecordType extends BaseRecord>(args: ListPayload): Promise<ListResult<RecordType>>
    create<RecordType extends BaseRecord>(args: { entity: string; payload: Partial<RecordType> }): Promise<void>
}