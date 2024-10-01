import { Injectable } from '@nestjs/common';
import { IResolution, RESOLUTIONS } from './resolutions.data';
import * as fs from 'fs';
import * as path from 'path';
import * as ffmpeg from 'fluent-ffmpeg'; // Заміна імпорту
import * as ffmpegPath from 'ffmpeg-static'; // Імпортуємо статичний шлях

@Injectable()
export class AppService {
  private _outputDir: string = './uploads';

  async processVideo(file: Express.Multer.File): Promise<{ message: string }> {
    const originalPath = path.join(this._outputDir, 'original', file.filename);

    // Перевірка наявності оригінального відео
    if (!fs.existsSync(originalPath)) {
      throw new Error('Original video file does not exist');
    }

    try {
      await Promise.all(
        RESOLUTIONS.map((resolution) => {
          return this._convertVideo(originalPath, resolution, file.filename);
        })
      );
      return { message: 'Video processed successfully' };
    } catch (error) {
      throw new Error(`Error processing video: ${error.message}`);
    }
  }

  private async _convertVideo(
    inputPath: string,
    resolution: IResolution,
    fileName: string
  ): Promise<void> {
    const outputDir = path.join(this._outputDir, resolution.name);

    // Створення вихідної директорії
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputFileName = `${path.parse(fileName).name}${path.extname(fileName)}`;
    const outputPath = path.join(outputDir, outputFileName);

    return new Promise<void>((resolve, reject) => {
      ffmpeg(inputPath)
        .setFfmpegPath(ffmpegPath) // Використання статичного шляху
        .size(`${resolution.width}x${resolution.height}`)
        .output(outputPath)
        .on('end', () => resolve())
        .on('error', (err) => reject(err))
        .run();
    });
  }
}
