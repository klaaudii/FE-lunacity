export default class Utils {
  static getWeekDays(){
    let week: { name: string, date: string }[] = [];
    let today_date = Date.now()
    let name_day;
    for (let i = 0; i < 7; i++){
      let new_date = new Date(today_date + ( 3600 * 1000 * 24) * i)
      if (i == 0) {
        name_day = "dnes"
      } else {
        name_day = new_date.toLocaleDateString('sk', {weekday: 'short'});
      }
      let date = new_date.toLocaleDateString('en-CA');
      week.push({name: name_day, date: date})
    }
    return week;
  }

  static formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }
}

export enum TicketState {
  Free,
  Reserved,
}

export enum TicketType {
  Adult,
  Child,

  Senior
}
