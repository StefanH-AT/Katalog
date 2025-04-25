import path from "node:path";

export function getNuggetDirectory(): string {
    return path.join(process.cwd(), ".nuggets");
}

export async function createNuggetId(): Promise<string | null> {

    const store = useStorage("data");

    let id = await store.getItem("last_nugget_id");
    if(id == null) {
        id = 0;
    }

    if(typeof(id) !== "number") return null;

    id++;

    const newId =`N${id}`;
    await store.setItem("last_nugget_id", id);

    return newId;
}

export function isValidNuggetId(input: string): boolean {
    return input.match(/N\d+/)?.length === 1;
}