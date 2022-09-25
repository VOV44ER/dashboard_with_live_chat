import moment from 'moment';

export const dateCalc = (date: string) => {
  const difference = moment().diff(date, 'days');

  if (difference <= 1) {
    return moment(date).utc().format('LT');
  }

  if (difference >= 1 && difference <= 7) {
    return moment(date).utc().format('dddd');
  }

  if (difference >= 7) {
    return moment(date).utc().format('DD/MM');
  }

  return '';
};
