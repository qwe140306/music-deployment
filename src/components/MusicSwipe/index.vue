<template>
	<van-swipe class="my-swipe" v-if="songPage.length !== 0" :show-indicators="false" :loop="false">
		<van-swipe-item v-for="songList in songPage" :key="songList.creativeId">
			<div class="song-info-wrap" v-for="songInfo in songList.resources" :key="songInfo.resourceId">
				<van-image class="song-img" :src="songInfo.uiElement.image.imageUrl">
					<van-icon class="iconfont icon-play" size="0.426rem"></van-icon>
				</van-image>
				<div class="song-info">
					<div class="song-resources">
						<h3 class="song-name ">
							<span class="musicName text-hidden">{{ songInfo.uiElement.mainTitle.title }}</span>
							<!-- <span class="author" v-if="songInfo.resourceExtInfo.artists[0]"> - {{ songInfo.resourceExtInfo.artists[0].name }}</span> -->
						</h3>
					</div>
					<div>
						<p class="subTitle text-hidden" v-if="songInfo.uiElement.subTitle">{{ songInfo.uiElement.subTitle.title }}</p>
					</div>
				</div>
				<!--                  <van-icon class="iconfont icon-play" size="14"></van-icon>-->
			</div>
		</van-swipe-item>
	</van-swipe>
</template>

<script>
export default {
	name: 'MusicSwipe',
	props: {
		songPage: {
			type: Array,
			require: true,
		},
	},

};
</script>

<style scoped lang="less">
// 轮播
.my-swipe {
	.van-swipe-item {
		color: #fff;
		width: 320px;
		height: 180px;

		.song-info-wrap {
			width: 100%;
			height: 50px;
			display: flex;
			margin-bottom: 10px;

			.song-img {
				border-radius: 10px;
				overflow: hidden;
				margin-right: 8px;
				width: 50px;
				height: 50px;
				position: relative;

				.icon-play {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					opacity: 0.7;
				}
			}

			.song-info {
				display: flex;
				flex-direction: column;
				flex: 1;
				justify-content: center;


				.song-resources {
					font-size: 14px;
					font-weight: 500 !important;
					color: #000;

					.song-name {
						margin: 0;
						padding: 0;
						font-weight: unset;


            .musicName{
              display: inline-block;
              max-width: 227px;
            }

						.alias {
							color: rgb(134, 134, 134);
						}

						.author {
							padding: 0;
							margin: 0;
							color: rgb(134, 134, 134);
							font-size: 12px;
						}
					}
				}
			}

			.subTitle {
				padding: 0;
				margin: 0;
				color: rgb(134, 134, 134);
				font-size: 12px;
			}
		}
	}
}
</style>
