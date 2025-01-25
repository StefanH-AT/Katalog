import type {Nugget} from "#shared/nugget/Nugget";

interface NuggetUploadResponseBase {
    index: number;
    fileName: string;
}

export interface NuggetUploadSuccessResponse extends NuggetUploadResponseBase {
    status: 0;
    metaData: Nugget;
}

export interface NuggetUploadFailureResponse extends NuggetUploadResponseBase {
    status: 1;
    failureReason: NuggetUploadFailureReason;
}

export type NuggetUploadResponse = NuggetUploadSuccessResponse | NuggetUploadFailureResponse;

export const NuggetUploadFailureReasons = {
    Unknown: 0,
    NoFileName: 1,
    ImageFileSizeExceeded: 2,
    InvalidFileType: 3,
    Internal_IdCreationFailed: 4,
} as const;
export type NuggetUploadFailureReason = (typeof NuggetUploadFailureReasons)[keyof typeof NuggetUploadFailureReasons];

export const NuggetUploadResponseStatuses = {
    Success: 0,
    Failure: 1,
} as const;
export type NuggetUploadResponseStatus = (typeof NuggetUploadResponseStatuses)[keyof typeof NuggetUploadResponseStatuses];