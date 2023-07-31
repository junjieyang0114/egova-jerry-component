# 数据管理表格组件使用说明及API文档

此Vue组件是一个通用的数据管理表格，可用于展示、搜索、编辑、创建、删除、导出数据等功能。它主要包含了搜索框、操作按钮、数据表格和可选的图表视图。

## 如何使用

1. 在Vue项目中引入该组件。
2. 在需要使用此组件的地方，使用Vue的`<curd-root>`标签，并通过属性来配置表格的行为。
3. 通过`getListFunction`传入一个函数用来获取数据。该函数需要返回一个Promise，该Promise的resolve值应为一个对象，包含数据列表和数据总量。

### 示例

```vue
<common-curd
  :columns="columns"
  :searchItems="searchItems"
  :getListFunction="fetchData"
  :showCreateButton="true"
  :showEditButton="true"
  :showExportButton="true"
  :showBatchDeleteButton="true"
  :actionFunctions="{
    create: createItem,
    edit: editItem,
    export: exportData,
    batchDelete: batchDeleteItems
  }"
></common-curd>

### API 文档
Props
名称	                类型	         默认值	              是否必须	 描述
columns	                Array	        []	                是	      表格的列数据
searchItems	            Array	        []	                否	      搜索表单的数据
getListFunction	        Function	    Promise.resolve([])	是	      请求数据的方法
showExpand	            Boolean	        false	            否	      搜索项是否需要展开
rowKey	                String/Function	""	                否	      数据标识符
pageSize	            Number	        10	                否	      一页显示的数量
renderTableExtra	    Function	    undefined	        否	      渲染列表顶部操作区的方法
showCreateButton	    Boolean	        false	            否	      是否显示新增按钮
showEditButton	        Boolean	        false	            否	      是否显示编辑按钮
showExportButton	    Boolean	        false	            否	      是否显示导出按钮
showBatchDeleteButton	Boolean	        false	            否	      是否显示批量删除按钮
showToggleViewSwitch	Boolean	        false	            否	      是否显示切换视图按钮
alternativeComponent	String/Object	null	            否	      切换视图时显示的组件
actionFunctions	        Object	        {}	                否	      列表顶部操作区的函数
tableProps	            Object	        {}	                否	      ant design vue表格的其他属性
rowSelectionProps	    Object	        {}	                否	      ant design vue表格的选择属性

Data
名称	    类型	 默认值	                                  描述
filters	    Object	{}	                                    当前搜索过滤器的状态
dataSource	Array	[]	                                    当前数据源
pagination	Object	{ current: 1, pageSize: 10, total: 0 }	分页信息
isExpanded	Boolean	false	                                搜索框是否展开
isTableView	Boolean	true	                                当前是否为表格视图

Computed
名称	    描述
searchRows	将searchItems按每三个分成一组，形成多行搜索项

Methods
名称	            参数	     描述
handleTableChange	pagination	处理表格页码变化
handleSearch	    -	        处理搜索
handleReset	        -	        重置搜索
toggleExpand	    -	        展开/收起搜索项
toggleView	        -	        切换视图

Events
名称	        参数	 描述
updateFilters	filters	当搜索条件变化时触发


# 通用表单组件使用说明及API文档

这是一个用于创建表单的Vue组件。表单的结构，例如标题、提交按钮和表单项，都可以通过属性传入。你也可以使用插槽自定义某些表单项的渲染。

## 如何使用

1.在Vue项目中引入该组件。
2.在需要使用此组件的地方，使用Vue的<common-form>标签，并通过属性来配置表单的行为。

### 示例

```vue
<common-form
  :title="formTitle"
  :formItems="formItems"
  :itemsPerRow="2"
  :extraButtons="extraButtons"
  :formModel="formModel"
  :hideButtons="false"
  :submitButton="{ text: '提交', type: 'primary' }"
  :backButton="{ text: '返回', type: 'default' }"
></common-form>

### API 文档
Props
名称	        类型	    默认值	                         是否必须	 描述
title	        String	无                               否	      表单的标题
formItems	    Array	  []	                             是	      表单项的配置信息
itemsPerRow	  Number	1	                               否	      每行显示的表单项数量
extraButtons	Array	  []	                             否	      额外的按钮
formModel	    Object	{}	                             是	      表单的数据模型
hideButtons	  Boolean	false	                           否	      是否隐藏默认的提交和返回按钮
submitButton	Object	{ text: '提交', type: 'primary' }	否	     提交按钮的配置信息
backButton	  Object	{ text: '返回', type: 'default' }	否	     返回按钮的配置信息

Data
名称	           类型	    默认值	描述
localFormModel	Object	{}	   本地的表单数据模型

Computed
名称	     描述
formRows	将formItems分行
formRules	基于formItems生成表单规则

Methods
名称	         描述
handleSubmit	处理表单提交
handleBack	  处理返回按钮的点击事件
updateModel	  更新localFormModel的值

Events
名称	             描述
submit	          当表单提交时触发
back	            当点击返回按钮时触发
update:formModel	当localFormModel更新时触发

Slots
名称	   描述
default	默认的插槽，用于放置自定义的内容


# CommonAction组件

`CommonAction`是一个Vue组件，它表示一个具有滑动-淡出过渡效果的动作面板。面板中的内容可以自定义。

## 如何使用

首先在Vue项目中引入该组件，然后在需要使用此组件的地方，使用`<CommonAction>`标签，并通过属性来配置面板的标题和可见性。

### 示例

```vue
<CommonAction
  :title="Action Title"
  :visible="isVisible"
  @update:visible="handleVisibilityChange"
>
  <!-- 自定义内容 -->
</CommonAction>

API文档
Props
名称	    类型	   默认值	是否必须	描述
title	   String 	""	  否	     面板的标题
visible	 Boolean	false	是	     面板是否可见

Methods
名称	       描述
handleClose	处理关闭面板的事件

Events
名称	           描述
update:visible	当面板的可见性改变时触发

Slots
名称	   描述
default	默认的插槽，用于放置自定义的内容
