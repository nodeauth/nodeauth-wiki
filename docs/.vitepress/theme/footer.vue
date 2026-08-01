<template>
  <footer class="doc-custom-footer">
    <div class="policy-links">
      <template v-if="isZh">
        <a href="https://www.nodeauth.io/cn/" target="_blank" rel="noopener">NodeAuth 官网</a>
        <a href="https://demo.nodeauth.io" target="_blank" rel="noopener">在线演示</a>
        <a href="https://license.nodeauth.io" target="_blank" rel="noopener">授权中心</a>
        <a href="https://wiki.nodeauth.io" target="_blank" rel="noopener">Wiki文档</a>
        <a href="https://tools.nodeauth.io" target="_blank" rel="noopener">部署工具</a>
      </template>
      <template v-else>
        <a href="https://www.nodeauth.io" target="_blank" rel="noopener">NodeAuth Home</a>
        <a href="https://demo.nodeauth.io" target="_blank" rel="noopener">Online Demo</a>
        <a href="https://license.nodeauth.io" target="_blank" rel="noopener">License Center</a>
        <a href="https://wiki.nodeauth.io" target="_blank" rel="noopener">Wiki Docs</a>
        <a href="https://tools.nodeauth.io" target="_blank" rel="noopener">Deployment Tools</a>
      </template>
    </div>
    <div class="doc-copyright">
      Copyright © {{ currentYear }} NodeAuth. All rights reserved.
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { lang, page } = useData()
const currentYear = new Date().getFullYear()

const isZh = computed(() => {
  return lang.value?.startsWith('zh') || page.value?.relativePath?.startsWith('cn/')
})
</script>

<style scoped>
.doc-custom-footer {
  margin-top: 20px;
  padding-top: 20px;
  padding-bottom: 16px;
  border-top: 1px solid var(--vp-c-divider);
  text-align: center;
}
.doc-copyright {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  margin-top: 8px;
}
</style>
