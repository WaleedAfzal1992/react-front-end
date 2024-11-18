export function getAssetsUrl(file: string): string {
    return `${process.env.NEXT_PUBLIC_ASSETS_BUCKET_URL}/${file}`;
}

export function getOgImageUrl(fileName: string): string {
    return getAssetsUrl(`images/og/1200_627/${fileName}`);
}
