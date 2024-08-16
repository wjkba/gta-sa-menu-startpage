import { Dexie } from 'dexie';
export type KeyPaths<T> = {
    [P in keyof T]: P extends string ? T[P] extends Array<infer K> ? K extends object ? P | `${P}.${number}` | `${P}.${number}.${KeyPaths<K>}` : P | `${P}.${number}` : T[P] extends (...args: any[]) => any ? never : T[P] extends object ? P | `${P}.${KeyPaths<T[P]>}` : P : never;
}[keyof T];
export type TableProp<DX extends Dexie> = {
    [K in keyof DX]: DX[K] extends {
        schema: any;
        get: any;
        put: any;
        add: any;
        where: any;
    } ? K : never;
}[keyof DX] & string;
interface DexieCloudEntity {
    table(): string;
    realmId: string;
    owner: string;
}
export interface PermissionChecker<T, TableName extends string> {
    add(...tableNames: TableName[]): boolean;
    update(...props: KeyPaths<T>[]): boolean;
    delete(): boolean;
}
export declare function usePermissions<T extends DexieCloudEntity>(entity: T): PermissionChecker<T, T extends {
    table: () => infer TableName;
} ? TableName : string>;
export declare function usePermissions<TDB extends Dexie, T>(db: TDB, table: TableProp<TDB>, obj: T): PermissionChecker<T, TableProp<TDB>>;
export {};
//# sourceMappingURL=usePermissions.d.ts.map