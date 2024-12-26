interface NuggetUploadResponseBase {
    index: number;
    fileName: string;
}

export interface NuggetUploadSuccessResponse extends NuggetUploadResponseBase {
    status: 0;
    nuggetId: string;
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
} as const;
export type NuggetUploadFailureReason = (typeof NuggetUploadFailureReasons)[keyof typeof NuggetUploadFailureReasons];

export const NuggetUploadResponseStatuses = {
    Success: 0,
    Failure: 1,
} as const;
export type NuggetUploadResponseStatus = (typeof NuggetUploadResponseStatuses)[keyof typeof NuggetUploadResponseStatuses];