import { widget } from '~/static/charting_library'

const Widget = widget

export default function (ctx, inject) {
  inject('TVChart', { Widget })
}
