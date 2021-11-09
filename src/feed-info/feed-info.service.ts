import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { readFile, writeFile } from 'fs';

@Injectable()
export class FeedInfoService {
  async getCharactersInfo() {
    let charactersInfo = [];

    let stopped = false;
    let url = 'https://swapi.dev/api/people';

    while (!stopped) {
      const response = await axios(url);
      charactersInfo = [...charactersInfo, response.data.results];
      if (response.data.next) {
        url = response.data.next;
      } else {
        stopped = true;
      }
    }

    writeFile(__dirname + '/chars.json', JSON.stringify(charactersInfo), (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }
}
