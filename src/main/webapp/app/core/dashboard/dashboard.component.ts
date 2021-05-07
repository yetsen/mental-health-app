import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';

import DummyComponent from '@/core/dashboard/dummy/dummy.vue';

@Component({
  components: {
    dummyComponent: DummyComponent,
  },
})
export default class Dashboard extends Vue {}
