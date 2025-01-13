import path from "node:path";

export function getNuggetDirectory(): string {
    return path.join(process.cwd(), ".nuggets");
}

let currentNuggetId = 0;

export function createNuggetId(): string {
    ++currentNuggetId; // TODO: This cache doesn't work
    const newId =`N${currentNuggetId}`;

    useStorage("data").setItem("last_nugget_id", currentNuggetId);

    return newId;
}

export function isValidNuggetId(input: string): boolean {
    return input.match(/N\d+/)?.length === 1;
}