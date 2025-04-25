import {addDays} from "#shared/DateUtil";
import type {CookieRef} from "#app";

export function useKatalogImageFullSizeCookie(): CookieRef<boolean> {
    return useCookie("katalog_image_full_size", {expires: addDays(new Date(), 7), sameSite: "lax"});
}