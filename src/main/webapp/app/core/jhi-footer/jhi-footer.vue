<template>
  <footer v-if="currentRoute == 'Home' || currentRoute == 'WorkPackage'" id="footer" class="footer">
    <div class="footer-top">
      <div class="container">
        <div class="row gy-4">
          <div class="col-lg-6 col-md-12 footer-info">
            <a class="logo d-flex align-items-center">
              <img src="/content/images/icon/UKRI-Logo.png" alt="">
            </a>
            <p>This project has received funding from UKRI- UK Research and Innovation under project ID number ES/V004263/1</p>
<!--            <div class="social-links mt-3">
              <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
              <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
              <a href="#" class="instagram"><i class="bi bi-instagram bx bxl-instagram"></i></a>
              <a href="#" class="linkedin"><i class="bi bi-linkedin bx bxl-linkedin"></i></a>
            </div>-->
          </div>

          <div class="col-lg-2 col-12 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li> <a @click="goTo('/')" v-smooth-scroll href="#hero"><font-awesome-icon icon="chevron-right"/> Home</a></li>
              <li> <a @click="goTo('/')" v-smooth-scroll href="#services"><font-awesome-icon icon="chevron-right"/> About the Project</a></li>
              <li> <a @click="goTo('/')" v-smooth-scroll href="#consortium"><font-awesome-icon icon="chevron-right"/> Consortium</a></li>
              <li> <a @click="goTo('/')" v-smooth-scroll href="#team"><font-awesome-icon icon="chevron-right"/> Contact Us</a></li>
            </ul>
          </div>

          <div class="col-lg-4 col-md-12 footer-contact text-center text-md-start">
            <h4>Contact Us</h4>
            <p>
              Aston University <br>
              Birmingham<br>
              B4 7ET <br>
              UK
              <br>
              +44 (0)121 204 3000<br>
            </p>

          </div>

        </div>
      </div>
    </div>
  </footer><!-- End Footer -->
</template>

<script lang="ts" src="./jhi-footer.component.ts">
</script>
<style lang="scss" src="./jhi-footer.scss" scoped></style>