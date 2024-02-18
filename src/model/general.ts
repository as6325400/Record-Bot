
export interface Iuser{
  id: string,
  name: string
}

export interface Igrade{
  id: string,
  name: string,
  date: Date
}

type DateToWeekMap = {
  [month: number]: {
    [day: number]: number;
  };
};


export const dateToWeek: DateToWeekMap = {
  2 : {
    19: 1,
    26: 2 
  },
  3 : {
    4: 3,
    11: 4, 
    18: 5,
    25: 6
  },
  4 : {
    1: 7,
    8: 8, 
    15: 9,
    22: 10,
    29: 11
  },
  5 : {
    6: 12,
    13: 13,
    20: 14,
    27: 15
  },
  6 : {
    3 : 16,
    10 : 17,
    17 : 18
  }
};