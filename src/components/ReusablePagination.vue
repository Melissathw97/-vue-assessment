<script setup lang="ts">
import ReusableIconButton from "@/components/ReusableIconButton.vue"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline"

defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  displaySize: {
    type: Number,
    required: true
  },
  totalItems: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  pageNumbers: {
    type: Array<Number>,
    required: true
  }
})

const emits = defineEmits(["click", "pageSelect"])

const onPageSelect = (page: Number) => {
  emits("pageSelect", page)
}
</script>

<template>
  <div class="pagination-wrapper">
    <div class="showing-wrapper">
      Showing {{ (currentPage - 1) * displaySize + 1 }} to
      {{ currentPage * displaySize > totalItems ? totalItems : currentPage * displaySize }} of
      {{ totalItems }}
    </div>

    <div class="page-wrapper">
      <ReusableIconButton
        size="sm"
        :disabled="currentPage === 1"
        @click="() => onPageSelect(currentPage - 1)"
      >
        <template v-slot:icon>
          <ChevronLeftIcon />
        </template>
      </ReusableIconButton>

      <ReusableIconButton
        v-for="pageNumber in pageNumbers"
        :key="pageNumber"
        size="sm"
        :disabled="pageNumber === currentPage"
        @click="() => onPageSelect(pageNumber)"
        :class="[{ active: pageNumber === currentPage }]"
      >
        <template v-slot:icon>
          {{ pageNumber }}
        </template>
      </ReusableIconButton>

      <ReusableIconButton
        size="sm"
        :disabled="currentPage >= totalPages"
        @click="() => onPageSelect(currentPage + 1)"
      >
        <template v-slot:icon>
          <ChevronRightIcon />
        </template>
      </ReusableIconButton>
    </div>
  </div>
</template>

<style scoped>
.pagination-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 15px 0;
}

.showing-wrapper {
  display: none;
}

.page-wrapper {
  display: flex;
  gap: 5px;
}

.active {
  cursor: default;
  background-color: rgba(255, 255, 255, 0.5);
}

@media (min-width: 768px) {
  .pagination-wrapper {
    justify-content: space-between;
  }

  .showing-wrapper {
    display: block;
  }
}
</style>
