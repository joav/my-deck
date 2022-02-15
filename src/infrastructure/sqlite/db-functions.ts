import { Database } from "sqlite3";

export function getOne(db: Database, table: string, id: string) {
    return new Promise<any>((res, rej) => {
        db.get(`SELECT * FROM ${table} WHERE id = ?`, [id], (err, row) => {
            if (err) rej(err);
            else res(row);
        });
    });
}

export function getMultiple(db: Database, sql: string, params?: any) {
    return new Promise<any[]>((res, rej) => {
        db.all(sql, params || [], (err, rows) => {
            if (err) rej(err);
            else res(rows);
        });
    });
}

export function insert(db: Database, table: string, values: any[]) {
    return new Promise<void>((res, rej) => {
        db.run(`INSERT INTO ${table} VALUES (${values.map(() => "?").join(",")})`, values, (err) => {
            if (err) rej(err);
            else res();
        });
    });
}

export function update(db: Database, table: string, fields: string[], values: any[]) {
    return new Promise<void>((res, rej) => {
        db.run(`UPDATE ${table} SET ${fields.map(f => `${f} = ?`).join(",")} WHERE id = ?`, [...values.slice(1), values[0]], (err) => {
            if (err) rej(err);
            else res();
        });
    });
}

export function deleteOne(db: Database, table: string, id: string) {
    return new Promise<void>((res, rej) => {
        db.run(`DELETE FROM ${table} WHERE id=?`, [id], (err) => {
            if (err) rej(err);
            else res();
        });
    });
}
