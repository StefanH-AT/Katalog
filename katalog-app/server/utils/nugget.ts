import path from "node:path";
import {randomUUID} from "uncrypto";

export function getNuggetDirectory(): string {
    return path.join(process.cwd(), "public", "nuggets");
}

export function createNuggetId(): string {
    return randomUUID();
}