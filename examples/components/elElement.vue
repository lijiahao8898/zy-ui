<template>
    <div class="category-instance__example">
        <div class="example-component">
            <div class="example-component__title">文件上传</div>
            <div class="example-component__item">
                <zy-elm-upload ref="uploader"
                          url="ProblemCoordination/uploadHandFile"
                          download-url="ProblemCoordination/downloadHandFile"
                          :additionalParameters="additionalParameters"
                          @change="uploaderHandler"
                          file-name="file"
                          :flag="true"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            additionalParameters: {}
        }
    },
    methods: {
        uploaderHandler () {

        }
    }
}
</script>