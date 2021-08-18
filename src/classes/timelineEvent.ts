import { EventLevel } from "../enums";
import { RawEventRowValues } from "../interfaces/RawEventRowValues";

export class TimelineEvent {
  start!: Date;
  end!: Date;
  title!: string;
  info!: string;
  category!: EventLevel;

  constructor(row: RawEventRowValues) {
    const { category, start, end, info, title } = { ...row };
    const categoryString: string = category;
    const eventLevelEnum: EventLevel =
      EventLevel[categoryString as unknown as keyof typeof EventLevel];

    this.start = new Date(start);
    this.end = new Date(end);
    this.info = info;
    this.category = eventLevelEnum;
    this.title = title;
  }
}
