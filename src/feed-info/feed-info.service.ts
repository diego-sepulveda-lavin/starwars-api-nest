import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { readFile, writeFile } from 'fs';

@Injectable()
export class FeedInfoService {
  async getCharactersInfo() {
    let charactersInfo = await this.getData('https://swapi.dev/api/people');

    this.writeDataToFile('characters', charactersInfo);

    return charactersInfo;
  }

  async getPlanetsInfo() {
    let planetsInfo = await this.getData('https://swapi.dev/api/planets');

    this.writeDataToFile('planets', planetsInfo);

    return planetsInfo;
  }

  private async getData(url: string) {
    let data = [];
    let stopped = false;

    while (!stopped) {
      const response = await axios(url);
      data = data.concat(response.data.results);
      if (response.data.next) {
        url = response.data.next;
      } else {
        stopped = true;
      }
    }

    return data;
  }

  private writeDataToFile(filename: string, inputData: any[]) {
    writeFile(__dirname + `/${filename}.json`, JSON.stringify(inputData), (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }
}
