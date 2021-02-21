import { widget } from '~/static/vendor/charting_library'

const Widget = widget

export default function (ctx, inject) {
  inject('TVChart', { Widget })
}
