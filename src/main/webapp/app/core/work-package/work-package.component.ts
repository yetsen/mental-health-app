import Component from 'vue-class-component';
import {Vue, Watch} from 'vue-property-decorator';

@Component
export default class WorkPackageComponent extends Vue {
    private titles = ['Who we are', 'Objectives', 'Work Package 1', 'Work package 2', 'Work package 3', 'Work package 4'];
    private subtitles = ['', '',
        'Development and validation of a conceptual audit model',
        'Development of the wellbeing framework for SMEs',
        'Mental Health app development',
        'Longitudinal study in SMEs'];
    private texts = ['This “Impact of COVID-19\n' +
    'on Staff Mental Health and\n' +
    'Well-Being in SMEs:\n' +
    'Strategies and Interventions\n' +
    'to Support Workforce and\n' +
    'Boost Productivity in the\n' +
    'UK” project has received\n' +
    'funding from UKRI- UK\n' +
    'Research and Innovation\n' +
    'under project ID number\n' +
    'ES/V004263/1 and has been\n' +
    'carried out in partnership\n' +
    'with Aston University,\n' +
    'University of Birmingham,\n' +
    'University of York and\n' +
    'Keele University.',
        '* Develop a conceptual model\n' +
        'that facilitates analysing the\n' +
        'relationship between MH\n' +
        'issues faced by SMEs’ staff,\n' +
        'factors and various job\n' +
        'dimensions contributing to\n' +
        'these issues, and its impact\n' +
        'on both the staff and\n' +
        'business productivity during\n' +
        'the pandemic, through a\n' +
        'multi-stage survey.' +
        '* Develop a COVID-19\n' +
        'employee well-being\n' +
        'framework comprising of\n' +
        'strategies, practices and\n' +
        'interventions, considering\n' +
        'SMEs&#39; needs and\n' +
        'constraints, and conduct a\n' +
        'longitudinal study with\n' +
        'SMEs to evaluate its\n' +
        'effectiveness and impact\n' +
        'towards increasing the\n' +
        'resilience and productivity\n' +
        'of SMEs’ workforce in\n' +
        'varying work contexts\n' +
        'during and after the\n' +
        'pandemic.' +
        '* Develop a COVID-19 MH\n' +
        'application to monitor the\n' +
        'MH conditions of SMEs’\n' +
        'workforce and pilot it with\n' +
        'the longitudinal study, to\n' +
        'show how the data collected\n' +
        'through the app enables each\n' +
        'individual SME to\n' +
        'understand its staff needs,\n' +
        'introspect their well-being,\n' +
        'that facilitates customizing\n' +
        'the framework, i.e.\n' +
        'objectively putting in place\n' +
        'practices, strategies and\n' +
        'interventions to address\n' +
        'employee MH, well-being\n' +
        'and firm’s productivity\n' +
        'related issues.',
    'The conceptual model\n' +
    'examines the impact of staff\n' +
    'MH problems, well-being\n' +
    'issues, and various factors\n' +
    '(including work related)\n' +
    'affecting these during\n' +
    'COVID-19, on staff and\n' +
    'business productivity, and\n' +
    'the UK economy. A survey\n' +
    'instrument was designed to\n' +
    'examine the relationship\n' +
    'between several constructs\n' +
    'including: *(1) impact of\n' +
    'COVID on - job roles,\n' +
    'environment, expectations\n' +
    'and several dimensions, staff\n' +
    'MH and well-being, training\n' +
    'needs, technology use,\n' +
    'business productivity and\n' +
    'supply chain resilience; *(2)\n' +
    'individual strategies and\n' +
    'SMEs’ management strategy\n' +
    'to alleviate MH problems,\n' +
    'including transition from\n' +
    'remote working back to the\n' +
    'office; *(3) factors beyond\n' +
    'the employer’s control\n' +
    'affecting staff MH, and\n' +
    'critical measures to address\n' +
    'them; *(4) challenges faced\n' +
    'by the different age groups;',
    'The deliverables of WP1\n' +
    '(survey and model),\n' +
    'guidance published by\n' +
    'policy makers and findings\n' +
    'from management,\n' +
    'occupational health,\n' +
    'organisational and clinical\n' +
    'psychology literature,\n' +
    'inform the framework\n' +
    'development to map various\n' +
    'practices (supporting\n' +
    'business operations),\n' +
    'strategies and interventions\n' +
    '(alleviating MH and\n' +
    'wellbeing issues, supporting\n' +
    'staff), aligned to the SMEs’\n' +
    'staff needs during and after\n' +
    'the pandemic, which will\n' +
    'help to increase staff\n' +
    'productivity in different\n' +
    'working contexts.',
    'Develop and test a user-\n' +
    'friendly gamified\n' +
    'application enabling SMEs’\n' +
    'staff to anonymously and\n' +
    'remotely answer an\n' +
    'interactive gamified survey\n' +
    'that automatically assesses\n' +
    'their MH condition.\n' +
    'Consolidated results are\n' +
    'anonymised and visualized\n' +
    'in a dashboard for the\n' +
    'employees and managers in\n' +
    'each SME.',
    'The primary objective is to\n' +
    'examine the impact and\n' +
    'effectiveness of the\n' +
    'framework in a longitudinal\n' +
    'study and using the data\n' +
    'collected from the MH App'];

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
        return this.texts[this.number - 1].includes('*') ? this.texts[this.number - 1].split('*') : [];
    }

}
