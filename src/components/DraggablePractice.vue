<template>
  <div class="fluid container">
    <div class="form-group form-group-lg panel panel-default">
      <div class="panel-body">
        <div class="checkbox">
          <label><input type="checkbox" v-model="editable">드래그 앤 드롭</label>
        </div>
        <!-- <button type="button" class="btn btn-default" @click="orderList">id에 따라 정렬</button> -->
      </div>
    </div>

    <h3>음식 분류</h3>
    <div class="foods">
      <div class="foods-section">
        <h4>과일</h4>
        <div>
          <draggable class="list-group" tag="ul" v-model="fruitList" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
            <transition-group type="transition" :name="'flip-list'">
              <li class="list-group-item" v-for="element in fruitList" :key="element.order">
                <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
                {{element.order}}. {{element.name}}
              </li>
            </transition-group>
          </draggable>
        </div>
      </div>
      <div class="foods-section">
        <h4>곡식</h4>
        <div>
          <draggable class="list-group" tag="ul" v-model="grainList" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
            <transition-group type="transition" :name="'flip-list'">
              <li class="list-group-item" v-for="element in grainList" :key="element.order">
                <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
                {{element.order}}. {{element.name}}
              </li>
            </transition-group>
          </draggable>
        </div>
      </div>
    </div>

    <h3>식판</h3>
    <div class="tray-layout">
      <draggable element="span" v-model="trayList" v-bind="dragOptions" :move="onMove">
        <transition-group name="no" class="list-group" tag="ul">
          <li class="list-group-item" v-for="element in trayList" :key="element.order">
            <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
            {{element.order}}. {{element.name}}
          </li>
        </transition-group>
      </draggable>
    </div>

    <!-- <div class="list-group col-md-3">
      <pre>{{listString}}</pre>
    </div>
    <div class="list-group col-md-3">
      <pre>{{list2String}}</pre>
    </div> -->
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable
  },
  data() {
    return {
      fruitList: [
        {name: "바나나"},
        {name: "사과"},
        {name: "오렌지"},
        {name: "망고"}
      ],
      grainList: [
        {name: "흰쌀"},
        {name: "보리쌀"},
        {name: "밀"},
        {name: "귀리"}
      ],
      trayList: [],
      editable: true,
      isDragging: false,
      delayedDragging: false
    };
  },
  mounted() {
    this.setListOrder();
  },
  methods: {
    setListOrder() {
      this.fruitList = this.fruitList.map((fruit, index)=>{
        return {...fruit, order: index + 1, fixed: false}
      })
      this.grainList = this.grainList.map((grain, index)=>{
        return {...grain, order: index + 1, fixed: false}
      })
    },
    orderList() {
      this.list = this.list.sort((one, two) => {
        return one.order - two.order;
      });
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    },
    listString() {
      return JSON.stringify(this.list, null, 2);
    },
    list2String() {
      return JSON.stringify(this.list2, null, 2);
    }
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    }
  }
};
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

h4 {
  margin: 0;
}

ul {
  padding-inline-start: 0px;
}

li {
  list-style: none;
}

.foods {
  display: flex;
}

.foods-section {
  display: flex;
  flex-direction: column;
  margin-right: 30px;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}

.tray-layout{
  width: 500px;
  height: 300px;
  background-color: thistle;
  border-radius: 2rem;
  padding: 20px;
}
</style>