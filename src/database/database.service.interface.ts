export interface IDatabaseService {
    open: (name: string) => Promise<IDatabaseService>;
    exists: () => Promise<boolean>;
    write: <T>(data: T[]) => Promise<T[]>;
    getAll: <T>() => Promise<T[]>;
}