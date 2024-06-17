<template>
    <div class="uploader">
        <el-upload
            class="upload-demo"
            action="#"
            ref="upload"
            name="uploadFile"
            :drag="true"
            :file-list="fileList"
            :http-request="uploadFile"
            :on-progress="onUploaderProgress"
            :before-upload="beforeUpload" :show-file-list="false">
            <template>
                <div v-if="fileList.length > 0 && has">
                    <template v-if="filterKey">
                        <div class="uploader-filename__wrapper" v-for="(item, index) in fileList" :key="index">
                            <template v-if="item[filterKey] === additionalParameters[filterKey]">
                                <div class="uploader-filename" @click.stop="downloadFile(item.fileId || item.file_id)">
                                    {{ item.name || item.fileName || item.file_name }}
                                    <el-tooltip class="item" effect="dark" content="下载或者查看文件" placement="top">
                                        <i class="el-icon-search"></i>
                                    </el-tooltip>
                                </div>
                                <div class="uploader-filename__size">{{ renderSize(item.size) }}</div>
                                <div class="uploader-filename__remove" v-if="flag"
                                     @click.stop="removeFile(item, index)">
                                    <el-tooltip class="item" effect="dark" content="删除文件" placement="top">
                                        <i class="el-icon-delete"></i>
                                    </el-tooltip>
                                </div>
                                <div class="uploader-filename__line"></div>
                            </template>
                        </div>
                    </template>
                    <template v-else>
                        <div class="uploader-filename__wrapper" v-for="(item, index) in fileList" :key="index">
                            <div class="uploader-filename" @click.stop="downloadFile(item.fileId || item.file_id)">
                                {{ item.name || item.fileName || item.file_name }}
                                <el-tooltip class="item" effect="dark" content="下载或者查看文件" placement="top">
                                    <i class="el-icon-search"></i>
                                </el-tooltip>
                            </div>
                            <div class="uploader-filename__size">{{ renderSize(item.size) }}</div>
                            <div class="uploader-filename__remove" v-if="flag" @click.stop="removeFile(item, index)">
                                <el-tooltip class="item" effect="dark" content="删除文件" placement="top">
                                    <i class="el-icon-delete"></i>
                                </el-tooltip>
                            </div>
                            <div class="uploader-filename__line"></div>
                        </div>
                    </template>
                    <div class="el-upload__text el-upload__reload" v-if="flag"><em>{{
                            isUploading ? '上传中...' : '点击上传'
                        }}</em>文件、或将文件拖到此处
                    </div>
                </div>
                <div v-else>
                    <img class="upload-image" src="./images/icon-upload.png" alt="">
                    <div class="el-upload__text"><em>{{ isUploading ? '上传中...' : '点击上传' }}</em>文件、或将文件拖到此处</div>
                </div>
                <div class="uploader-progress">
                    <el-progress v-show="percentage > 0" :text-inside="true" :stroke-width="14"
                                 :percentage="percentage" text-color="#fff"/>
                </div>
            </template>
        </el-upload>

        <el-dialog class="theme-dialog fixed" append-to-body :title="imagePreviewName" :visible.sync="showPreview"
                   :close-on-click-modal="true"
                   width="800px" :before-close="handlePreviewClose">
            <div class="preview">
                <img class="preview-image" :name="imagePreviewName" :src="imagePreviewUrl" alt="">
            </div>
        </el-dialog>
    </div>
</template>

<script>
// import {util} from "@/common/util";
// import {server} from "@/common/http";
const server = {}
const util = {}

export default {
    name: 'zy-elm-upload',
    props: {
        url: {
            default: '/entryUser/uploadEntryUserFile'
        },
        downloadUrl: {
            default: '/approvalModule/downloadFile'
            // /approvalModule/downloadRecordFile
        },
        downloadParams: {
            default: () => {
            }
        },
        additionalParameters: {
            default: () => {
            }
        },
        // 过滤的数据的id
        filterKey: {
            default: ''
        },
        flag: {
            default: false
        },
        fileName: {
            default: 'files'
        },
        recordId: {
            default: ''
        }
    },
    data() {
        return {
            fileList: [],
            deleteFist: [],
            isUploading: false,
            percentage: 0,
            has: true,
            imagePreviewUrl: null,
            imagePreviewName: '',
            showPreview: false,
        }
    },
    methods: {
        handlePreviewClose() {
            this.showPreview = false
        },
        async downloadFile(fileId) {
            // window.location.href = `${this.downloadUrl}?fileId=${fileId}`
            let params = {
                fileId
            }
            if (this.hasParams('downloadParams')) {
                Object.keys(this.downloadParams).forEach(key => {
                    params[key] = this.downloadParams[key];
                })
            }
            const response = await server({
                url: this.downloadUrl,
                data: {
                    fileId
                },
                type: 'download'
            })
            if (response.type === 'image') {
                this.showPreview = true;
                this.imagePreviewUrl = response.url;
                this.imagePreviewName = decodeURIComponent(response.name);
            }
        },
        init(list) {
            this.imagePreviewUrl = null
            this.imagePreviewName = '';
            this.showPreview = false;

            this.fileList = [];
            list.forEach(item => {
                this.fileList.push(item);
            })
            if (this.fileList && this.fileList.length > 0) {
                if (this.filterKey) {
                    console.log(this.filterKey)
                    let filter = this.fileList.filter(item => item[this.filterKey] === this.additionalParameters[this.filterKey]);
                    console.log(filter)
                    this.has = filter && filter.length > 0;
                }
            }

        },
        beforeUpload(file) {
            // console.log(file)
            let extension = file.name.substring(file.name.lastIndexOf('.') + 1);
            console.log(extension)
            let size = file.size / 1024 / 1024;
            if (size > 200) {
                this.$message.error('上传文件大小不得超过200M');
                return false;
            }
        },
        onUploaderProgress(event, file) {
            // console.log(file.percentage)
            this.percentage = parseInt(file.percentage.toFixed(2))
        },
        hasParams(objName) {
            for (let key in this[objName]) {
                // eslint-disable-next-line no-prototype-builtins
                if (this[objName][key] && this[objName].hasOwnProperty(key)) {
                    return true
                }
            }
            return false
        },
        // 上传文件
        async uploadFile(param, type) {
            console.log(type)
            let formData = new FormData();
            if (this.isUploading || !this.flag) {
                return;
            }
            this.isUploading = true;
            formData.append(this.fileName, param.file);
            if (this.hasParams('additionalParameters')) {
                Object.keys(this.additionalParameters).forEach(key => {
                    formData.append(key, this.additionalParameters[key]);
                })
            }

            util.$ajax({
                url: this.url,
                type: 'post',
                data: formData,
                isForm: 3,
                mistake: 2,
                onUploadProgress: progressEvent => {
                    this.percentage = Number((progressEvent.loaded / progressEvent.total * 100).toFixed(2))
                }
            }, res => {
                this.isUploading = false;
                this.percentage = 0;
                let {code, data} = res;
                this.has = true;
                if (code === 0) {
                    if (data && data[0] && data[0].fileId) {
                        param.file.fileId = data[0].fileId;
                        param.file.fileName = data[0].fileName;
                        param.file.createTime = data[0].createTime;
                    }
                    if (this.filterKey) {
                        param.file[this.filterKey] = data[0].fileTypeId;
                        console.log(param.file)
                    }
                    this.fileList.push(param.file);
                    this.$message.success('上传成功！');
                    this.$emit('change', this.fileList, this.deleteFist, null);
                }
            });

        },
        renderSize(value) {
            if (null == value || value == '') {
                return "-- Bytes";
            }
            const unitArr = new Array("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
            let index = 0;
            let srcsize = parseFloat(value);
            index = Math.floor(Math.log(srcsize) / Math.log(1024));
            let size = srcsize / Math.pow(1024, index);
            size = size.toFixed(2);//保留的小数位数
            return size + unitArr[index];
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            console.log(fileList)
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        async removeFile(file, position) {
            if (this.recordId) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const response = await server({
                        url: `approvalModule/deleteApprovalFile`,
                        type: 'get',
                        data: {
                            record_id: this.recordId,
                            file_id: file.fileId || file.file_id
                        },
                        mistake: '2'
                    })
                    if (response.code == 0) {

                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.fileList.splice(position, 1);
                    }
                }).catch(() => {
                });
                return
            }
            this.deleteFist.push(file);
            this.fileList.splice(position, 1);
            this.$emit('change', this.fileList, this.deleteFist, file);
        },
    }
}
</script>

<style lang="scss" scoped>
.preview {
    height: 50vh;
    overflow-y: auto;
    margin-top: 20px;

    .preview-image {
        width: 100%;
    }
}

.uploader {
    /deep/ .el-upload {
        width: 100%;
    }

    /deep/ .el-upload-dragger {
        width: 100%;
        height: unset;
        padding: 14px;
        background: #F6F7FB;
        border-radius: 2px;
        position: relative;

        &:hover {
            border: 1px dashed #989aa2;
        }

        .uploader-progress {
            position: absolute;
            bottom: 0;
            left: 0px;
            right: 0px;

            .el-progress-bar__outer {
                border-radius: 0;
            }

            .el-progress-bar__inner {
                border-radius: 0;
            }
        }
    }

    /deep/ .el-progress-bar__innerText {
        margin-top: -2px;
    }

    //}

    .upload-image {
        margin: 10px 0 5px;
    }

    .uploader-filename {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 18px;
        text-align: left;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        justify-items: center;

        &:hover {
            cursor: pointer;
            color: #409EFF;
        }

        &__size {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #BBBBBB;
            line-height: 12px;
            text-align: left;
            padding-bottom: 15px;
        }

        &__remove {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FF4F4F;
            line-height: 12px;
            text-align: left;
            position: absolute;
            right: 0;
            top: 0;
        }

        &__wrapper {
            padding-left: 40px;
            background: url("./images/icon-file.png") no-repeat 5px 5px;
            background-size: 26px 29px;
            margin-bottom: 15px;
            position: relative;

        }

        &__line {
            border-bottom: 1px dashed #d9d9d9;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
        }
    }

    .el-upload__reload {
        text-align: left;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 14px;
        padding-top: 10px;
        margin-bottom: 10px;
        padding-left: 5px;
        color: #606266;

        em {
            color: #007AFF;
        }
    }

    .uploader-tip {
        font-size: 14px;
        //margin: 20px auto 20px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FF5858;
        line-height: 22px;

        &__text {
            position: relative;
            padding-left: 30px;
            display: inline-block;
        }

        svg {
            position: absolute;
            top: -3px;
            left: 0;
        }
    }

    .el-icon-search {
        font-size: 18px;
        margin-left: 5px;
    }

    .el-icon-delete {
        font-size: 18px;
    }

    .uploader-bg {
        background: #FCFCFC;
        border-radius: 2px;
        border: 1px solid #D0D0D0;
    }

    .uploader-template {
        font-size: 14px;
        color: #258DFF;
        //margin: 0 auto 0;
        cursor: pointer;
        line-height: 22px;

        &__text {
            position: relative;
            //padding-left: 30px;
            display: inline-block;
            color: #258DFF;
            text-decoration: none;
            padding: 0 35px 0;
        }
    }
}
</style>
