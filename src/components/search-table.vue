<template>
    <div :class="className" :style="style">
        <slot name="extra" :searchParams="searchParams" :refresh="refresh" />
        <a-table
            :class="tableClassName"
            :bordered="true"
            :style="tableStyle"
            :row-key="rowKey || 'id'"
            :loading="loading"
            :data-source="dataSource"
            :row-selection="rowSelection"
            :columns="columns"
            @change="handleTableChange"
        />
    </div>
</template>

<script>
export default {
    props: [
        "columns",
        "getListFunction",
        "rowKey",
        "renderExtra",
        "showQuickJumper",
        "showSizeChanger",
        "showTotal",
        "tableClassName",
        "tableStyle",
        "pageSize",
        "disableAutoHidePage",
        "tableProps",
        "selectedEnable",
        "dragEnable",
        "defaultSearchParams",
        "onSearchParamsChange",
        "onDataChange"
    ],
    data() {
        return {
            total: 0,
            current: 1,
            dataSource: [],
            loading: false,
            searchParams: this.defaultSearchParams,
            selectedRowKeys: [],
            selectedRows: [],
            className: "search-table",
            style: {}
        };
    },
    computed: {
        maxPageIndex() {
            return Math.max(1, Math.ceil(this.total / this.pageSize));
        },
        pagination() {
            if (this.disableAutoHidePage && this.pageTotal <= 1) {
                return false;
            } else {
                return {
                    total: this.total,
                    current: this.current,
                    showQuickJumper: this.showQuickJumper,
                    showTotal: this.showTotal,
                    showSizeChanger: this.showSizeChanger,
                    pageSize: this.pageSize
                };
            }
        },
        rowSelection() {
            return this.selectedEnable
                ? {
                      selectedRowKeys: this.selectedRowKeys,
                      onChange: this.handleRowChange
                  }
                : undefined;
        }
    },
    methods: {
        refresh() {
            this.requestList();
        },
        setLoading(loading) {
            this.loading = loading;
        },
        setSearchParams(searchParams) {
            this.searchParams = searchParams;
            this.changePage(1);
            if (this.onSearchParamsChange) {
                this.onSearchParamsChange(searchParams);
            }
        },
        async requestList() {
            this.setLoading(true);
            try {
                const res = await this.getListFunction(this.current, this.pageSize, this.searchParams);
                this.dataSource = res.dataSource || [];
                this.total = res.total;
                if (this.onDataChange) {
                    this.onDataChange({
                        dataSource: res.dataSource || [],
                        total: res.total
                    });
                }
                if (this.current > this.maxPageIndex) {
                    this.changePage();
                }
            } catch (error) {
                console.error(error);
            } finally {
                this.setLoading(false);
            }
        },
        changePage(pageIndex) {
            if (!pageIndex) {
                pageIndex = this.current;
            }
            if (pageIndex < 1) {
                pageIndex = 1;
            }
            if (pageIndex > this.maxPageIndex) {
                pageIndex = this.maxPageIndex;
            }
            this.current = pageIndex;
            this.requestList();
        },
        handleTableChange(pagination, filters, sorter) {
            const { current, pageSize } = pagination;
            this.changePage(current);
            this.pageSize = pageSize;
        },
        handleRowChange(selectedRowKeys, selectedRows) {
            this.selectedRowKeys = selectedRowKeys;
            this.selectedRows = selectedRows;
        }
    },
    mounted() {
        this.requestList();
    }
};
</script>

<style scoped>
/* Add your styles here */
</style>
