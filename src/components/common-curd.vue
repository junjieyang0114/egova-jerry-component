<template>
  <ConfigProvider :locale="locale">
    <div class="curd-root" ref="curdRef">
      <div class="search-box" v-if="searchItems.length > 0">
        <div class="search-root">
          <div
            class="search-row"
            v-for="(row, rowIndex) in searchRows"
            :key="'row-' + rowIndex"
            v-show="isExpanded || rowIndex === 0"
          >
            <div class="search-content">
              <div
                v-for="(item, index) in row"
                :key="index"
                class="search-item"
              >
                <span class="search-label">{{ item.label }}</span>
                <component
                  :is="item.component"
                  v-bind="item.props"
                  v-model="filters[item.name]"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="search-btn">
          <div class="expand" @click="toggleExpand" v-if="showExpand">
            {{ isExpanded ? "收起" : "展开"
            }}<i
              class="iconfont"
              :class="isExpanded ? 'icon-arrow-up' : 'icon-arrow-down'"
            ></i>
          </div>
          <a-button @click="handleSearch">查询</a-button>
          <a-button type="primary" @click="handleReset">重置</a-button>
        </div>
      </div>
      <section class="action-list" v-if="showActionList">
        <div class="table-extra">
          <a-button
            class="op-btn"
            v-if="showCreateButton === true && actionFunctions.create"
            @click="actionFunctions.create"
            ><i class="iconfont icon-add"></i>新增</a-button
          >
          <a-button
            class="op-btn"
            v-if="showEditButton && actionFunctions.edit"
            @click="actionFunctions.edit"
            ><i class="iconfont icon-edit"></i>编辑</a-button
          >
          <a-button
            class="op-btn"
            v-if="showExportButton && actionFunctions.export"
            @click="actionFunctions.export"
            ><i class="iconfont icon-download"></i>导出</a-button
          >
          <a-button
            class="op-btn"
            v-if="showBatchDeleteButton && actionFunctions.batchDelete"
            @click="actionFunctions.batchDelete"
            ><i class="iconfont icon-delete"></i>批量删除</a-button
          >
          <!-- 在这里使用renderTableExtra方法渲染列表顶部操作区 -->
          <slot name="table-extra" :extra-data="this.$data">
            {{ renderTableExtra() }}
          </slot>
        </div>
        <div class="toggle-view-switch">
          <a-switch v-if="showToggleViewSwitch" @change="toggleView">
            <i slot="checkedChildren" class="iconfont icon-more" />
            <i slot="unCheckedChildren" class="iconfont icon-mfoverview" />
          </a-switch>
        </div>
      </section>
      <section class="table-root" v-if="isTableView">
        <div class="table-content">
          <a-spin :spinning="isLoading">
            <a-table
              :columns="columns"
              :data-source="dataSource"
              :rowKey="rowKey"
              :scroll="tableScroll"
              :pagination="
                tableProps.pagination !== false
                  ? {
                      current: pagination.current,
                      pageSize: pagination.pageSize,
                      total: pagination.total,
                      showTotal: (total) => `${total}`,
                      showQuickJumper: true,
                    }
                  : false
              "
              @change="handleTableChange"
              v-bind="tableProps"
              :row-selection="
                Object.keys(rowSelectionProps).length > 0
                  ? rowSelectionProps
                  : null
              "
            />
          </a-spin>
        </div>
      </section>
      <section class="chart-root" v-else>
        <component
          :is="alternativeComponent"
          v-bind="alternativeComponentProps"
        ></component>
      </section>
    </div>
  </ConfigProvider>
</template>

<script>
import moment from "moment";
import { ConfigProvider } from "ant-design-vue";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

export default {
  components: {
    ConfigProvider,
  },
  props: {
    // 表格的列数据(required)
    columns: {
      type: Array,
      default: () => [],
    },
    // 搜索表单的数据
    searchItems: {
      type: Array,
      default: () => [],
    },
    // 请求数据的方法，需返回指定格式的数据 @param currentPage 当前页码，从1开始 @param pageSize 一页显示的数据量 @param searchParams 搜索参数(required)
    getListFunction: {
      type: Function,
      default: () => Promise.resolve([]),
    },
    // 搜索项是否需要展开
    showExpand: {
      type: Boolean,
      default: () => false,
    },
    // 数据标识符，可以是属性名称或者一个函数，如果是函数，返回值表示标识符的值
    rowKey: {
      type: [String, Function],
      default: "id",
    },
    // 一页显示的数量
    pageSize: {
      type: Number,
      default: 10,
    },
    // 渲染列表顶部操作区 @param extraData 表格的扩展区可用的数据的方法
    renderTableExtra: {
      type: Function,
      default: () => void 0,
    },
    // 是否显示新增按钮
    showCreateButton: {
      type: Boolean,
      default: () => false,
    },
    // 是否显示编辑按钮
    showEditButton: {
      type: Boolean,
      default: () => false,
    },
    // 是否显示导出按钮
    showExportButton: {
      type: Boolean,
      default: () => false,
    },
    // 是否显示批量删除按钮
    showBatchDeleteButton: {
      type: Boolean,
      default: () => false,
    },
    // 是否显示切换视图按钮
    showToggleViewSwitch: {
      type: Boolean,
      default: false,
    },
    // 切换视图时显示的组件
    alternativeComponent: {
      type: Function,
      default: null,
    },
    // 列表顶部操作区的函数
    actionFunctions: {
      type: Object,
      default: () => ({}),
    },
    // ant design vue表格的其他属性
    tableProps: {
      type: Object,
      default: () => ({}),
    },
    // ant design vue表格的选择属性
    rowSelectionProps: {
      type: Object,
      default: () => ({}),
    },
    // 是否显示操作列表
    showActionList: {
      type: Boolean,
      default: true,
    },
    // 切换视图时显示的组件的props
    alternativeComponentProps: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    isTableView: {
      immediate: true,
      async handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          await this.refreshData();
          this.$emit("viewChanged");
        }
      },
    },
  },
  data() {
    return {
      filters: this.getDefaultFilters(),
      dataSource: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
      isExpanded: false,
      isTableView: true,
      locale: zhCN,
      tableScroll: {},
      tableHeight: "",
      tableWidth: "100%",
      isLoading: false,
    };
  },
  computed: {
    searchRows() {
      const rows = [];
      for (let i = 0; i < this.searchItems.length; i += 3) {
        rows.push(this.searchItems.slice(i, i + 3));
      }
      return rows;
    },
    computedAlternativeComponentProps() {
      return {
        ...this.alternativeComponentProps,
        filters: this.filters,
      };
    },
  },
  beforeDestroy() {
    this.$parent.$off("viewChanged", this.refreshData);
  },
  methods: {
    async handleTableChange(pagination) {
      this.isLoading = true;
      this.pagination.current = pagination.current;
      const result = await this.getListFunction(this.filters, this.pagination);
      this.dataSource = result.data;
      this.pagination.total = result.total;
      this.isLoading = false;
    },
    async handleSearch() {
      this.pagination.current = 1;
      this.$emit("updateFilters", this.filters);
      this.isLoading = true;
      const result = await this.getListFunction(this.filters, this.pagination);
      this.dataSource = result.data;
      this.pagination.total = result.total;
      this.isLoading = false;
    },
    handleReset() {
      this.filters = this.getDefaultFilters();
      this.handleSearch();
    },
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
    toggleView() {
      this.isTableView = !this.isTableView;
    },
    getDefaultFilters() {
      const defaultFilters = {};
      for (const item of this.searchItems) {
        if (item.props.defaultValue !== undefined) {
          defaultFilters[item.name] = item.props.defaultValue;
        }
      }
      return defaultFilters;
    },
    async refreshData() {
      const result = await this.getListFunction(this.filters, this.pagination);
      this.dataSource = result.data;
    },
    getTableScroll(extraHeight, ref) {
      if (typeof extraHeight == "undefined") {
        //  默认底部分页64 + 边距10
        extraHeight = 74;
      }
      let tHeader = null;
      if (ref && ref.current) {
        tHeader = ref.current.getElementsByClassName("ant-table-thead")[0];
      } else {
        tHeader = document.getElementsByClassName("ant-table-thead")[0];
      }
      //表格内容距离顶部的距离
      let tHeaderBottom = 0;
      if (tHeader) {
        tHeaderBottom = tHeader.getBoundingClientRect().bottom;
      }
      // 窗体高度-表格内容顶部的高度-表格内容底部的高度
      const height = `calc(100vh - ${tHeaderBottom + extraHeight}px)`;
      // 空数据的时候表格高度保持不变,暂无数据提示文本图片居中
      if (ref && ref.current) {
        const placeholder = ref.current.getElementsByClassName(
          "ant-table-placeholder"
        )[0];
        if (placeholder) {
          placeholder.style.height = height;
          placeholder.style.display = "flex";
          placeholder.style.alignItems = "center";
          placeholder.style.justifyContent = "center";
        }
      }
      return height;
    },
    onResize() {
      if (this.$refs.curdRef) {
        this.tableHeight = this.getTableScroll(74, this.$refs.curdRef);
        // 在得到tableHeight后更新scroll.y的值
        this.tableScroll.y = this.tableHeight;
      }
      this.adjustTableWidth();
    },
    adjustTableWidth() {
      const tableContainer = this.$refs.curdRef;
      if (tableContainer) {
        this.tableWidth = `${tableContainer.offsetWidth}px`;
        this.tableScroll.x = this.tableWidth;
      }
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
  },
  async created() {
    this.isLoading = true;
    const result = await this.getListFunction(this.filters, this.pagination);
    this.dataSource = result.data;
    this.pagination.total = result.total;
    this.$on("viewChanged", this.refreshData);
    this.isLoading = false;
  },
  async mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
      this.adjustTableWidth();
      if (this.$refs.curdRef) {
        this.tableHeight = this.getTableScroll(74, this.$refs.curdRef);
        // 在得到tableHeight后更新scroll.y的值
        this.tableScroll.y = this.tableHeight;
        console.log(this.tableHeight);
      } else {
        window.onload = () => {
          this.tableHeight = this.getTableScroll(74, this.$refs.curdRef);
          // 在得到tableHeight后更新scroll.y的值
          this.tableScroll.y = this.tableHeight;
          console.log(this.tableHeight);
        };
      }
    });
  },
};
</script>

<style lang="scss">
.curd-root {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0rem 0.2rem;
  position: relative;
  .icon-more {
    color: #00000040;
    margin-left: -2px;
    position: absolute;
    left: 15%;
    transform: translateX(-15%);
  }
  .ant-switch {
    height: 0.35rem;
    align-items: center;
    display: flex;
    justify-content: center;
    width: 0.9rem;
    background-color: #e9ecf2;
  }
  .iconfont {
    margin-left: 0;
    font-size: 0.16rem;
  }
  .icon-mfoverview {
    color: rgba(0, 0, 0, 0.25);
    position: absolute;
    margin-left: 2px;
    left: 85%;
    transform: translateX(-85%);
  }

  .ant-switch-inner::before {
    content: "\e664";
    font-family: "iconfont" !important;
    font-size: 0.16rem;
    font-style: normal;
    color: #fff;
    z-index: 10;
    position: absolute;
    margin-left: -2px;
    top: 50%;
    left: 30%;
    transform: translate(-30%, -50%);
  }
  .ant-switch-checked .ant-switch-inner {
    margin-right: 0.35rem;
    display: flex;
    align-items: center;
    height: 0.25rem;
  }
  .ant-switch-checked .ant-switch-inner::before {
    content: "\e6e1";
    font-family: "iconfont" !important;
    font-size: 0.16rem;
    font-style: normal;
    color: #fff;
    z-index: 10;
    position: absolute;
    margin-left: 2px;
    left: 70%;
    top: 50%;
    transform: translate(-70%, -50%);
  }
  .ant-switch-loading-icon,
  .ant-switch::after {
    width: 60%;
    height: 100%;
    background-color: #38f;
    border-radius: 0.16rem;
    top: 0;
  }
  .ant-switch-inner {
    display: flex;
    margin: 0;
    height: 100%;
    width: 100%;
    align-items: center;
  }
  .ant-table-pagination.ant-pagination {
    position: absolute;
    bottom: 0;
    right: 2%;
    height: 0.3rem;
  }
  [ant-click-animating-without-extra-node="true"]::after,
  .ant-click-animating-node {
    display: none !important;
  }
  .ant-spin-nested-loading,
  .ant-spin-container {
    position: inherit;
  }
  .ant-table {
    font-size: 0.16rem !important;
    font-family: PingFangSC-Regular;
    font-weight: 400 !important;
    color: #223355;
    line-height: 0.28rem;
    .ant-table-thead > tr > th {
      height: 0.4rem;
      padding: 0.1rem 0.2rem;
      border-bottom: none;
      font-weight: 400 !important;
    }
    .ant-empty-description {
      display: none;
    }
    .ant-empty-image {
      position: relative;
    }
    .ant-empty-image::after {
      position: absolute;
      content: "暂无数据";
      width: 1rem;
      height: 0.3rem;
      top: 50%;
      left: 50%;
      transform: translate(-50%, 70%);
    }
    .ant-table-tbody > tr > td {
      padding-left: 0.2rem;
    }
    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td {
      padding: 0.12rem;
    }
  }
  .ant-pagination-total-text {
    font-family: PingFangSC-SNaNpxibold;
    font-weight: 600;
    font-size: 0.18rem;
    color: #3388ff;
    margin: 0 0.2rem;
  }
  .ant-pagination-total-text:before {
    content: "共";
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: 0.16rem;
    color: #223355;
    margin-right: 0.05rem;
  }
  .ant-pagination-total-text:after {
    content: "条";
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: 0.16rem;
    color: #223355;
    margin-left: 0.05rem;
  }
  .ant-pagination-item-active {
    font-weight: 500;
    background: #3388ff;
    border-radius: 2px;
    a {
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 0.16rem;
      color: #ffffff;
      text-align: center;
    }
  }
  .ant-pagination-options-quick-jumper {
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: 0.16rem;
    color: #223355;
  }
}
.search-box {
  width: 100%;
  background-color: #fff;
  padding: 0.1rem 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.1rem;
}
.search-root {
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.search-row {
  width: 100%;
  padding: 0.1rem 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.search-content {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  flex-shrink: 0;
  align-items: center;
}
.search-item {
  width: calc((100% - 0.4rem) / 3);
  margin-right: 5%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
}
.search-label {
  flex-shrink: 0;
  margin-right: 0.1rem;
  width: 25%;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 0.16rem;
  color: #223355;
  text-align: left;
  line-height: 0.24rem;
}
.ant-input {
  height: 0.3rem !important;
  width: 100%;
  background: #ffffff;
  border: 1px solid #dde1eb;
  border-radius: 2px;
  padding: 0.01rem 0.1rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 0.16rem;
}
.ant-calendar-picker {
  width: 100%;
  height: 0.3rem;
}
.ant-select {
  width: 100%;
  height: 0.3rem;
}
.search-btn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 20%;
  padding: 0.1rem 0;
}
.op-btn {
  border: none !important;
  color: #223355 !important;
  padding-left: 0;
  box-shadow: none !important;
}
.search-bt1 {
  background: #ffffff;
  border: 0.01rem solid #3388ff;
  border-radius: 0.02rem;
  filter: blur(0.1rem);
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 16px;
  color: #3388ff;
}
.ant-btn {
  background: #ffffff;
  border: 1px solid #3388ff;
  border-radius: 0.02rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 0.16rem;
  color: #3388ff;
}
.ant-btn-primary {
  margin-left: 0.1rem;
  background: #3388ff;
  border-radius: 0.02rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 0.16rem;
  color: #ffffff;
  text-align: center;
  line-height: 0.24rem;
}

.expand {
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 0.16rem;
  color: #3388ff;
  margin-right: 0.3rem;
}

section {
  width: 100%;
  background-color: #fff;
  padding: 0.1rem 0.2rem;
}
.iconfont {
  margin-left: 0.1rem;
}
.icon-add,
.icon-edit {
  font-size: 0.16rem;
  color: #3388ff;
  margin-left: 0 !important;
  margin-right: 0.05rem;
}
.icon-download {
  font-size: 0.16rem;
  color: #11c79b;
  margin-left: 0 !important;
  margin-right: 0.05rem;
}
.icon-delete {
  font-size: 0.16rem;
  color: #ff0000;
  margin-left: 0 !important;
  margin-right: 0.05rem;
}

.ant-table:not(.ant-table-bordered)
  .ant-table-thead
  th:not(.ant-table-selection-column):not(:first-child) {
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    height: 0.16rem;
    width: 1px;
    background: #e9ecf2;
    z-index: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  &[rowspan="2"]::before {
    content: "";
    position: absolute;
    left: 0;
    height: 0.4rem;
    width: 1px;
    background: #e9ecf2;
    top: 0.2rem;
    z-index: 0;
  }
}
.action-list {
  margin-bottom: 0.1rem;
  padding: 0 0.2rem;
  height: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .toggle-view-switch {
    display: flex;
    align-items: center;
    height: 0.35rem;
  }
}
.table-root {
  flex: 1;
  overflow: hidden;
  padding: 0.1rem 0.2rem;
}
.chart-root {
  flex: 1;
}
.table-content {
  height: calc(100% - 0.5rem);
  overflow: hidden;
}
.table-extra {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
