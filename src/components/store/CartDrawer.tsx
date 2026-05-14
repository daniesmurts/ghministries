"use client"
import * as React from "react"
import { useTranslations, useLocale } from "next-intl"
import { ShoppingCart, X, Plus, Minus, Trash2, CheckCircle2 } from "lucide-react"
import { useCartStore } from "@/store/useCartStore"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

export function CartDrawer() {
  const t = useTranslations('StorePage.cart')
  const locale = useLocale()
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, clearCart, totalPrice } = useCartStore()
  const [isCheckingOut, setIsCheckingOut] = React.useState(false)
  const [checkoutSuccess, setCheckoutSuccess] = React.useState(false)

  const currencySymbol = locale === 'ru' ? '₽' : '$'

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    // Simulate checkout process
    await new Promise(resolve => setTimeout(resolve, 2000))
    clearCart()
    setIsCheckingOut(false)
    setCheckoutSuccess(true)
    
    // Auto close after success
    setTimeout(() => {
      setIsOpen(false)
      setTimeout(() => setCheckoutSuccess(false), 300)
    }, 3000)
  }

  // Prevent body scroll when drawer is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen && !checkoutSuccess) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div 
        className={cn(
          "fixed top-0 right-0 h-[100dvh] w-full max-w-md bg-surface-base shadow-elevated z-[101] flex flex-col transition-transform duration-300 ease-in-out border-l border-border",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-border bg-surface-subtle">
          <div className="flex items-center">
            <ShoppingCart className="h-5 w-5 mr-3 text-text-primary" />
            <h2 className="font-display text-xl font-bold text-text-primary">{t('title')}</h2>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 -mr-2 rounded-full hover:bg-surface-elevated text-text-secondary hover:text-text-primary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {checkoutSuccess ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="h-16 w-16 bg-success/10 text-success rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <p className="font-bold text-xl text-text-primary">Success!</p>
              <p className="text-text-secondary">{t('success')}</p>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-text-tertiary">
              <ShoppingCart className="h-16 w-16 opacity-20" />
              <p>{t('empty')}</p>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>Continue Shopping</Button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-xl border border-border bg-surface-elevated">
                  <div className={`w-20 h-20 rounded-md shrink-0 bg-surface-subtle ${item.image}`} />
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm text-text-primary line-clamp-2">{item.title}</h4>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-text-tertiary hover:text-error transition-colors p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-border rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-text-secondary hover:text-text-primary disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-text-secondary hover:text-text-primary"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-bold text-text-primary">{currencySymbol}{item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && !checkoutSuccess && (
          <div className="p-6 border-t border-border bg-surface-subtle space-y-6">
            <div className="flex items-center justify-between text-lg font-bold text-text-primary">
              <span>{t('total')}</span>
              <span>{currencySymbol}{totalPrice()}</span>
            </div>
            <Button 
              variant="primary" 
              className="w-full bg-accent-orange hover:bg-[#e55317]"
              size="lg"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? t('redirecting') : t('checkout')}
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
