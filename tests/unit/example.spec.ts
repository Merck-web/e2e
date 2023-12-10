import {nextTick} from "vue";
import  { mount } from '@vue/test-utils';
import {today, thisWeek, thisMonth} from "@/mocks";
import Timeline from "@/components/Timeline.vue";


describe('Timeline', () => {
  it ('render today post default', () => {
    const wrapper = mount(Timeline);

    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
  })

  it('update when the period is click', async () => {
    const wrapper = mount(Timeline);

    await wrapper.get('[data-test="Неделя"]').trigger('click');

    await nextTick();

    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'))

    await wrapper.get('[data-test="Месяц"]').trigger('click');

    await nextTick();

    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisMonth.created.format('Do MMM'))

    await wrapper.get('[data-test="Сегодня"]').trigger('click');

    await nextTick();

    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
    expect(wrapper.html()).not.toContain(thisWeek.created.format('Do MMM'))
    expect(wrapper.html()).not.toContain(thisMonth.created.format('Do MMM'))
  })
})