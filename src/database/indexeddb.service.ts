import {IDatabaseService} from "./database.service.interface";
import {PROPERTY} from "../constants";

export class IndexeddbService implements IDatabaseService {
    private name: string;
    private openRequest: IDBOpenDBRequest;
    private database: IDBDatabase | null = null;

    open(name: string): Promise<this> {
        return new Promise((resolve, reject) => {
            this.name = name;
            this.openRequest = indexedDB.open('Database');
            this.openRequest.onsuccess = () => {
                this.database = this.openRequest.result;
                resolve(this);
            };
            this.openRequest.onerror = () => {
                reject('IndexedDB error');
            };
            this.openRequest.onupgradeneeded = () => {
                this.database = this.openRequest.result;
                this.database.createObjectStore(PROPERTY.TEMPERATURE);
                this.database.createObjectStore(PROPERTY.PRECIPITATION);
            };
        });
    }

    // Here we check whether a table is empty or not
    async exists(): Promise<boolean> {
        const isEmpty = Boolean((await this.getAll()).length);
        return Promise.resolve(isEmpty);
    }

    getAll<T>(): Promise<T[]> {
        return new Promise((resolve, reject) => {
            if (this.database) {
                const transaction = this.database.transaction(this.name);
                const store = transaction.objectStore(this.name);
                const result = store.getAll();

                transaction.oncomplete = () => {
                    resolve(result.result as T[]);
                };

                transaction.onerror = () => {
                    reject(transaction.error);
                };
            }
        });
    }

    write<T>(data: T[]): Promise<T[]> {
        return new Promise((resolve, reject) => {
            if (this.database) {
                const transaction = this.database.transaction(this.name, 'readwrite');

                data.forEach((item, index) => {
                    const store = transaction.objectStore(this.name);
                    store.put(item, index);
                })

                transaction.oncomplete = () => {
                    resolve(data);
                };

                transaction.onerror = () => {
                    reject(transaction.error);
                };
            }
        });
    }

}