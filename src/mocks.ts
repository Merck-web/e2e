import moment from 'moment';

export interface Post {
    id: string,
    title: string,
    created: moment.Moment
}

export const today: Post = {
    id: '1',
    title: 'Сегодня',
    created: moment().subtract(1, 'second')
}

export const thisWeek: Post = {
    id: '2',
    title: 'Неделя',
    created: moment().subtract(2, 'days')
}

export const thisMonth: Post = {
    id: '3',
    title: 'Месяц',
    created: moment().subtract(12, 'days')
}