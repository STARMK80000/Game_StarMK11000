
<template>
  <div class="home">
    <h1>Home Page - 拖拽卡片</h1>
    <p>欢迎来到首页！尝试拖拽下面的卡片。</p>

    <div 
      class="card-container"
      @dragover.prevent
      @drop="onDrop"  
    >
      <div
        v-for="(card, index) in cards"
        :key="card.id"
        draggable="true"
        @dragstart="onDragStart($event, index)"
        @dragend="onDragEnd"
        class="draggable-card"
        :class="{ 'dragging': draggedCardIndex === index }"
      >
        <h3>{{ card.title }}</h3>
        <p>{{ card.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Home',
  setup() {
    const cards = ref([
      { id: 1, title: '卡片 1', content: '这是第一张可拖拽的卡片' },
      { id: 2, title: '卡片 2', content: '这是第二张可拖拽的卡片' },
      { id: 3, title: '卡片 3', content: '这是第三张可拖拽的卡片' },
      { id: 4, title: '卡片 4', content: '这是第四张可拖拽的卡片' },
    ]);

    const draggedCardIndex = ref(null);

    const onDragStart = (event, index) => {
      event.dataTransfer.setData('text/plain', index.toString());
      draggedCardIndex.value = index;
      event.target.classList.add('drag-start'); // 添加拖拽开始样式
    };

    const onDragEnd = () => {
      draggedCardIndex.value = null;
      // 移除拖拽开始样式
      document.querySelectorAll('.draggable-card').forEach(card => {
        card.classList.remove('drag-start');
      });
    };

    const onDrop = (event) => {
      event.preventDefault();
      const draggedIndex = parseInt(event.dataTransfer.getData('text/plain'));
      const targetIndex = Array.from(event.currentTarget.children).indexOf(event.target.closest('.draggable-card'));
      
      if (targetIndex !== -1 && draggedIndex !== targetIndex) {
        // 交换卡片位置
        const newCards = [...cards.value];
        [newCards[draggedIndex], newCards[targetIndex]] = [newCards[targetIndex], newCards[draggedIndex]];
        cards.value = newCards;
      }
    };

    return {
      cards,
      draggedCardIndex,
      onDragStart,
      onDragEnd,
      onDrop
    };
  }
};
</script>

<style scoped>
.home {
  padding: 20px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
  min-height: 200px; /* 提供一个最小高度以便拖放 */
  border: 2px dashed #ccc; /* 可视化拖放区域 */
  padding: 10px;
}

.draggable-card {
  width: 200px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  cursor: move; /* 表明可拖拽 */
  transition: transform 0.1s ease, box-shadow 0.1s ease;
  user-select: none; /* 防止拖拽时选中文本 */
}

.draggable-card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.draggable-card.dragging {
  opacity: 0.5;
  transform: scale(0.98);
}

.draggable-card.drag-start {
  transform: scale(1.05);
  z-index: 1000; /* 确保拖起的卡片在最上层 */
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

.draggable-card h3 {
  margin-top: 0;
  color: #333;
}

.draggable-card p {
  color: #666;
  margin-bottom: 0;
}
</style>



