import { Module, NestModule, RequestMethod, forwardRef } from '@nestjs/common';
import { RoomDialogFlowComponent } from './services/room.dialogflow.provider';
import { TableCardMapper } from './services/tablecard.mapper';
import { EventDialogFlowComponent } from './services/nextEvent.dialogflow.provider';

@Module({
  controllers: [],
  providers: [RoomDialogFlowComponent, EventDialogFlowComponent, TableCardMapper],
})
export class RoomModule { }
