import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import {
  DialogFlowIntent,
  DialogFlowResponse
} from 'nestjs-dialogflow';
import { TableCardMapper } from './tablecard.mapper';
import * as cheerioTableparser from 'cheerio-tableparser';
import * as cheerio from 'cheerio';
import * as request from 'request-promise';

@Injectable()
export class RoomDialogFlowComponent {
  public readonly bookingEndPoint: String;

  constructor(
    @Inject(TableCardMapper) private tableCardMapper: TableCardMapper
  ) {
    this.bookingEndPoint = 'http://wss.math.unipd.it/display/Pages/';
  }

  public async wrapper(options): Promise<any> {
    return new Promise(function (resolve, reject) {
      request.get(options, function (err, resp, body) {
        if (err) {
          reject(err);
        } else {
          let $ = cheerio.load(body);
          cheerioTableparser($)
          resolve($("#report").parsetable(true, true, true));
        }
      })
    })
  }

  @DialogFlowIntent('booking-room')
  public async bookingSpecificRoom(dialogFlowResponse: any): Promise<any> {
    const room = dialogFlowResponse.queryResult.parameters.room;
    const url = this.bookingEndPoint + room + '.php';

    const table = await this.wrapper({
      method: 'GET',
      followRedirect: false,
      url,
      simple: false,
    });

    if (!table.length)
      return {
        "expectUserResponse": true,
        "expectedInputs": [
          {
            "inputPrompt": {
              "richInitialPrompt": {
                "items": [
                  {
                    "simpleResponse": {
                      "textToSpeech": "Non ci sono prenotazioni in programma per oggi, posso fare altro per te?",
                      "displayText": "Non ci sono prenotazioni in programma per oggi, posso fare altro per te?"
                    }
                  }
                ],
                "suggestions": []
              }
            },
            "possibleIntents": [
              {
                "intent": "actions.intent.TEXT"
              }
            ]
          }
        ]
      };

    return this.tableCardMapper.createTableCardRoom(table);
  }
}
