import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  DialogFlowIntent,
  DialogFlowResponse
} from 'nestjs-dialogflow';
import { Table } from 'actions-on-google';
import { forwardRef } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { TableCard, TableCardEvent } from '../types';

@Injectable()
export class TableCardMapper {
  private getRows(myTableCard) {
    return myTableCard.payload.google.richResponse.items[1].tableCard.rows;
  };

  public createTableCardRoom(parsedTable): any {
    const myTableCard = new TableCard();
    const tableRow = this.getRows(myTableCard);

    for (let i = 0; i < parsedTable[0].length - 2; i++) {
      tableRow.push({ //push a row
        "cells": [],
        "dividerAfter": true
      });
    }

    for (let i = 2; i < parsedTable[0].length; i++) {//righe da inserire prendo riferimento gli orari 
      for (let j = 0; j < parsedTable.length; j++) {//colonna j-esima da 0 a 2
        tableRow[i - 2].cells.push({ //celle della i-esima riga
          "text": parsedTable[j][i].replace('Lezione','').replace('Tutorato','')
        });
      };
    };

    return myTableCard;
  }

  public createTableCardEvent(parsedTableEvent): any {
    const myTableCard = new TableCardEvent();
    const tableRow = this.getRows(myTableCard);

    for (let i = 0; i < parsedTableEvent.length; i++) {
      tableRow.push({ //push a row
        "cells": [],
        "dividerAfter": true
      });
    };

    for (let i = 0; i < parsedTableEvent.length; i++) {
      tableRow[i].cells.push({
        "text": parsedTableEvent[i].time
      });
      tableRow[i].cells.push({
        "text": parsedTableEvent[i].type
      });
    };

    return myTableCard;
  }
}