<script setup>
import TableProducts from '@/components/TableProducts.vue';
import TableRecents from '@/components/TableRecents.vue';
import DashboardPanels from '@/components/DashboardPanels.vue';
import SalesChart from '@/components/SalesChart.vue';



</script>

<template>

  <div class="dash text-black dark:text-white">
<DashboardPanels />
   <div class="grid gap-4 mt-8">
  <div class="grid grid-cols-2 gap-4">

    <TableProducts />
    <TableRecents />

  </div>
    </div>
</div>

  
</template>


<style scoped>
.bg-green{
  background-color: #A3C86D;
}

.bg-yellow{
  background-color: #FDD761;
}
.bg-orange{
  background-color: #FF7857;
}

.bg-purple{
	background-color: #b17897;
}
.bg-blue{
	background-color: #7a83ee;
}

</style>
