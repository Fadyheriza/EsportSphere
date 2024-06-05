export interface Series {
  id: string;
  name: string;
  startTimeScheduled: string;
  tournament: {
    id: string;
    name: string;
  };
}
