<template>
    <div class="star-score">
        <div>推荐度</div>
        <div class="star-score__star" v-if="type === 1">
            <div class="star-item">
                <img v-for="score in 5" :key="score" src="./images/star-1.png" alt="">
            </div>
            <div class="star-item fill">
                <img v-for="item in scoreSplit" :key="item" src="./images/star-3.png" alt="">
                <img v-if="this.scoreLength > 1" src="./images/star-2.png" alt="">
            </div>
        </div>

        <div class="star-score__star" v-if="type === 2">
            <div class="star-item">
                <img v-for="score in 5" :key="score" src="./images/star-1-white.png" alt="">
            </div>
            <div class="star-item fill">
                <img v-for="item in scoreSplit" :key="item" src="./images/star-3-white.png" alt="">
                <img v-if="this.scoreLength > 1" src="./images/star-2-white.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'zy-star-score',
    props: {
        score: {
            default: 0
        },
        type: {
            default: 1
        }
    },
    data() {
        return {
            scoreSplit: null,
            scoreLength: 0,

        }
    },
    mounted() {
        let scoreSplit = this.score.split('.');
        this.scoreSplit = Number(scoreSplit[0]);
        this.scoreLength = scoreSplit.length
    }
}
</script>

<style lang="scss" scoped>
.star {
    &-score {
        display: flex;
        justify-items: center;
        align-items: center;

        &__star {
            position: relative;

            img {
                width: 24px;
            }

            .star-item {
                display: flex;

                > img {
                    margin-left: 6px;
                }

                &.fill {
                    position: absolute;
                    left: 0;
                    top: 0;
                }
            }
        }
    }
}
</style>
