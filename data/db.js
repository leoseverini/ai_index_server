import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { join, dirname } from 'node:path'

import { fileURLToPath } from 'node:url'

class DB {
    constructor() {
        const __dirname = dirname(fileURLToPath(import.meta.url));
        const file = join(__dirname,'/entries.json');
        console.log(file);     
        const adapter = new JSONFile(file);
        this.db = new Low(adapter);
        this.db.read()
        console.log(this.db);

        this.db.read().then(() => {
            console.log("THEN");
            console.log(this.db);
        });

        // this.initDb = async function() {
        //     this.db.read().then(() => {
        //         console.log("Data was loaded");
        //         console.log(this.db.data);
        //         this.db.data ||= { entries: [] };
        //     });
        
        // }
    }
}

const db = new DB();

export default db.db;
