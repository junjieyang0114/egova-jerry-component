<template>
  <div class="Root">
    <CommonCurd
      :columns="columns"
      :getListFunction="getListFunction"
      :searchItems="searchItems"
      :showExportButton="true"
      :showToggleViewSwitch="true"
      :actionFunctions="actionFunctions"
    />
  </div>
</template>

<script>
import CommonCurd from "./common-curd.vue";
import moment from "moment";

export default {
  name: "HelloWorld",
  components: {
    CommonCurd,
  },
  data: function () {
    return {
      actionFunctions: {
        export: this.exportFunction,
      },
      columns: [
        {
          title: "",
          dataIndex: "",
          with: 30,
          customRender: (text, record) => {
            console.log("record", record);
            return record.rowSpan === 0
              ? { attrs: { colSpan: 0 } }
              : {
                  children: text,
                  attrs: {
                    rowSpan: record.rowSpan,
                  },
                };
          },
        },
        {
          title: "问题区域",
          dataIndex: "areaName",
          colSpan: 2,
          customRender: (text, record) => {
            console.log("record", record);
            return record.rowSpan === 0
              ? { attrs: { colSpan: 0 } }
              : {
                  children: text,
                  attrs: {
                    rowSpan: record.rowSpan,
                  },
                };
          },
        },
        {
          title: "问题",
          dataIndex: "problem",
          width: 150,
          colSpan: 0,
        },
        {
          title: "洪山区",
          dataIndex: "hongshan",
        },
        {
          title: "江岸区",
          dataIndex: "jiangan",
        },
        {
          title: "江汉区",
          dataIndex: "jianghan",
        },
        {
          title: "硚口区",
          dataIndex: "qiaokou",
        },
        {
          title: "汉阳区",
          dataIndex: "hanyang",
        },
        {
          title: "武昌区",
          dataIndex: "wuchang",
        },
        {
          title: "青山区",
          dataIndex: "qingshan",
        },
        {
          title: "总计",
          dataIndex: "total",
        },
      ],
      searchItems: [
        {
          label: "查询时间:",
          name: "searchTime",
          component: "a-range-picker",
          props: {
            placeholder: ["开始时间", "结束时间"],
            defaultValue: [moment().startOf("year"), moment()],
          },
        },
      ],
    };
  },
  methods: {
    getListFunction() {
      // to do
      return new Promise((resolve) => {
        const dataList = [
          {
            id: 1,
            areaName: "问题类型",
            problem: "护栏维修",
            hongshan: 1,
            jiangan: 2,
            jianghan: 3,
            qiaokou: 4,
            hanyang: 5,
            wuchang: 6,
            qingshan: 7,
            total: 28,
          },
          {
            id: 2,
            areaName: "问题类型",
            problem: "路沿石",
            hongshan: 1,
            jiangan: 2,
            jianghan: 3,
            qiaokou: 4,
            hanyang: 5,
            wuchang: 6,
            qingshan: 7,
            total: 28,
          },
          {
            id: 3,
            areaName: "问题类型",
            problem: "桥面维修",
            hongshan: 1,
            jiangan: 2,
            jianghan: 3,
            qiaokou: 4,
            hanyang: 5,
            wuchang: 6,
            qingshan: 7,
            total: 28,
          },
          {
            id: 4,
            areaName: "问题类型",
            problem: "车行道",
            hongshan: 1,
            jiangan: 2,
            jianghan: 3,
            qiaokou: 4,
            hanyang: 5,
            wuchang: 6,
            qingshan: 7,
            total: 28,
          },
          {
            id: 5,
            areaName: "问题类型",
            problem: "路面维修",
            hongshan: 1,
            jiangan: 2,
            jianghan: 3,
            qiaokou: 4,
            hanyang: 5,
            wuchang: 6,
            qingshan: 7,
            total: 28,
          },
          {
            id: 6,
            areaName: "问题设施",
            problem: "A桥梁",
            hongshan: 1,
            jiangan: 2,
            jianghan: 3,
            qiaokou: 4,
            hanyang: 5,
            wuchang: 6,
            qingshan: 7,
            total: 28,
          },
          {
            id: 7,
            areaName: "问题设施",
            problem: "B桥梁",
            hongshan: 1,
            jiangan: 2,
            jianghan: 3,
            qiaokou: 4,
            hanyang: 5,
            wuchang: 6,
            qingshan: 7,
            total: 28,
          },
          {
            id: 8,
            areaName: "问题设施",
            problem: "C桥梁",
            hongshan: 1,
            jiangan: 2,
            jianghan: 3,
            qiaokou: 4,
            hanyang: 5,
            wuchang: 6,
            qingshan: 7,
            total: 28,
          },
          {
            id: 9,
            areaName: "问题设施",
            problem: "D桥梁",
            hongshan: 1,
            jiangan: 2,
            jianghan: 3,
            qiaokou: 4,
            hanyang: 5,
            wuchang: 6,
            qingshan: 7,
            total: 28,
          },
          {
            id: 10,
            areaName: "问题设施",
            problem: "E桥梁",
            hongshan: 1,
            jiangan: 2,
            jianghan: 3,
            qiaokou: 4,
            hanyang: 5,
            wuchang: 6,
            qingshan: 7,
            total: 28,
          },
          {
            id: 11,
            areaName: "汇总",
            problem: "总计",
            hongshan: 1,
            jiangan: 2,
            jianghan: 3,
            qiaokou: 4,
            hanyang: 5,
            wuchang: 6,
            qingshan: 7,
            total: 28,
          },
        ];
        console.log(this.preprocessData(dataList, "areaName"));
        resolve({
          data: this.preprocessData(dataList, "areaName"),
          total: dataList.length,
        });
      });
    },
    exportFunction() {},
    preprocessData(data, dataIndex) {
      const areaNameCounts = {};
      data.forEach((row) => {
        const areaName = row[dataIndex];
        if (areaNameCounts[areaName] !== undefined) {
          areaNameCounts[areaName]++;
        } else {
          areaNameCounts[areaName] = 1;
        }
      });

      let lastAreaName = null;
      /* eslint-disable */
      let rowIndex = 0;
      let rowSpan = 1;

      return data.map((row, index) => {
        const areaName = row[dataIndex];
        if (index !== 0 && areaName === lastAreaName) {
          rowSpan = 0;
        } else {
          rowIndex = index;
          lastAreaName = areaName;
          rowSpan = areaNameCounts[areaName];
        }

        return {
          ...row,
          rowSpan,
        };
      });
    },
    handleEdit() {
      console.log("handleEdit");
    },
    handleDelete() {
      console.log("handleDelete");
    },
  },
  props: {
    msg: String,
  },
};
</script>

<style lang="scss">
.Root {
  height: 100%;
  width: 100%;
  padding: 0.2rem 0;
  background-color: #eee;
}
</style>
