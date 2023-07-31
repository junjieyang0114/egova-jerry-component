<template>
    <div v-if="itemList && itemList.length">
        <a-form
            :ref="getFormRef"
            :class="formClassName"
            :style="style"
            :layout="useHorizontal ? 'horizontal' : 'inline'"
            :initial-values="initialValues"
            @submit="handleSubmit"
        >
            <!-- 使用v-for来遍历列表 -->
            <a-form-item v-for="(item, index) in finalItemList" :key="index">
                <!-- 使用v-if来处理自定义的搜索和重置按钮 -->
                <div v-if="index === finalItemList.length - 1" class="fb-ControlGroup">
                    <span @click="submit">
                        <!-- 渲染搜索按钮，优先使用props中定义的renderSearchElement方法 -->
                        <slot name="searchElement">
                            <a-button type="primary">搜索</a-button>
                        </slot>
                    </span>
                    <span @click="reset">
                        <!-- 渲染重置按钮，优先使用props中定义的renderResetElement方法 -->
                        <slot name="resetElement">
                            <a-button>重置</a-button>
                        </slot>
                    </span>
                </div>
                <div v-else>
                    <!-- 对于非搜索和重置按钮，直接渲染内容 -->
                    {{ item.content }}
                </div>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
import Vue from "vue";
import { Form } from "ant-design-vue";
import { Store } from "ant-design-vue/lib/form/interface";

export default {
    name: "SearchForm",
    props: {
        itemList: Array, // 表单项，参考：IFormItemData
        onSubmit: Function, // 提交数据时触发的方法
        columnNumber: Number, // 每行默认的列数
        inlineMaxNumber: {
            type: Number,
            default: 3 // 表单项小于等于几时，使用inline，默认为3
        },
        initialValues: Object, // Form的初始化
        disabled: Boolean, // 禁用
        getFormInstance: Function, // 获取表单实例，需要联动时，需要使用此方法
        className: String,
        style: Object
    },
    data() {
        return {
            form: null
        };
    },
    computed: {
        useHorizontal() {
            return this.columnNumber || this.itemList.length > this.inlineMaxNumber;
        },
        finalItemList() {
            // 添加额外的搜索和重置按钮
            if (!this.disabled && this.itemList) {
                return this.itemList.concat([
                    {
                        content: null
                    }
                ]);
            }
            return this.itemList || [];
        },
        formClassName() {
            return ["fb-SearchForm", this.useHorizontal ? "fb-SearchFormHorizontal" : "", this.className];
        }
    },
    methods: {
        // 处理提交事件
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.onSubmit(values);
                }
            });
        },
        // 处理搜索
        submit() {
            this.handleSubmit(new Event("submit"));
        },
        // 处理重置
        reset() {
            this.form.resetFields();
            this.submit();
        },
        // 获取form实例
        getFormRef(ref) {
            this.form = ref;
            if (this.getFormInstance) {
                this.getFormInstance(ref);
            }
        }
    }
};
</script>

<style scoped>
/* Add your styles here */
.fb-ControlGroup {
    display: flex;
    justify-content: space-between;
}
</style>
