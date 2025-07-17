// app/(home)/page.tsx (or app/page.tsx if you don't use the (home) route group)

import { HomeCard } from '@/components/shared/home/home-card'
import { HomeCarousel } from '@/components/shared/home/home-carousel'
import ProductSlider from '@/components/shared/product/product-slider' // Added from commit/lessons
import { Card, CardContent } from '@/components/ui/card' // Added from commit/lessons
import {
  getAllCategories,
  getProductsByTag, // Added from commit/lessons
  getProductsForCard,
} from '@/lib/actions/product.actions'
import data from '@/lib/data' // Used for carousels
import { toSlug } from '@/lib/utils' // Used for category images

export default async function Page() {
  // Data fetching for HomeCard categories and product sections (from your 'previous codes')
  const categories = (await getAllCategories()).slice(0, 4)
  const newArrivals = await getProductsForCard({
    tag: 'new-arrival',
    limit: 4,
  })
  const featureds = await getProductsForCard({
    tag: 'featured',
    limit: 4,
  })
  const bestSellers = await getProductsForCard({
    tag: 'best-seller',
    limit: 4,
  })

  // Data fetching for "Today's Deals" ProductSlider (from 'commit'/'lessons')
  const todaysDeals = await getProductsByTag({ tag: 'todays-deal' })
  const bestSellingProducts = await getProductsByTag({ tag: 'best-seller' })

  // Dynamically populated cards array for HomeCard (from your 'previous codes')
  const cards = [
    {
      title: 'Categories to explore',
      link: {
        text: 'See More',
        href: '/search',
      },
      items: categories.map((category) => ({
        name: category,
        image: `/images/${toSlug(category)}.jpg`,
        href: `/search?category=${category}`,
      })),
    },
    {
      title: 'Explore New Arrivals',
      items: newArrivals,
      link: {
        text: 'View All',
        href: '/search?tag=new-arrival', // Consider using a generic '/search?tag=new-arrival'
      },
    },
    {
      title: 'Discover Best Sellers',
      items: bestSellers,
      link: {
        text: 'View All',
        href: '/search?tag=best-seller', // Changed from new-arrival based on context
      },
    },
    {
      title: 'Featured Products',
      items: featureds,
      link: {
        text: 'Shop Now',
        href: '/search?tag=featured', // Changed from new-arrival based on context
      },
    },
  ]

  return (
    <>
      {/* Home Carousel for banners/promotions */}
      <HomeCarousel items={data.carousels} />

      {/* Main content area with padding and spacing for medium screens and above */}
      <div className='md:p-4 md:space-y-4 bg-border'>
        {/* HomeCard component to display category/deal cards */}
        <HomeCard cards={cards} />

        {/* Card component to wrap the Product Slider for "Today's Deals" */}
        <Card className='w-full rounded-none'>
          <CardContent className='p-4 items-center gap-3'>
            <ProductSlider title={"Today's Deals"} products={todaysDeals} />
          </CardContent>
        </Card>

        <Card className='w-full rounded-none'>
          <CardContent className='p-4 items-center gap-3'>
            <ProductSlider
              title='Best Selling Products'
              products={bestSellingProducts}
              hideDetails
            />
          </CardContent>
        </Card>

        {/* You can add more ProductSlider components here for New Arrivals, Best Sellers etc.
            if your tutor introduces them later, using the 'newArrivals', 'bestSellers', 'featureds' data.
        */}
      </div>
    </>
  )
}
