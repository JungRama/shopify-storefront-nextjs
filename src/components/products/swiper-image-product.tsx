import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { images } from '@/types/products'

interface ImageProduct {
	edges: {
		node: images
	}[]
}

export default function SwiperImageProduct({
	images,
}: {
	images: ImageProduct
}) {
	return (
		<Swiper
			spaceBetween={5}
			slidesPerView={1.5}
			onSlideChange={() => console.log('slide change')}
			onSwiper={(swiper) => console.log(swiper)}
		>
			{images.edges.map((item) => {
				return (
					<SwiperSlide key={item.node.url}>
						<div className="relative aspect-[4/3] w-full">
							<img
								className="absolute inset-0 h-full w-full object-cover"
								src={item.node.url}
								alt=""
							/>
						</div>
					</SwiperSlide>
				)
			})}
		</Swiper>
	)
}
