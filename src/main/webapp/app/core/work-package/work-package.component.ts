import Component from 'vue-class-component';
import {Vue, Watch} from 'vue-property-decorator';

@Component
export default class WorkPackageComponent extends Vue {
    private titles = ['Who we are', 'Objectives', 'Work Package 1', 'Work package 2', 'Work package 3', 'Work package 4'];
    private subtitles = ['', '',
        'Development and validation of a conceptual audit model',
        'Development of the wellbeing framework for SMEs’ employees',
        'Health app development',
        'Longitudinal study in SMEs'];
    private texts = ['This “Impact of COVID-19 on Staff Mental Health and Well-Being in SMEs: Strategies and Interventions to Support Workforce and Boost Productivity in the UK” project has received funding from UKRI- UK Research and Innovation under project ID number ES/V004263/1 and has been carried out in partnership with Aston University, University of Birmingham, University of York and Keele University.',
        '* Develop a conceptual model that will facilitate analysing the relationship between MH issues faced by SMEs’ staff, factors and various job dimensions contributing to these issues, and its impact on both the staff and business productivity during the pandemic, through a multi-stage survey.\n' +
        '* Develop a COVID-19 employee well-being framework comprising of strategies, practices and interventions, considering SMEs\' needs and constraints, and conduct a longitudinal study with SMEs to evaluate its effectiveness and impact towards increasing the resilience and productivity of SMEs’ workforce in varying work contexts during and after the pandemic.\n' +
        '* Develop a COVID-19 MH application to monitor the MH conditions of SMEs’ workforce and pilot it with the longitudinal study, to show how the data collected through the app will enable each individual SME to understand its staff needs, introspect their well-being, that will facilitate customizing the framework, i.e. objectively putting in place practices, strategies and interventions to address employee MH, well-being and firm’s productivity related issues. \n',
    'The conceptual model will examine  the impact of staff MH problems, well-being issues, and various factors (including work related) affecting these during COVID-19, on staff and business productivity, and the UK economy. A survey instrument will be designed to examine the relationship between several constructs including: (1) impact of COVID on - job roles, environment, expectations and several dimensions, staff MH and well-being, training needs, technology use, business productivity and supply chain resilience; (2) individual strategies and SMEs’ management strategy to alleviate MH problems, including transition from remote working back to the office; (3) factors beyond the employer’s control affecting staff MH, and critical measures to address them; (4) challenges faced by the different age groups; ',
    'The deliverables of WP1 (survey and model), guidance published by policy makers and findings from management, occupational health, organisational and clinical psychology literature, will inform the framework development to map various practices (supporting business operations), strategies and interventions (alleviating MH and wellbeing issues, supporting staff), aligned to the SMEs’ staff needs during and after the pandemic, which will help to increase staff productivity in different working contexts.\n',
    'Develop and test a user-friendly gamified application enabling SMEs’ staff to anonymously and remotely answer an interactive gamified survey that will automatically assess their MH condition. Consolidated results will be anonymised and visualized in a dashboard for the employees and managers in each SME.',
    'The primary objective is to examine the impact and effectiveness of the framework in a longitudinal study and using the data collected from the MH App'];

    private number;

    @Watch('$route', { immediate: true, deep: true })
    onPropertyChanged(value: string, oldValue: string) {
        if (this.number === value['params'].number)
            return;
        this.number = value['params'].number;
    }

    public get title() {
        return this.titles[this.number - 1];
    }
    public get subtitle() {
        return this.subtitles[this.number - 1];
    }
    public get text() {
        return this.texts[this.number - 1];
    }

    public get objectives() {
        return this.texts[1].split('*');
    }

}
