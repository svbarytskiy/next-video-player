export interface IResolution {
    name: string,
    width: number,
    height: number
}

export const RESOLUTIONS: IResolution[] = [
    {name: "1080", width: 1920, height: 1080},
    {name: "720", width: 1280, height: 720},
    {name: "480", width: 854, height: 480},
    {name: "360", width: 640, height: 360},
  ]