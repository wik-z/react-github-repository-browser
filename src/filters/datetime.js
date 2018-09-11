import moment from 'moment';

export default function datetime(date, format = 'DD/MM/YYYY') {
    return moment(date).format(format);
}