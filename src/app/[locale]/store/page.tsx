"use client"
import * as React from "react"
import { useTranslations, useLocale } from "next-intl"
import { ShoppingBag, Star, BookOpen, MonitorPlay, Shirt } from "lucide-react"
import { AnimatedSection, AnimatedStaggerGroup, AnimatedStaggerItem } from "@/components/ui/AnimatedSection"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle } from "@/components/ui/Modal"
import { useCartStore } from "@/store/useCartStore"
import { cn } from "@/lib/utils"

// Mock Products
const MOCK_PRODUCTS = [
  {
    id: "b1",
    title: "Kingdom Principles",
    author: "Apostle John Doe",
    type: "books",
    price: { en: 15.99, ru: 1500 },
    image: "bg-gradient-to-br from-indigo-500 to-purple-700",
    description: "A foundational guide to understanding the Kingdom of God and how to apply its principles to your daily life, business, and family."
  },
  {
    id: "b2",
    title: "The Harvest Mandate Study Guide",
    author: "Great Harvest Ministries Team",
    type: "books",
    price: { en: 12.99, ru: 1200 },
    image: "bg-gradient-to-br from-orange-400 to-red-600",
    description: "A 6-week interactive study guide designed for Home Groups, diving deep into our church's vision and core mission."
  },
  {
    id: "m1",
    title: "Worship Vol. 1: Kinetic Sanctity",
    author: "Great Harvest Worship",
    type: "media",
    price: { en: 9.99, ru: 900 },
    image: "bg-gradient-to-br from-slate-800 to-black",
    description: "Our debut live worship album recorded in Moscow. Includes chord charts and lyrics for worship leaders."
  },
  {
    id: "a1",
    title: "Classic Logo Hoodie",
    author: "Great Harvest Apparel",
    type: "apparel",
    price: { en: 45.00, ru: 4500 },
    image: "bg-gradient-to-br from-zinc-200 to-zinc-400",
    description: "Premium heavyweight cotton hoodie featuring the Great Harvest Ministries classic logo. Available in standard sizes."
  },
  {
    id: "a2",
    title: "Spirit-Led T-Shirt",
    author: "Great Harvest Apparel",
    type: "apparel",
    price: { en: 25.00, ru: 2500 },
    image: "bg-gradient-to-br from-accent-purple to-indigo-900",
    description: "Minimalist typographic t-shirt featuring our core value 'Spirit-Led'. 100% organic cotton."
  },
  {
    id: "m2",
    title: "Sermon Series: The Book of Acts",
    author: "Apostle John Doe",
    type: "media",
    price: { en: 19.99, ru: 1900 },
    image: "bg-gradient-to-br from-teal-500 to-emerald-700",
    description: "Digital download of the complete 12-part teaching series on the Book of Acts, including study notes."
  }
]

export default function StorePage() {
  const t = useTranslations('StorePage')
  const locale = useLocale()
  const { addItem } = useCartStore()
  
  const [activeTab, setActiveTab] = React.useState<"all" | "books" | "media" | "apparel">("all")
  const [selectedProduct, setSelectedProduct] = React.useState<typeof MOCK_PRODUCTS[0] | null>(null)

  const filteredProducts = MOCK_PRODUCTS.filter(p => activeTab === "all" || p.type === activeTab)
  
  const currencySymbol = locale === 'ru' ? '₽' : '$'
  const getPrice = (product: typeof MOCK_PRODUCTS[0]) => locale === 'ru' ? product.price.ru : product.price.en

  const handleAddToCart = (product: typeof MOCK_PRODUCTS[0]) => {
    addItem({
      id: product.id,
      title: product.title,
      price: getPrice(product),
      image: product.image
    })
  }

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'books': return <BookOpen className="h-4 w-4 mr-1" />
      case 'media': return <MonitorPlay className="h-4 w-4 mr-1" />
      case 'apparel': return <Shirt className="h-4 w-4 mr-1" />
      default: return null
    }
  }

  return (
    <div className="flex w-full flex-col pb-24 bg-surface-subtle min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-32 pb-16 bg-surface-base">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
          <AnimatedSection>
            <SectionHeader
              eyebrow={t('heroEyebrow')}
              heading={t('heroTitle')}
              subtext={t('heroSubtitle')}
              align="center"
              className="mb-8"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto w-full max-w-6xl px-6 md:px-8 py-8">
        
        {/* Filters */}
        <AnimatedSection className="mb-10 flex flex-wrap justify-center gap-2">
          {(["all", "books", "media", "apparel"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple",
                activeTab === tab 
                  ? "bg-accent-purple text-white shadow-md scale-105" 
                  : "bg-surface-elevated text-text-secondary hover:bg-surface-subtle hover:text-text-primary border border-border"
              )}
            >
              {t(`tabs.${tab}`)}
            </button>
          ))}
        </AnimatedSection>

        {/* Product Grid */}
        <AnimatedStaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <AnimatedStaggerItem key={product.id}>
              <Modal>
                <ModalTrigger asChild>
                  <Card hoverLift className="flex flex-col h-full overflow-hidden cursor-pointer group border-transparent hover:border-accent-purple/50 transition-colors">
                    {/* Image Placeholder */}
                    <div className={cn("w-full aspect-[4/5] relative overflow-hidden", product.image)}>
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm text-text-primary font-bold px-6 py-3 rounded-full shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          Quick View
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-1 bg-surface-elevated">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="neutral" className="capitalize flex items-center bg-surface-subtle">
                          {getTypeIcon(product.type)}
                          {t(`tabs.${product.type}`)}
                        </Badge>
                        <span className="font-display font-bold text-lg text-text-primary">
                          {currencySymbol}{getPrice(product)}
                        </span>
                      </div>
                      
                      <h3 className="font-display text-xl font-bold text-text-primary mb-1 line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-sm text-text-secondary mb-6">{product.author}</p>
                      
                      <div className="mt-auto pt-4 border-t border-border">
                        <Button 
                          variant="secondary" 
                          className="w-full justify-center group-hover:bg-accent-purple group-hover:text-white group-hover:border-accent-purple transition-all"
                          onClick={(e) => {
                            e.stopPropagation() // Prevent modal from opening when clicking Add to Cart directly
                            handleAddToCart(product)
                          }}
                        >
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          {t('card.addToCart')}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </ModalTrigger>
                
                {/* Product Detail Modal */}
                <ModalContent className="max-w-4xl p-0 overflow-hidden bg-surface-elevated">
                  <div className="flex flex-col md:flex-row h-full max-h-[85vh]">
                    {/* Left: Image */}
                    <div className={cn("w-full md:w-1/2 aspect-square md:aspect-auto shrink-0", product.image)} />
                    
                    {/* Right: Details */}
                    <div className="flex-1 p-8 md:p-12 flex flex-col overflow-y-auto">
                      <ModalHeader className="mb-6 p-0 text-left">
                        <Badge variant="purple" className="w-fit mb-4 capitalize">
                           {t(`tabs.${product.type}`)}
                        </Badge>
                        <ModalTitle className="text-3xl md:text-4xl mb-2">{product.title}</ModalTitle>
                        <p className="text-lg text-text-secondary font-medium">{product.author}</p>
                      </ModalHeader>
                      
                      <div className="text-3xl font-display font-bold text-text-primary mb-8 pb-8 border-b border-border">
                        {currencySymbol}{getPrice(product)}
                      </div>
                      
                      <div className="prose prose-sm md:prose-base prose-neutral mb-8">
                        <p className="text-text-secondary leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                      
                      <div className="mt-auto pt-8">
                        <Button 
                          variant="primary" 
                          size="lg"
                          className="w-full bg-accent-orange hover:bg-[#e55317] text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                          onClick={() => {
                            handleAddToCart(product)
                            // A hacky way to close the Dialog since we don't have explicit control exposed easily
                            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}))
                          }}
                        >
                          <ShoppingBag className="mr-2 h-5 w-5" />
                          {t('card.addToCart')} - {currencySymbol}{getPrice(product)}
                        </Button>
                      </div>
                    </div>
                  </div>
                </ModalContent>
              </Modal>
            </AnimatedStaggerItem>
          ))}

          {filteredProducts.length === 0 && (
            <div className="col-span-full py-12 text-center text-text-tertiary">
              <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No products available in this category.</p>
            </div>
          )}
        </AnimatedStaggerGroup>
      </section>
    </div>
  )
}
