<template>
  <div class="cate_container">
    <el-card class="box-card">
      <div slot="header" class="header_box">
        <span>文章分类</span>
        <el-button type="primary" size="mini" @click="addCate">添加分类</el-button>
      </div>
      <el-table :data="artCateList" style="width: 100%" stripe border>
        <!-- type是table-column内置属性，index为索引值 -->
        <el-table-column type="index" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="cate_name" label="分类名称">
        </el-table-column>
        <el-table-column prop="cate_alias" label="分类别名">
        </el-table-column>
        <el-table-column label="操作">
          <!-- 作用域插槽，用来获取该行数据
            scope对象：{ row: 行对象 }-->
          <template v-slot="scope">
            <el-button type="primary" size="mini" @click="updateCate(scope.row)">修改</el-button>
            <el-button type="danger" size="mini" @click="deleteCate(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="35%" @close="dialogClose">
      <el-form ref="addArtCateform" :model="addArtCateForm" :rules="addArtCateRules" label-width="80px">
        <el-form-item label="分类名称" prop="cate_name">
          <el-input autocomplete="off" v-model.trim="addArtCateForm.cate_name"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input autocomplete="off" v-model.trim="addArtCateForm.cate_alias"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancle" size="small">取 消</el-button>
        <el-button type="primary" @click="confirm" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getArticleCateAPI, addArtCateAPI, updateArtCateAPI, daleteArtCateAPI } from '@/api'
export default {
  name: 'art-cate',
  data () {
    return {
      // 文章分类列表
      artCateList: [],
      // 控制对话框开关的属性
      dialogVisible: false,
      dialogTitle: '添加文章分类',
      // 是否处于修改状态的属性
      isEdit: false,
      editId: '',
      delId: '',
      // 添加文章分类输入框的表单
      addArtCateForm: {
        cate_name: '',
        cate_alias: ''
      },
      // 添加文章分类输入框的表单验证规则
      addArtCateRules: {
        cate_name: [
          { required: true, message: '文章名称不能为空', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '文章名称必须为1-10个非空格字符', trigger: 'blur' }
        ],
        cate_alias: [
          { required: true, message: '文章别名不能为空', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '文章别名必须为1-15个大小写字母和数字组成的字符串', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 获取文章列表数据函数
    async getArtCateList () {
      const { data: res } = await getArticleCateAPI()
      if (res.code !== 0) return this.$message.error(res.message)
      // console.log(res.data)
      this.artCateList = res.data
    },
    // 添加文章分类按钮点击事件，点击打开添加分类对话框
    addCate () {
      this.isEdit = false
      this.editId = ''
      this.dialogVisible = true
      this.dialogTitle = '添加文章分类'
    },
    // 对话框取消按钮点击事件，点击关闭对话框
    cancle () {
      this.dialogVisible = false
    },
    // 对话框确认按钮点击事件，点击关闭对话框并且保存表单数据
    confirm () {
      this.$refs.addArtCateform.validate(async valid => {
        if (valid) {
          if (this.isEdit) {
            // this.addArtCateForm.id = this.editId
            // updateArtCateAPI(this.addArtCateForm)
            const { data: res } = await updateArtCateAPI({ id: this.editId, ...this.addArtCateForm })
            if (res.code !== 0) return this.$message.error(res.message)
            this.$message.success(res.message)
          } else {
            const { data: res } = await addArtCateAPI(this.addArtCateForm)
            if (res.code !== 0) return this.$message.error(res.message)
            this.$message.success(res.message)
          }
          this.getArtCateList()
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },
    // 对话框关闭时的回调
    dialogClose () {
      this.$refs.addArtCateform.resetFields()
    },
    // 文章列表修改按钮点击事件
    updateCate (row) {
      this.isEdit = true
      this.editId = row.id
      this.dialogVisible = true
      this.dialogTitle = '修改文章分类'
      // this.$nextTick() 会等待dom元素创建之后再去走回调
      // Dialog 的内容是懒渲染的，即在第一次被打开之前，传入的默认 slot 不会被渲染到 DOM 上。
      this.$nextTick(() => {
        // 数据回显（回填）将这一行的数据回显到对话框的表单中
        this.addArtCateForm.cate_name = row.cate_name
        this.addArtCateForm.cate_alias = row.cate_alias
      })
    },
    // 文章分类列表删除按钮点击事件
    deleteCate (row) {
      this.delId = row.id
      this.$confirm('是否删除该文章分类', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await daleteArtCateAPI(this.delId)
        if (res.code !== 0) return this.$message.error(res.message)
        this.getArtCateList()
        this.$message({
          type: 'success',
          message: res.message
        })
      }).catch(() => {
      })
    }
  },
  created () {
    this.getArtCateList()
  }
}
</script>

<style lang="less" scoped>
.header_box span {
  font-size: 16px;
  font-weight: bold;
}
.header_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>
