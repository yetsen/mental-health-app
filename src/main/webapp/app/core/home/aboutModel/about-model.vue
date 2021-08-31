<template>
    <section class="container" id="aboutModel">
      <div class="container bootstrap snippets bootdeys">
        <div class="row">
          <div class="col-md-4 col-sm-6 content-card">
            <div class="card-big-shadow">
              <div class="card card-just-text" data-background="color" data-color="blue" data-radius="none">
                <div class="content">
                  <h6 class="category">The Main Objectives</h6>
                  <h4 class="title">Study Context</h4>
                  <p class="description">Develop a conceptual model that will facilitate analysing the relationship between MH issues faced by SMEs’ staff, factors and various job dimensions contributing... <br/><a @click="openReadMoreChart">Read More</a></p>
                </div>
              </div> <!-- end card -->
            </div>
          </div>

          <div class="col-md-4 col-sm-6 content-card">
            <div class="card-big-shadow">
              <div class="card card-just-text" data-background="color" data-color="green" data-radius="none">
                <div class="content">
                  <h6 class="category">Work Package 1</h6>
                  <h4 class="title">Study Context</h4>
                  <p class="description">The conceptual model will examine the impact of staff MH problems, well-being issues, and various factors (including work related) affecting these during COVID-19... <br/><a @click="openReadMoreChart2">Read More</a> </p>
                </div>
              </div> <!-- end card -->
            </div>
          </div>
          <div class="col-md-4 col-sm-6 content-card">
            <div class="card-big-shadow">
              <div class="card card-just-text" data-background="color" data-color="yellow" data-radius="none">
                <div class="content">
                  <h6 class="category">Work Package 2</h6>
                  <h4 class="title">Study Context</h4>
                  <p class="description">The deliverables of WP1 (survey and model), guidance published by policy makers and findings from management, occupational health... <br/><a @click="openReadMoreChart3">Read More</a> </p>
                </div>
              </div> <!-- end card -->
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 col-sm-6 content-card">
            <div class="card-big-shadow">
              <div class="card card-just-text" data-background="color" data-color="brown" data-radius="none">
                <div class="content">
                  <h6 class="category">Work Package 3</h6>
                  <h4 class="title">Study Context</h4>
                  <p class="description">Develop and test a user-friendly gamified application enabling SMEs’ staff to anonymously and remotely answer an interactive gamified... <br/><a @click="openReadMoreChart4">Read More</a> </p>
                </div>
              </div> <!-- end card -->
            </div>
          </div>

          <div class="col-md-4 col-sm-6 content-card">
            <div class="card-big-shadow">
              <div class="card card-just-text" data-background="color" data-color="purple" data-radius="none">
                <div class="content">
                  <h6 class="category">Work Package 4</h6>
                  <h4 class="title">Study Context</h4>
                  <p class="description">The primary objective is to examine the impact and effectiveness of the framework in a longitudinal study and using the data collected from the MH App </p>
                </div>
              </div> <!-- end card -->
            </div>
          </div>
        </div>
      </div>
      <b-modal ref="readMoreChart" id="readMoreChart" hide-footer hide-header>
        <div class="card-big-shadow">
          <div class="card card-just-text" data-background="color" data-color="blue" data-radius="none">
            <div class="content">
              <h6 class="category">The Main Objectives</h6>
              <h4 class="title">Study Context</h4>
              <ul>
                <li style="padding-bottom:1em">Develop a conceptual model that will facilitate analysing the relationship between MH issues faced by SMEs’ staff, factors and various job dimensions contributing to these issues, and its impact on both the staff and business productivity during the pandemic, through a multi-stage survey.</li>
                <li style="padding-bottom:1em">Develop a COVID-19 employee well-being framework comprising of strategies, practices and interventions, considering SMEs' needs and constraints, and conduct a longitudinal study with SMEs to evaluate its effectiveness and impact towards increasing the resilience and productivity of SMEs’ workforce in varying work contexts during and after the pandemic.</li>
                <li>Develop a COVID-19 MH application to monitor the MH conditions of SMEs’ workforce and pilot it with the longitudinal study, to show how the data collected through the app will enable each individual SME to understand its staff needs, introspect their well-being, that will facilitate customizing the framework, i.e. objectively putting in place practices, strategies and interventions to address employee MH, well-being and firm’s productivity related issues.</li>
              </ul>
            </div>
          </div>
        </div>
      </b-modal>
      <b-modal ref="readMoreChart2" id="readMoreChart2" hide-footer hide-header>
        <div class="card-big-shadow">
          <div class="card card-just-text" data-background="color" data-color="green" data-radius="none">
            <div class="content">
              <h6 class="category">Work Package 1: Development and validation of a conceptual audit model</h6>
              <h4 class="title">Study Context</h4>
              <p>The conceptual model will examine  the impact of staff MH problems, well-being issues, and various
                factors (including work related) affecting these during COVID-19, on staff and business productivity, and the UK economy.
                A survey instrument will be designed to examine the relationship between several constructs including: </p>
              <ul>
                <li>Impact of COVID on - job roles, environment, expectations and several dimensions, staff MH and well-being, training needs,
                  technology use, business productivity and supply chain resilience</li>
                <li>Individual strategies and SMEs’ management strategy to alleviate MH problems, including transition from remote working back to the office</li>
                <li>Factors beyond the employer’s control affecting staff MH, and critical measures to address them</li>
                <li>Challenges faced by the different age groups</li>
              </ul>
            </div>
          </div>
        </div>
      </b-modal>
      <b-modal ref="readMoreChart3" id="readMoreChart3" hide-footer hide-header>
        <div class="card-big-shadow">
          <div class="card card-just-text" data-background="color" data-color="yellow" data-radius="none">
            <div class="content">
              <h6 class="category">Work package 2: Development of the wellbeing framework for SMEs’ employees</h6>
              <h4 class="title">Study Context</h4>
              <p>The deliverables of WP1 (survey and model), guidance published by policy makers and findings from
                management, occupational health, organisational and clinical psychology literature, will inform the framework development
                to map various practices (supporting business operations), strategies and interventions (alleviating MH and wellbeing
                issues, supporting staff), aligned to the SMEs’ staff needs during and after the pandemic, which will help to increase
                staff productivity in different working contexts. </p>
            </div>
          </div>
        </div>
      </b-modal>
      <b-modal ref="readMoreChart4" id="readMoreChart4" hide-footer hide-header>
        <div class="card-big-shadow">
          <div class="card card-just-text" data-background="color" data-color="brown" data-radius="none">
            <div class="content">
              <h6 class="category">Work package 3: Mental Health App development</h6>
              <h4 class="title">Study Context</h4>
              <p>Develop and test a user-friendly gamified application enabling SMEs’ staff to anonymously and
                remotely answer an interactive gamified survey that will automatically assess their MH condition. Consolidated results
                will be anonymised and visualized in a dashboard for the employees and managers in each SME. </p>
            </div>
          </div>
        </div>
      </b-modal>
    </section>
</template>

<script lang="ts" src="./about-model.component.ts">
</script>
<style lang="scss" src="./about-model.scss" scoped>
</style>
