<template>
    <div
            contenteditable="true"
            v-text="innerText"
            :contenteditable="canEdit"
            @input="changeText"
            @focus="isLocked = true"
            @blur="isLocked = false"
            class="contenteditable"
            ref="textart"
    ></div>
</template>
<script>
    export default {
        props: {
            value: {
                type: String,
                default: ""
            },
          canEdit: {
            type: Boolean,
            default: true
          }
        },
        data() {
            return {
                innerText: this.value,
                isLocked: false
            };
        },
        watch: {
            value() {
                if (!this.isLocked || !this.innerText) {
                    this.innerText = this.value;
                }
            }
        },
        methods: {
            changeText() {
                this.$emit("input", this.$el.innerHTML);
            },
            InputBlur() {
                this.$refs.textart.blur()
            }
        }
    };
</script>
<style lang="less" scoped>
    .contenteditable {
        min-height: 20px;
        outline: 0;
        line-height: 24px;
        padding: 2px;
        word-wrap: break-word;
        overflow-x: hidden;
        overflow-y: auto;
        font-size: 14px;
        -webkit-user-select: text
    }
</style>
