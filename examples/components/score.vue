<template>
    <div class="category-instance__example">
        <div class="example-component">
            <div class="example-component__item">
                <div class="item">
                    <zy-star-score :score="'1'"></zy-star-score>
                </div>
                <div class="item">
                    <zy-star-score :score="'2'"></zy-star-score>
                </div>
                <div class="item">
                    <zy-star-score :score="'3'"></zy-star-score>
                </div>
                <div class="item">
                    <zy-star-score :score="'4'"></zy-star-score>
                </div>
                <div class="item">
                    <zy-star-score :score="'5'"></zy-star-score>
                </div>
            </div>

            <div class="example-component__item">
                <div class="item">
                    <zy-star-score :score="'1'" :type="2"></zy-star-score>
                </div>
                <div class="item">
                    <zy-star-score :score="'2'" :type="2"></zy-star-score>
                </div>
                <div class="item">
                    <zy-star-score :score="'3'" :type="2"></zy-star-score>
                </div>
                <div class="item">
                    <zy-star-score :score="'4'" :type="2"></zy-star-score>
                </div>
                <div class="item">
                    <zy-star-score :score="'5'" :type="2"></zy-star-score>
                </div>
            </div>
        </div>
    </div>
</template>