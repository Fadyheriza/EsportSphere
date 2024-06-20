import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to the API!';
  }

  getOngoingMatches(){
    return [{ id: 1, name: 'Match 1' }, { id: 2, name: 'Match 2' },
      {id: 3, name: 'Renes Lieblingsteam spielt!!!'}
    ];
  }

  getGameInfo() {
    return { title: 'Game Title', description: 'Renes Lieblingsspiel!' };
  }
}
