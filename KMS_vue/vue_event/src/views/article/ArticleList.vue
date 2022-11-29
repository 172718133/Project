<template>
  <div class="list_container">
    <!-- 文章筛选区域 -->
    <el-card class="box-card">
      <div slot="header" class="header_box">
        <span>文章列表</span>
        <el-button style="float: right;" type="primary" size="small" @click="PublishArt">发表文章</el-button>
      </div>
      <!-- 文章筛选表单 -->
      <el-form :inline="true" ref="screenFrom" :model="seachInfo">
        <el-form-item label="文章分类">
          <el-select placeholder="请选择分类" v-model="seachInfo.cate_id">
            <el-option v-for="(item) in cateList" :label="item.cate_name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布状态">
          <el-select placeholder="请选择状态" v-model="seachInfo.state">
            <el-option label="已发布" value="已发布"></el-option>
            <el-option label="草稿" value="草稿"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="screen">筛选</el-button>
          <el-button type="info" size="small" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 文章列表区域 -->
      <el-table :data="articleList" style="width: 100%" border stripe="">
        <el-table-column prop="title" label="文章标题">
          <template v-slot="scope">
            <el-link type='primary' @click="toDetail(scope.row.id)"> {{scope.row.title}} </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="cate_name" label="分类">
        </el-table-column>
        <el-table-column prop="pub_date" label="发表时间">
          <template v-slot='scope'>
            <span>{{ $formatDate(scope.row.pub_date) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态">
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页插件 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="seachInfo.pagenum" :page-sizes="[5, 10, 20, 30]" :page-size="seachInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <!-- 发表文章弹窗 -->
    <el-dialog title="发表文章" :visible.sync="dialogVisible" width="80%" :before-close="handleClose" @closed="onDialogClosed">
      <el-form :model="addArtInfo" label-width="100px" :rules="addArtRules" ref="addArtfrom">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="addArtInfo.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="cate_id">
          <el-select v-model="addArtInfo.cate_id" placeholder="请选择分类" style="width: 100%">
            <el-option v-for="(item) in cateList" :label="item.cate_name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <quill-editor v-model="addArtInfo.content" @blur="contentChange"></quill-editor>
        </el-form-item>
        <el-form-item label="文章封面" prop="cover_img">
          <img class="coverImg" ref="imgRef" src="@/assets/images/cover.jpg" alt="">
          <br>
          <input type="file" accept="image/*" ref="selCover" style="display: none" @change="changeCover">
          <el-button type="text" @click="fileBtn">+ 选择封面</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="post('草稿')">存为草稿</el-button>
        <el-button type="primary" @click="post('已发布')">发 布</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getArticleCateAPI, addArtAPI, getArtListAPI, delArtApi } from '@/api'
import img from '../../assets/images/cover.jpg'
export default {
  name: 'art-list',
  data () {
    return {
      // 查询文章的表单对象
      seachInfo: {
        pagenum: 1,
        pagesize: 5,
        cate_id: '',
        state: ''
      },
      // 发表文章的表单对象
      addArtInfo: {
        title: '',
        cate_id: '',
        content: '',
        cover_img: null,
        state: ''
      },
      // 发表文章的表单验证规则
      addArtRules: {
        title: [
          { required: true, message: '文章标题不能为空', trigger: 'blur' },
          { min: 1, max: 30, message: '文章标题长度为1-30个字符', trigger: 'blur' }
        ],
        cate_id: [{ required: true, message: '文章分类不能为空', trigger: 'change' }],
        content: [{ required: true, message: '文章内容不能为空', trigger: 'blur' }],
        cover_img: [{ required: true, message: '文章封面不能为空', trigger: 'change' }]
      },
      cateList: [],
      // 控制对话框开关的属性
      dialogVisible: false,
      articleList: [],
      total: 0,
      artDetail: []
    }
  },
  methods: {
    // 获取文章分类列表
    async getArtCatesList () {
      const { data: res } = await getArticleCateAPI()
      if (res.code !== 0) return this.$message.error(res.message)
      this.cateList = res.data
    },
    // 获取文章列表
    async getArtList () {
      const { data: res } = await getArtListAPI(this.seachInfo)
      if (res.code !== 0) return this.$message.error(res.message)
      this.articleList = res.data
      this.total = res.total
    },
    // 文章列表的筛选按钮
    screen () {
      this.seachInfo.pagenum = 1
      this.seachInfo.pagesize = 5
      this.getArtList()
    },
    // 文章列表的重置按钮
    reset () {
      this.seachInfo.pagenum = 1
      this.seachInfo.pagesize = 5
      this.seachInfo.cate_id = ''
      this.seachInfo.state = ''
      this.getArtList()
    },
    // 发表文章按钮点击事件
    PublishArt () {
      this.dialogVisible = true
    },
    // 发表文章弹窗关闭前的回调
    async handleClose (done) {
      const closeResult = await this.$confirm('内容还未保存，是否确认退出？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (closeResult === 'cancel') return
      done()
    },
    // 选择封面按钮点击时间
    fileBtn () {
      this.$refs.selCover.click()
    },
    // 用户选择封面文件
    changeCover (e) {
      const files = e.target.files
      if (files.length === 0) {
        this.addArtInfo.cover_img = null
        this.$refs.imgRef.setAttribute('src', img)
      } else {
        console.log(files[0])
        this.addArtInfo.cover_img = files[0]
        const url = URL.createObjectURL(files[0])
        this.$refs.imgRef.setAttribute('src', url)
      }
      this.$refs.selCover.value = null
    },
    // 发布/草稿的点击事件
    post (str) {
      this.addArtInfo.state = str
      this.$refs.addArtfrom.validate(async valid => {
        if (valid) {
          if (!valid) return this.$message.error('请完善文章信息！')
          // 3. 判断是否提供了文章封面
          if (!this.addArtInfo.cover_img) return this.$message.error('请选择文章封面！')
          // 准备一个表单数据对象的容器 formdata类是HTML5新出的专门为了装文件内容和其他的参数的一个容器
          const fd = new FormData()
          fd.append('title', this.addArtInfo.title)
          fd.append('cate_id', this.addArtInfo.cate_id)
          fd.append('content', this.addArtInfo.content)
          fd.append('cover_img', this.addArtInfo.cover_img)
          fd.append('state', this.addArtInfo.state)
          const { data: res } = await addArtAPI(fd)
          if (res.code !== 0) return this.$message.error(res.message)
          this.$message.success(res.message)
          this.dialogVisible = false
        } else {
          return false
        }
      })
      this.getArtList()
    },
    // 富文本编辑器的改变事件
    contentChange () {
      this.$refs.addArtfrom.validateField('content')
    },
    // 对话框完全关闭之后的处理函数
    onDialogClosed () {
      // 清空关键数据
      this.$refs.addArtfrom.resetFields()
      // 因为这2个变量对应的标签不是表单绑定的, 所以需要单独控制
      this.addArtInfo.content = ''
      this.$refs.imgRef.setAttribute('src', img)
    },
    // 分页组件每页显示的条数发生变化时的回调
    handleSizeChange (sizes) {
      // size: 当前每页要显示条数值
      // 属性绑定了.sync，已经让vue变量实现了双向绑定，可直接发起请求
      this.seachInfo.pagesize = sizes // 以防万一，再写一次
      // 每页条数由小变大->页码会由大变小，如果此时处于页面较大的页面去切换条数，会导致条数、页码都改变，同时重新发起请求，若页面先响应会导致数据为空
      // 解决：每次条数发生变化时，都将页码重新设置为第一页，修改完页面再去请求，就不会触发页码改变的回调函数
      this.seachInfo.pagenum = 1
      this.getArtList()
    },
    // 分页组件页码发生改变时的回调
    handleCurrentChange (nowPage) {
      this.seachInfo.pagenum = nowPage
      this.getArtList()
    },
    // 显示文章详情
    async toDetail (artId) {
      this.$router.push('art-list/art-detail/' + artId)
    },
    // 删除文章按钮，点击事件
    handleDelete (artId) {
      this.$confirm('是否确认删除该文章？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await delArtApi(artId)
        if (res.code !== 0) return this.$message.error(res.message)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getArtList()
      }).catch(() => {
      })
    }
  },
  created () {
    this.getArtCatesList()
    this.getArtList()
  }
}
</script>

<style lang="less" scoped>
.header_box span {
  font-size: 16px;
  font-weight: bold;
}
.el-form-item {
  margin-right: 20px;
}
.header_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
::v-deep .ql-editor {
  min-height: 300px;
}
::v-deep .el-dialog {
  margin: 30px auto 50px !important;
}
.coverImg {
  // width: 400px;
  height: 260px;
  object-fit: cover;
}
.el-pagination {
  text-align: right;
  margin-top: 30px;
}
</style>
