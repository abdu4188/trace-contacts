<template>
  <div>
      <nav>
        <div class="nav-wrapper teal">
        <a href="#" class="brand-logo">Trace Contacts</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a> {{username}} </a></li>
            <li><a>Logout</a></li>
        </ul>
        </div>
    </nav>
  </div>
</template>

<script>
export default {
    data(){
        return{
            username: null
        }
    }
}
</script>

<style>

</style>