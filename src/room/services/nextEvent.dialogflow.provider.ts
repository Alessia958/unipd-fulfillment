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
export class EventDialogFlowComponent {
  public readonly bookingEndPoint: String;

  constructor(
    @Inject(TableCardMapper) private tableCardMapper: TableCardMapper
  ) {
    this.bookingEndPoint = 'http://wss.math.unipd.it/display/Pages/ProssimiEventi.php';
  }
  async wrapper(options): Promise<any> {
    let result = [];
    return new Promise(function (resolve, reject) {
      request.get(options, function (err, resp, body) {
        if (err) {
          reject(err);
        } else {
          let $ = cheerio.load(body);

          $('li').each(function (i, elm) {
            if (i % 2 === 0) {
              result.push({
                'time': $(this).text(),
                'type': null
              });
            }
            else {
              result[result.length - 1].type = $(this).text();
            }
          });

          resolve(result);
        }
      })
    })
  }

  @DialogFlowIntent('booking-event')
  public async bookingSpecificRoom(dialogFlowResponse: any): Promise<any> {
    const room = dialogFlowResponse.queryResult.parameters.room;
    const url = this.bookingEndPoint;

    const list = await this.wrapper({
      method: 'GET',
      followRedirect: false,
      url,
      simple: false,
    });

    if (!list.length)
      return {
        "expectUserResponse": true,
        "expectedInputs": [
          {
            "inputPrompt": {
              "richInitialPrompt": {
                "items": [
                  {
                    "simpleResponse": {
                      "textToSpeech": "Non ci sono eventi in programma per oggi, posso fare altro per te?",
                      "displayText": "Non ci sono eventi in programma per oggi, posso fare altro per te?"
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

    return this.tableCardMapper.createTableCardEvent(list);
  }
}