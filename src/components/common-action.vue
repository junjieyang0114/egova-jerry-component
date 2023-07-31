<template>
    <transition name="slide-fade">
        <div v-if="visible" class="action-root">
            <div class="header">
                <div class="modal-title" @click="handleClose"><i class="iconfont icon-back"></i>{{ title }}</div>
            </div>
            <div class="body">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "CommonAction",
    props: {
        title: {
            type: String,
            default: ""
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        visible(newVal, oldVal) {
            console.log("visible changed from", oldVal, "to", newVal);
        }
    },
    methods: {
        handleClose() {
            this.$emit("update:visible", false);
        }
    }
};
</script>

<style lang="scss">
.action-root {
    position: absolute;
    top: 0;
    left: 0.2rem;
    z-index: 1000;
    width: calc(100% - 0.4rem);
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: auto;
}
.header {
    width: 100%;
    border-bottom: 1px solid #e9ecf2;
    box-shadow: 0 1px 0 0 #e9ecf2;
    flex-shrink: 0;
}
.body {
    flex: 1;
}
.modal-title {
    font-family: PingFangSC-SNaNpxibold;
    font-weight: 600;
    width: 20%;
    font-size: 0.2rem;
    color: #223355;
    display: flex;
    align-items: center;
    padding: 0.2rem 0.1rem;
    .iconfont {
        margin-right: 0.1rem;
    }
}
.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateY(100%);
    opacity: 0;
}
.slide-fade-leave,
.slide-fade-enter-to {
    transform: translateY(0);
    opacity: 1;
}

.modal-title {
    cursor: pointer;
}
</style>
