
export const NuggetTypes = {
    Image: "Image",
    Video: "Video",
} as const;

export type NuggetType = (typeof NuggetTypes)[keyof typeof NuggetTypes];

interface BaseNugget {
    nuggetId: string,
    nuggetFileName: string,
    uploadUserId: string,
    uploadTimestamp: number,
    type: NuggetType,
}

export type Nugget = ImageNugget;

export interface ImageNugget extends BaseNugget {
    type: "Image",
    image: string;
    metaData: ImageNuggetMetaData;
}

export interface ImageNuggetMetaData {
    resX: number;
    resY: number;
    format: NuggetImageFormat;
}
export const NuggetImageFormats = ["image/png", "image/jpeg", "image/webp", "image/gif"] as const;
export type NuggetImageFormat = (typeof NuggetImageFormats)[number];

export function isNuggetImageFormat(str: string): str is NuggetImageFormat {
    return (NuggetImageFormats as readonly string[]).indexOf(str) >= 0;
}

export function getNuggetType(format: string): NuggetType | null {
    if(isNuggetImageFormat(format)) return NuggetTypes.Image;

    return null;
}