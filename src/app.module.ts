import { RoomModule } from "./room/room.module";

import { DialogFlowModule } from "nestjs-dialogflow";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    DialogFlowModule.forRoot({
      basePath: 'web-hooks',
      postPath: 'dialog-flow'
    }), RoomModule
  ],
  providers: [],
  controllers: []
})
export class ApplicationModule {}
