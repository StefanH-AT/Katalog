import {addDays} from "#shared/DateUtil";

export function useKatalogImageFullSizeCookie() {
    return useCookie("katalog_image_full_size", {expires: addDays(new Date(), 7), sameSite: "lax"});
}