
export const roundToNearest = (value: number, interval:number) => {
    return Math.floor(value / interval) * interval;
};

export const groupByPrice = (levels: number[][]): number[][] => {
    return levels.map((level, idx) => {
      const nextLevel = levels[idx + 1];
      const prevLevel = levels[idx - 1];
  
      if(nextLevel && level[0] === nextLevel[0]) {
        return [level[0], level[1] + nextLevel[1]]
      } else if(prevLevel && level[0] === prevLevel[0]) {
        return [];
      } else {
        return level;
      }
    }).filter(level => level.length > 0);
  };
  

export const groupByTicketSize = (levels: number[][], ticketSize: number): number[][] => {
    return groupByPrice(levels.map(level => [roundToNearest(level[0], ticketSize), level[1]]));
};

export const formatNumber = (arg: number): string => {
    return new Intl.NumberFormat('en-US').format(arg);
  };