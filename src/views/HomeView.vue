<script setup>
  import { onMounted, ref } from "@vue/runtime-core";
  import LogItem from "../components/LogItem.vue";
  import EmptyLog from "@/components/EmptyLog.vue";

  const logs = ref([]);

  onMounted(() => {
    window.socket.on("event", (e) => {
      let exists = logs.value.filter((item) => item.id === e.id);
      if (exists.length > 0) {
        logs.value.map((item, i) => {
          if (item.id === e.id) {
            logs.value[i] = e;
          }
        });
      } else {
        logs.value.push(e);
      }
    });
  });
</script>

<template>
  <main>
    <LogItem
      v-if="logs.length > 0"
      v-for="log in logs"
      :key="log.id"
      :id="log.id"
      :color="log.color"
      :content="log.content"
      :time="log.time"
      :caller="log.caller"
    />
    <EmptyLog v-else />
  </main>
</template>
