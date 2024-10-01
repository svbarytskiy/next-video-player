export interface CustomVideoElemant extends HTMLVideoElement {
    mozRequestFullScreen?: () => Promise<void>,
    webkitRequestFullScreen?: () => Promise<void>,
    msRequestFullScreen?: () => Promise<void>,
}

export enum EnumPlayerQuality {
    'original' = 'original',
    '1080p' = '1080',
    '720p' = '720',
    '480p' = '480',
}