import type {NuggetMetaData} from "#shared/nugget/NuggetMetaData";
import type {NuggetDeleteResponse} from "#shared/nugget/NuggetDeleteResponse";
import type {NuggetUploadResponse} from "#shared/nugget/NuggetUploadResponse";
import {NuggetUploadResponseStatuses} from "#shared/nugget/NuggetUploadResponse";

export const useNuggetStore = defineStore("nuggets", () => {
    const nuggets = ref<NuggetMetaData[]>([]);
    const nuggetFetchStatus = ref<"loaded" | "loading" | "failed">("loading");

    async function deleteNuggetFromServer(nuggetId: string): Promise<boolean> {
        const response = await $fetch<NuggetDeleteResponse>(`/api/nugget/${nuggetId}`, { method: "delete" });

        if(response.success) {
            removeNugget(nuggetId);
            return true;
        } else {
            return false;
        }
    }

    async function uploadNuggetsToServer(files: File[]) {
        const formData = new FormData();

        for (const file of files) {
            formData.append("file", file);
        }

        const result = await useFetch<NuggetUploadResponse[]>("/api/nugget", {
            method: "POST",
            body: formData,
        });

        if(!result.data.value) return;

        const responses = result.data.value as NuggetUploadResponse[];

        const newNugs: NuggetMetaData[] = [];
        for (const response of responses) {
            if(response.status === NuggetUploadResponseStatuses.Failure) continue;  // TODO: Handle this case

            newNugs.push(response.metaData);
        }

        addNuggetsToFront(newNugs);
    }

    function addNuggetsToFront(newNuggets: NuggetMetaData[]) {
        nuggets.value = [...newNuggets, ...nuggets.value];
    }

    function removeNugget(nuggetId: string) {
        const idx = nuggets.value.findIndex(n => n.nuggetId === nuggetId);
        if(idx > -1) {
            nuggets.value.splice(idx, 1);
        }
    }

    function fetchNuggets(): void {
        nuggetFetchStatus.value = "loading";
        useFetch<NuggetMetaData[]>("/api/nugget").then((result) => {
            if(result.data.value) {
                nuggets.value = result.data.value;
                nuggetFetchStatus.value = "loaded";
            } else {
                nuggetFetchStatus.value = "failed";
            }
        }).catch(() => {
            nuggetFetchStatus.value = "failed";
        });
    }

    return {
        nuggets,
        uploadNuggetsToServer,
        deleteNuggetFromServer,
        addNuggetsToFront,
        fetchNuggets,
        nuggetFetchStatus
    };
});