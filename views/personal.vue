<template>
    <div class="person">
        <div class="information">
            <p>{{titleee}}</p>
        </div>
        <div class="m-body">
            <div class="form1">
                <div class="header-title">
                    <span class="headers">标题名称</span>
                    <input type="text" v-model="xd.title" />
                </div>
                <div class="header-title">
                    <span class="headers">类&emsp;&emsp;型</span>
                    <select class="typeIn" v-model="xd.type">
                        <option v-for="item in typeList" :key="item.id" :value="item.id" :label="item.label">
                            <!-- {{item.label}} -->
                        </option>
                    </select>
                    <select v-if="jobShow" v-model="job">
                        <option v-for="item in jobList" :key="item.id" :value="item.id" :label="item.label"></option>
                    </select>
                </div>
                <div class="header-title">
                    <span class="headers">说&emsp;&emsp;明</span>
                    <!-- <input type="text" v-model="content" /> -->
                    <!-- 富文本编辑器 -->
                    <quill-editor v-model="content" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)">
                    </quill-editor>
                </div>
                <div class="header-title">
                    <span class="headerr">跳转链接</span>
                    <input type="text" v-model="xd.url" />
                </div>
            </div>
            <div class="header-title">
                <span class="headers">配&emsp;&emsp;图</span>
                <!-- 暂时不清楚这个label的意义在哪 -->
                <label class="uupfile" for="upfile" @click="upfileclear">选择文件</label>
                <!-- 这个参数代表固定的参数，传递事件 -->
                <input type="file" id="upfile" style="display: none" @change="upfileFile($event)" ref="clearFile">
            </div>
            <img alt="图片预览" :src="xd.imgurl" >
        </div>
        <table class="aa">
            <thead>
                <tr>
                    <th>图片名</th>
                    <th>文件大小</th>
                    <th>进度</th>
                    <th>操作</th>
                    <th>操作</th>
                </tr>
                <tr v-if="imgData">
                    <td>{{imgName}}</td>
                    <td>{{imgSize}}</td>
                    <!-- 进度条 -->
                    <td class="con">
                        <div class="duo">
                            <div class="bar" :style="{width:proBar+'%'}"></div>
                        </div>{{proBar}}%
                    </td>
                    <td>{{imgStatus}}</td>
                    <td>
                        <button @click="upload">上传</button>
                        <button @click="deletee">删除</button>
                    </td>
                </tr>
            </thead>
        </table>
        <div class="last">
            <button :disabled="btn" @click="goOnline(2)">立即上线</button>
            <button :disabled="btn" @click="goOnline(1)">存为草稿</button>
            <button class="cancel" @click="cancell()">取消</button>
        </div>
    </div>
</template>
<script type="text/javascript" src="plugin/ueditor/ueditor.config.js"></script>
<script type="text/javascript" src="plugin/ueditor/ueditor.all.min.js"></script>
<script>
import { quillEditor } from 'vue-quill-editor'
    import {
        changeArticle,
        typeList,
        jobList
    } from "@/http/article.js";
    export default {
        name: "personal",
        data() {
            return {
                typeList: "", //类型列表
                jobShow: false,
                jobList: "", //职业列表
                xd: { //图片预览的数据
                    title: "",
                    type: "",
                    url: "", //输入图片的网址
                    imgurl: "" //图片预览
                },
                typeIn: "", //类型列表
                newUrl: "", //新的
                oldUrl: "", //旧的
                imgName: "", //图片预览名称
                imgSize: "", //图片预览大小
                imgStatus: "", //图片预览状态
                proBar: 0,
                imgData: false, //未上传图片隐藏图片属性
                reader: {},
                content: "", //说明
                btn: true, //按钮禁用
                fileDataa: "", //图片上传到服务器文件夹的传参数据
                // params: {}, 
                uurl: "", //数据上传到后台的图片数据
                job: '',
                title: "", //编辑页面的标题
                titleee: "", //新增或编辑
            };
        },
        created() {
            this.typeList = typeList;
            this.jobList = jobList;
            this.xd.imgurl = this.newUrl;
            let query = this.$route.query; //获取传参
            console.log(query);
            this.title = query.title;
            if (query.title == "edit") {
                this.titleee = "编辑Article"
            } else {
                this.titleee = "新增Article"
            }
            if (query.id) {
                changeArticle.getarticle(query.id).then(res => {
                    console.log(res)
                    let article = res.data.data.article;
                    this.xd.title = article.title;
                    this.xd.type = article.type;
                    if (this.xd.type === 3) {
                        this.jobShow = true;
                    }
                    this.job = article.industry;
                    this.content = article.content;
                    this.xd.url = article.url;
                    this.xd.imgurl = article.img;
                    this.oldUrl = article.img;
                    this.createAt = article.createAt;
                    this.id = article.id;
                })
            }
        },
        watch: {
            xd: {
                handler(xd) {
                    if (xd.type === 3) {
                        this.jobShow = true;
                    } else {
                        this.jobShow = false;
                    }
                    if (xd.title !== "" && xd.type !== "" && xd.url !== "" && xd.imgurl !== "") {
                        this.btn = false;
                    } else {
                        this.btn = true;
                    }
                },
                deep: true
            }
        },
        methods: {
            clear() {
                this.imgName = "",
                    this.imgSize = "",
                    // this.imgStatus = "",
                    this.imgStatus = "未选择图片"
                this.proBar = 0
            },
            upfileclear() {
                this.clear()
            },
            //选择文件上传
            upfileFile($event) {
                //target属性在新窗口打开超链接还是event.target.value( ) 获取当前文本框的值（由事件触发时）
                console.log($event)
                console.log($event.target.files[0])
                let file = $event.target.files[0];
                this.imgData = true; //显示
                this.imgName = file.name; //预览图片名字
                this.imgSize = (Math.round((file.size * 100) / 1024) / 100).toString() + "KB"; //图片大小
                this.imgStatus = "未上传"; //状态
                this.reader = new FileReader();
                let that = this;
                this.reader.readAsDataURL(file); //异步读取文件内容，结果用data:url的字符串形式表示
                this.reader.onload = function () {
                    console.log(this) //指向reader
                    that.xd.imgurl = this.result; //改变预览图片url
                    // console.log(that.xd.imgurl)
                    let fileData = new FormData(); // 转换为表格数据，接口传参
                    fileData.append("file", file);
                    that.fileDataa = fileData;
                    console.log(that.fileDataa.get("file")) //用get这种方法才能获取到这个数据
                }
            },
            //上传
            upload() {
                this.imgStatus = "上传中";
                let that = this;
                let config = {
                    //动态改变上传进度条
                    onUploadProgress(progressEvent) {
                        console.log("999999")
                        that.proBar =
                            ((progressEvent.loaded / progressEvent.total) * 100) | 0;
                        console.log(that.proBar)
                    }
                };
                console.log(this.fileDataa.get("file"))
                console.log(config)
                changeArticle.uploadImg(this.fileDataa, config)
                    .then(res => {
                        this.imgStatus = "上传成功";
                        let url = res.data.data.url;
                        this.newUrl = url;
                        console.log(this.newUrl)
                    })
                    .catch(error => {
                        this.imgStatus = "上传失败";
                    })
            },
            //删除
            deletee() {
                this.clear();
                this.imgData = false;
                this.xd.imgurl = "";
                this.$refs.clearFile.value = null;
            },
            //上线 草稿确认按钮
            goOnline(status) {
                if (this.newUrl == "" && this.oldUrl == "") {
                    this.uurl = "";
                    alert("请上传图片");
                    return;
                } else if (this.oldUrl == "") {
                    this.uurl = this.newUrl;
                } else if (this.newUrl == "") {
                    this.uurl = this.oldUrl;
                }
                console.log(this.uurl)
                let params = { //数据上传到后台的所有数据
                    title: this.xd.title,
                    type: this.xd.type,
                    status: status,
                    img: this.uurl,
                    content: this.content, //非必填
                    url: this.xd.url,
                    industry: this.job
                }
                console.log(params)

                changeArticle.addArticle(params)
                    .then(res => {
                        console.log(res)
                        this.$router.push({
                            path: "/home/article"
                        });

                        if (this.oldUrl != "") {
                            alert("编辑成功")
                        } else {
                            alert("新增成功")
                        }
                    })
                // console.log(this.btn)
            },
            //取消新增图片，返回上一级
            cancell() {
                this.$router.push({
                    path: "/home/article"
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .header-title {
        margin: 10px;
    }

    .uupfile {
        display: inline-block;
        margin-left: 25px;
        width: 80px;
        line-height: 20px;
        border-radius: 5px;
        text-align: center;
        color: white;
        background-color: #66FF66;
    }

    .aa {
        margin: 10px auto;
    }

    .con {
        display: flex;

        .duo {
            width: 40px;
            height: 16px;
            background-color: gray;

            .bar {
                height: 16px;
                background-color: green;
                color: red;
            }
        }
    }
</style>