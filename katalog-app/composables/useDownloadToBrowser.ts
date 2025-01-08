export function useDownloadToBrowser(fileUrl: string, fileName?: string) {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName ?? "";
    link.target = '_blank';
    link.click();
}