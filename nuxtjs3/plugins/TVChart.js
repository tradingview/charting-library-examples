import * as widget from '@/public/charting_library/charting_library'
import * as datafeeds from '@/public/datafeeds/udf/dist/bundle'

export default defineNuxtPlugin(() => {
    return {
        provide: {
            widget,
            datafeeds,
        },
    };
});
