<script setup lang="ts">
import { defineProps } from 'vue';

interface Props {
  date: string
}

const props = defineProps<Props>();

const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };
  const formattedDate = new Date(date).toLocaleDateString('en-GB', options);
  return formattedDate;
}

const formattedDate = formatDate(props.date);
</script>

<template>
  <div class="text-gray text-center">
    <span>{{ formattedDate }}</span>
  </div>
</template>
