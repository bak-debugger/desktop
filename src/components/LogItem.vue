<script setup>
  defineProps({
    id: String,
    time: String,
    color: String,
    content: String,
    caller: String,
  });
</script>

<template>
  <div
    class="max-w-full overflow-x-hidden border-b border-b-gray-300 dark:border-b-gray-600 flex items-start justify-between border-l-4"
    :class="{
      'border-l-green-600': color === 'green',
      'border-l-orange-600': color === 'orange',
      'border-l-red-600': color === 'red',
      'border-l-purple-600': color === 'purple',
      'border-l-blue-600': color === 'blue',
      'border-l-gray-600': color === 'gray',
    }"
  >
    <div class="p-5 flex-none">
      {{ time }}
    </div>
    <div class="p-5 max-w-5xl flex-col">
<pre class="w-full p-5 bg-gray-200 p-5 rounded-md overflow-x-auto mb-2">
{{ caller }}
</pre>
      <a :href="`phpstorm://${caller['file']}:${caller['line']}`" class="text-gray-500 underline dark:text-gray-400">{{ /[^/]*$/.exec(caller['file'])[0] }}:{{ caller['line'] }}</a>
    </div>
  </div>
</template>
