<template>
  <div class="p20">
    <!--查询 新增-->
    <div class="search-add">
      <div class="search">
        <span>工序名称:</span>
        <el-input v-model="searchText" size="small" placeholder="请输入工序名称"/>
      </div>
      <div class="operator">
        <el-button type="primary" icon="el-icon-search" @click="initTable">
          查询
        </el-button>
        <el-button type="primary" icon="el-icon-refresh" @click="reset()">
          重置
        </el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="add">
          新增
        </el-button>
      </div>
    </div>

    <!--列表-->
    <div class="processtable">
      <el-table
        :data="tableData"
        height="50vh"
        stripe
        border
        highlight-current-row
        class="textList"
      >
        <el-table-column prop="process" label="工序过程"/>
        <el-table-column prop="createName" label="创建人"/>
        <el-table-column prop="createTime" label="创建时间"/>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="修改" placement="top">
              <el-button v-ltx="'gxUpdate'" type="warning" icon="el-icon-edit" size="small" circle
                         @click="edit(scope.row)"/>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button v-ltx="'gxDelete'" type="danger" icon="el-icon-delete" size="small" circle
                         @click="deleteProcess(scope.row.id)"/>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->

    <el-pagination
      :current-page="currentPage"
      :page-sizes="[10, 20, 30]"
      :page-size="pageSize"
      :total="total"
      class="pageList  "
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!--新增、编辑弹框-->
    <el-dialog
      :visible.sync="dialogVisible"
      title="新增工序信息"
      width="30%"
      append-to-body
      class="dialogBox"
    >
      <el-form :model="form" :rules="rules" label-width="80px">
        <el-form-item label="工序名称：" prop="process">
          <el-input v-model="form.process"/>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="form.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">
          取 消
        </el-button>
        <el-button type="primary" @click="addNew">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import request from '@/utils/request'

  export default {
    inject: ['reload'],
    name: 'ProcessInfo',
    props: {
      processTypeId: {
        type: String,
        default: ''
      },
      processTypeName: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        tableData: null,
        form: {
          processTypeId: '',
          process: '',
          remark: '',
          seq: ''
        },
        dialogVisible: false,
        searchText: '',
        // 分页
        total: 0,
        currentPage: 1,
        pageSize: 10,
        rules: {
          process: [
            { required: true, message: '请输入工序', trigger: 'blur' }
          ]
        }
      }
    },
    watch: {
      processTypeId: function() {
        console.log('watch', this.processTypeId, this.processTypeName)
        this.searchText = ''
        this.initTable()
      }
    },
    mounted() {
      this.initTable()
    },
    methods: {
      initTable() {
        return request
          .post('/rest/process/getList', {
            pageNo: this.currentPage,
            pageSize: this.pageSize,
            processTypeId: this.processTypeId,
            process: this.searchText
          })
          .then(res => {
            console.log('processlist', res.data)
            if (res.data.respCode === '0') {
              this.tableData = res.data.data.data
              this.total = res.data.data.totalCount
            }
          })
      },
      deleteProcess(processId) {
        this.$confirm('确定删除该工序?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() =>
          request.get(`/rest/process/delete/${processId}`).then(res => {
            res.data.respCode === '0' && this.initTable()
          })
        )
      },
      addNew() {
        if (this.form.process === '' || this.form.process === undefined) {
          this.$message({
            showClose: true,
            message: '请输入工序名称',
            type: 'warning'
          })
          return false
        }
        this.form.processTypeId = this.processTypeId
        return request.post('rest/process/processAdd', this.form).then(res => {
          this.dialogVisible = false
          this.initTable()
        })
      },
      add() {
        this.dialogVisible = true
        this.form = {}
      },
      edit(row) {
        this.dialogVisible = true
        this.titile = '修改'
        this.form = Object.assign({}, row)
      },
      handleSizeChange(size) {
        this.pageSize = size
        this.initTable()
      },
      handleCurrentChange(curPage) {
        this.currentPage = curPage
        this.initTable()
      },
      reset() {
        this.searchText = ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .p20 {
    background-color: #ecf5ff;
  }
 /* .search {
    float: left;
    margin-bottom: 10px;
  }*/
  .el-input {
    width: 200px;
  }
  .operator {
    float: right;
    margin-left: 100px;
  }
</style>

