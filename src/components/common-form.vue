<template>
    <div class="common-form">
        <!-- 表单标题 -->
        <div class="form-title" v-if="title">{{ title }}</div>

        <!-- 表单主体 -->
        <a-form ref="form" :model="localFormModel" :rules="formRules" v-if="formItems && formItems.length > 0">
            <!-- 表单项 -->
            <div class="form-row" v-for="(row, rowIndex) in formRows" :key="'row-' + rowIndex">
                <a-form-item v-for="(item, index) in row" :key="index" :label="item.label" :prop="item.name" :class="item.class">
                    <slot name="renderFormItem" :item="item">
                        <component
                            :is="item.component"
                            v-bind="item.props"
                            :value="localFormModel[item.name]"
                            @input="value => updateModel(item.name, value)"
                        />
                    </slot>
                </a-form-item>
            </div>

            <!-- 底部按钮，可选择隐藏 -->
            <a-form-item v-if="!hideButtons" class="bottom-btn">
                <a-button :type="backButton.type" @click="handleBack">{{ backButton.text }}</a-button>
                <a-button :type="submitButton.type" @click="handleSubmit">{{ submitButton.text }}</a-button>
                <a-button
                    class="extra-btn"
                    v-for="(button, index) in extraButtons"
                    :key="index"
                    :type="button.type"
                    @click="button.onClick(localFormModel)"
                >
                    {{ button.text }}
                </a-button>
            </a-form-item>
        </a-form>
            <!-- 可额外传入的组件 -->
        <div class="extra-component">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        formItems: {
            type: Array,
            default: () => []
        },
        itemsPerRow: {
            type: Number,
            default: 1
        },
        extraButtons: {
            type: Array,
            default: () => []
        },
        formModel: {
            type: Object,
            default: () => ({})
        },
        hideButtons: {
            type: Boolean,
            default: false
        },
        submitButton: {
            type: Object,
            default: () => ({ text: "提交", type: "primary" })
        },
        backButton: {
            type: Object,
            default: () => ({ text: "返回", type: "default" })
        }
    },

    data() {
        return {
            localFormModel: { ...this.formModel }
        };
    },

    watch: {
        formModel: {
            handler(newVal) {
                this.localFormModel = { ...newVal };
            },
            deep: true,
            immediate: true
        }
    },

    computed: {
        formRows() {
            const rows = [];
            for (let i = 0; i < this.formItems.length; i += this.itemsPerRow) {
                rows.push(this.formItems.slice(i, i + this.itemsPerRow));
            }
            return rows;
        },

        formRules() {
            return this.formItems.reduce((rules, item) => {
                if (item.required) {
                    rules[item.name] = [{ required: true, message: item.message || `${item.label}是必填项`, trigger: "change" }];
                }
                return rules;
            }, {});
        }
    },

    methods: {
        handleSubmit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$emit("submit", this.localFormModel);
                } else {
                    console.log("提交出错！");
                }
            });
        },

        handleBack() {
            this.$emit("back", this.localFormModel);
        },

        updateModel(key, value) {
            this.$set(this.localFormModel, key, value);
            this.$emit("update:formModel", this.localFormModel);
        }
    }
};
</script>

<style lang="scss">
.common-form {
    width: 100%;
    height: 100%;
    padding: 0.1rem 0.1rem;
    position: relative;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: 0.16rem;
    text-align: left;
    .form-title {
        font-family: PingFangSC-Medium;
        font-weight: 600;
        font-size: 0.18rem;
        color: #223355;
        text-align: left;
        line-height: 0.28rem;
        position: relative;
        margin-left: 0.2rem;
    }
    .form-title::before {
        position: absolute;
        content: "";
        top: 50%;
        left: -0.2rem;
        transform: translateY(-50%);
        width: 0.08rem;
        height: 0.18rem;
        background: #3388ff;
        border-radius: 0.02rem;
    }
    .bottom-btn {
        display: flex;
        justify-content: center !important;
        position: absolute;
        bottom: 0;
        width: 100%;
    }
    .ant-form-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-shrink: 0;
        flex: 1;
        margin-bottom: 0;
    }
    .ant-form-item-label {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 0.16rem;
        color: #6b7a99;
        text-align: left;
        line-height: 0.24rem;
        padding: 0.1rem 0;
        align-items: center;
        width: 15%;
    }
    .extra-btn {
        margin-left: 0.1rem;
    }
}
.form-row {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
</style>
