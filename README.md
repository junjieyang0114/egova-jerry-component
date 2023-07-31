# 通用 CommonCurd 组件

## 概述

基于 Vue2 和 Ant Design Vue 1.78 版本 实现的通用 CRUD 组件。此组件是一个强大的工具，可帮助开发者在 web 应用程序中快速实现 CRUD（创建、读取、更新、删除）操作。支持表格视图和自定义视图切换、查询、新增、编辑、导出、批量删除等操作。

## 何时使用

当你的 web 应用需要实现以下功能时，你可以考虑使用此组件：

- **查询**：通过搜索表单查找特定的数据。
- **新增**：添加新的数据。
- **编辑**：更改现有的数据。
- **导出**：将数据导出为一个文件，如 CSV 或 Excel。
- **批量删除**：一次删除多行数据。
- **视图切换**：在表格视图和自定义视图之间切换。

## 如何使用

首先，你需要在你的 Vue 项目中引入该组件：
安装：pnpm install egova-jerry-components

````shell

```vue
import {CommonCurd} from 'egova-jerry-components'
import "egova-jerry-component/dist/style.scss";

````

## 示例

```vue
<template>
  <CommonCurd
    :columns="columns"
    :searchItems="searchItems"
    :getListFunction="getListFunction"
    :showExpand="true"
    :rowKey="'id'"
    :pageSize="10"
    :showCreateButton="true"
    :showEditButton="true"
    :showExportButton="true"
    :showBatchDeleteButton="true"
    :actionFunctions="{
      create: createItem,
      edit: editItem,
      export: exportData,
      batchDelete: batchDeleteItems,
    }"
  >
  </CommonCurd>
</template>

<script>
import { CommonCurd } from "egova-jerry-components";
import "egova-jerry-component/dist/style.scss";

export default {
  components: {
    CommonCurd,
  },
  data() {
    return {
      columns: [
        //...
      ],
      searchItems: [
        //...
      ],
      getListFunction: () => {
        //...
      },
    };
  },
};
</script>
```

## API

| 属性                      | 说明                                                                                                                                                                                                                                                                  | 类型            | 默认值 | 示例                                                                                                    |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------ | ------------------------------------------------------------------------------------------------------- |
| columns                   | 表格列的配置。每一项都是一个对象，包含列的各种属性，如 `title`（列头显示文字）、`dataIndex`（列数据在数据项中对应的 key）、`key`（React 的 key）、`render`（生成复杂数据的渲染函数，参数分别为当前行的值、当前行数据，行索引，@return 里面可以设置表格行/列合并）等。 | Array           | []     | `[{ title: 'Name', dataIndex: 'name', key: 'name' }]`                                                   |
| searchItems               | 搜索表单的数据。每一项都是一个对象，描述了一个搜索字段的各种属性，如 `name`（字段名称）、`label`（字段标签）、`component`（组件类型）、`props`（ant design vue 组件的其他属性,如"placeholder","defaultValue"等）等。                                                  | Array           | []     | `[{ name: 'name', label: 'Name', component: 'a-input', props:{placeholder:"请选择",defaultValue:""} }]` |
| getListFunction           | 数据请求方法，需要返回一个 Promise，该 Promise resolve 的值应该是请求得到的数据。                                                                                                                                                                                     | Function        | -      | `() => fetch('/api/data')`                                                                              |
| showExpand                | 是否展开搜索项。如果为 `true`，搜索项将会被展开，否则将被折叠。                                                                                                                                                                                                       | Boolean         | false  | `true`                                                                                                  |
| rowKey                    | 数据的标识键。可以是字符串，也可以是一个函数。如果是字符串，它应该是数据项的一个 key。如果是函数，它应该接受一个数据项作为参数，返回这个数据项的唯一标识。                                                                                                            | String/Function | 'id'   | `'id'` 或者 `(record) => record.id`                                                                     |
| pageSize                  | 每页数据量。决定了表格每页显示多少条数据。                                                                                                                                                                                                                            | Number          | 10     | `20`                                                                                                    |
| renderTableExtra          | 用来渲染额外的表格组件的操作方法（新增那一行的自定义内容）。这个方法应该返回一个 Vue 组件或者一个 JSX 元素。                                                                                                                                                          | Function        | -      | `() => <MyExtraComponent />`                                                                            |
| showCreateButton          | 是否显示新增按钮。(必须同时传入 actionFunctions.create){})                                                                                                                                                                                                            | Boolean         | true   | `false`                                                                                                 |
| showEditButton            | 是否显示编辑按钮。(必须同时传入 actionFunctions.edit)                                                                                                                                                                                                                 | Boolean         | true   | `false`                                                                                                 |
| showExportButton          | 是否显示导出按钮。(必须同时传入 actionFunctions.export)                                                                                                                                                                                                               | Boolean         | true   | `false`                                                                                                 |
| showBatchDeleteButton     | 是否显示批量删除按钮。(必须同时传入 actionFunctions.batchDelete)                                                                                                                                                                                                      | Boolean         | true   | `false`                                                                                                 |
| showToggleViewSwitch      | 是否显示视图切换按钮。                                                                                                                                                                                                                                                | Boolean         | false  | `true`                                                                                                  |
| alternativeComponent      | 替代的自定义视图组件。这可以是一个 Vue 组件的名称，也可以是一个 Vue 组件对象。当点击视图切换按钮时，表格视图将被这个组件替代。                                                                                                                                        | String/Object   | null   | `'MyCustomComponent'` 或者 `MyCustomComponent`                                                          |
| alternativeComponentProps | 切换到其他视图时的组件属性。这是一个对象，你可以通过这个属性向你的 `alternativeComponent` 传递任意的 props。                                                                                                                                                          | Object          | {}     | `{ prop: 'value' }`                                                                                     |
| actionFunctions           | 顶部操作区的功能。这是一个对象，它的每一个属性都是一个函数，这些函数可以实现顶部操作区的各种功能。 （新增,编辑,导出批量删除等操作按钮必须要配合着对应的 actionFunctions 才会显示）                                                                                    | Object          | {}     | `{ create: () => { console.log('add') }, edit: () => { console.log('edit') } }`                         |
| tableProps                | ant design vue 表格的其他属性。你可以通过这个属性向内部的 ant design vue 表格传递任意的 props。                                                                                                                                                                       | Object          | {}     | `{ bordered: true, loading: true }`                                                                     |
| rowSelectionProps         | ant design vue 表格的行选择属性。你可以通过这个属性向内部的 ant design vue 表格的行选择功能传递任意的 props。                                                                                                                                                         | Object          | {}     | `{ type: 'checkbox' }`                                                                                  |
| showActionList            | 是否显示操作行。如果为 `true`，操作行将显示，包含新增、编辑、批量删除等操作按钮可以自行定义。                                                                                                                                                                         | Boolean         | true   | `false`                                                                                                 |

```

```

# 通用 CommonAction 组件

## 概述

`CommonAction` 是一个基于 Vue2 实现的通用动作组件。这个组件主要负责提供一个模态框的功能，当需要弹出模态框时，你可以考虑使用此组件。

## 如何使用

首先，你需要在你的 Vue 项目中引入该组件：

```vue
<template>
  <CommonAction :title="Your Title" :visible="isVisible">
    <!-- Your Content Here -->
  </CommonAction>
</template>

<script>
import CommonAction from "path/to/common-action-component";

export default {
  components: {
    CommonAction,
  },
  data() {
    return {
      isVisible: true, // 控制模态框是否可见
    };
  },
};
</script>
```

## 方法

handleClose
关闭模态框，触发 update:visible 事件并将 visible 设置为 false。

```vue
methods: { handleClose() { this.$emit("update:visible", false); } }
```

## 事件

update:visible
当模态框的可见状态变化时，会触发该事件。

```vue
watch: { visible(newVal, oldVal) { console.log("visible changed from", oldVal,
"to", newVal); } }
```

请注意，此组件使用了 Vue 的 .sync 修饰符，因此可以使用 v-model 来双向绑定 visible 属性。

```vue
<template>
  <CommonAction v-model:visible="isVisible">
    <!-- Your Content Here -->
  </CommonAction>
</template>
```

## API

#### Props

| 属性    | 说明                 | 类型    | 默认值 |
| ------- | -------------------- | ------- | ------ |
| title   | 模态框的标题。       | String  | ""     |
| visible | 控制模态框是否可见。 | Boolean | false  |

# CommonForm Component

通用表单组件，支持多种表单项和自定义额外按钮。

## API

#### Props

| 属性         | 说明                   | 类型    | 默认值                            |
| ------------ | ---------------------- | ------- | --------------------------------- |
| title        | 表单标题。             | String  | ""                                |
| formItems    | 表单项定义的数组。     | Array   | []                                |
| itemsPerRow  | 每行显示的表单项数量。 | Number  | 1                                 |
| extraButtons | 额外按钮的定义数组。   | Array   | []                                |
| formModel    | 表单数据模型。         | Object  | {}                                |
| hideButtons  | 控制是否隐藏底部按钮。 | Boolean | false                             |
| submitButton | 提交按钮的定义。       | Object  | { text: "提交", type: "primary" } |
| backButton   | 返回按钮的定义。       | Object  | { text: "返回", type: "default" } |

### Methods

#### handleSubmit

表单提交方法，首先进行表单验证，通过则触发 `submit` 事件并传出表单数据。

```javascript
methods: {
  handleSubmit() {
    this.$refs.form.validate(valid => {
      if (valid) {
        this.$emit("submit", this.localFormModel);
      } else {
        console.log("提交出错！");
      }
    });
  }
}
```

#### handleBack

返回按钮的点击方法，触发 back 事件并传出表单数据。

```javascript
methods: {
handleBack() {
  this.$emit("back", this.localFormModel);
}
}
```

#### updateModel

更新表单数据模型，并触发 update:formModel 事件。

```javascript
methods: {
updateModel(key, value) {
  this.$set(this.localFormModel, key, value);
  this.$emit("update:formModel", this.localFormModel);
}
}

```
### Events
submit
提交表单时触发的事件。

back
点击返回按钮时触发的事件。

update:formModel
更新表单数据模型时触发的事件。

### Slots
default
默认插槽，用于在表单下方添加额外的内容。

```vue
<common-form
    title="Login Form"
>
    <!-- 这是一个自定义内容 -->
    <div>This is an auto content.</div>
</common-form>
