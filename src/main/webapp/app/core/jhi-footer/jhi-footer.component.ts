import { Component, Vue } from 'vue-property-decorator';

@Component
export default class JhiFooter extends Vue {
    public get currentRoute(): string {
        return this.$route.name;
    }
}
