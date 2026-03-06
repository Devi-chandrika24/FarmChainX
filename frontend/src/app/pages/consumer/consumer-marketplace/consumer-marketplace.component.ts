import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { CartSidebarComponent } from '../cart-sidebar/cart-sidebar.component';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-consumer-marketplace',
    standalone: true,
    imports: [CommonModule, CartSidebarComponent, TranslateModule, LucideAngularModule],
    template: `
    <div class="space-y-10 relative">
      <app-cart-sidebar *ngIf="isCartOpen()" (close)="isCartOpen.set(false)"></app-cart-sidebar>

      <!-- Header Section -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
        <div>
           <h2 class="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase tracking-wide">
             {{ 'MARKETPLACE.TITLE' | translate }}
           </h2>
           <p class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mt-1">
             {{ 'MARKETPLACE.SUBTITLE' | translate }}
           </p>
        </div>
        
        <!-- Cart Button -->
        <button (click)="isCartOpen.set(true)" 
          class="relative p-4 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:shadow-lg transition-all group border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900/50">
            <lucide-icon name="shopping-cart" class="w-6 h-6 group-hover:scale-110 transition-transform"></lucide-icon>
            <span *ngIf="cartService.cartCount() > 0" 
              class="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-[10px] font-black leading-none text-white transform bg-indigo-600 rounded-full border-2 border-white dark:border-slate-900">
              {{ cartService.cartCount() }}
            </span>
        </button>
      </div>

      <!-- Product Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div *ngFor="let product of products()" 
          class="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-indigo-950/10 transition-all duration-500 group flex flex-col hover:-translate-y-1">
            
            <!-- Product Image -->
            <div class="h-56 overflow-hidden bg-slate-50 dark:bg-slate-800 relative">
                <img [src]="product.imagePath || 'assets/placeholder.jpg'" [alt]="product.cropName" 
                  class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100">
                
                <!-- Quality Grade Badge -->
                <div class="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black shadow-xl uppercase tracking-widest border border-slate-100 dark:border-slate-800"
                     [ngClass]="getQualityClass(product.qualityGrade)">
                    <span class="flex items-center gap-1.5">
                        <lucide-icon name="star" class="w-3 h-3 fill-current"></lucide-icon>
                        Grade {{ product.qualityGrade || 'N/A' }}
                    </span>
                </div>

                <!-- Status Badges -->
                <div *ngIf="product.quantity <= 0 || product.isSold" 
                  class="absolute top-4 left-4 px-4 py-1.5 rounded-full text-[9px] font-black shadow-lg bg-rose-500 text-white uppercase tracking-widest">
                    {{ 'MARKETPLACE.LBL_SOLD_OUT' | translate }}
                </div>
                <div *ngIf="product.quantity > 0 && !product.isSold" 
                  class="absolute top-4 left-4 px-4 py-1.5 rounded-full text-[9px] font-black shadow-lg bg-emerald-500 text-white uppercase tracking-widest">
                    {{ 'MARKETPLACE.LBL_AVAILABLE' | translate }}
                </div>
            </div>
            
            <!-- Product Details -->
            <div class="p-7 flex-1 flex flex-col">
                <div class="mb-4">
                    <h3 class="font-black text-slate-900 dark:text-white text-xl leading-tight tracking-tight">{{ product.cropName }}</h3>
                    <p class="text-[10px] font-black text-indigo-600 dark:text-indigo-400 mt-2 flex items-center gap-2 uppercase tracking-widest">
                        <lucide-icon name="user-check" class="w-3.5 h-3.5"></lucide-icon>
                        {{ product.farmerName || 'Verified Farmer' }}
                    </p>
                </div>
                
                <div class="space-y-3 mb-8 flex-1">
                    <div class="flex items-center gap-3 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        <lucide-icon name="calendar" class="w-4 h-4 text-slate-300 dark:text-slate-600"></lucide-icon>
                        <span>{{ 'MARKETPLACE.LBL_HARVESTED' | translate }} {{ product.harvestDate | date }}</span>
                    </div>
                    <div class="flex items-center gap-3 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        <lucide-icon name="map-pin" class="w-4 h-4 text-slate-300 dark:text-slate-600"></lucide-icon>
                        <span class="line-clamp-1">{{ product.displayLocation || product.gpsLocation || 'Regional Hub' }}</span>
                    </div>
                    <div class="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest" 
                      [ngClass]="(product.quantity || 0) > 0 ? 'text-emerald-500' : 'text-rose-500'">
                        <lucide-icon name="package" class="w-4 h-4"></lucide-icon>
                        <span>{{ product.quantity || 0 }} {{ product.quantityUnit || 'kg' }} {{ (product.quantity || 0) > 0 ? 'instock' : 'empty' }}</span>
                    </div>
                </div>
                
                <!-- Price & Action -->
                <div class="mt-auto flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-800">
                    <div class="flex flex-col">
                        <span class="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">₹{{ product.price || 120 }}</span>
                        <span class="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-0.5">per unit</span>
                    </div>
                    <button (click)="addToCart(product)" [disabled]="(product.quantity || 0) <= 0 || product.isSold" 
                        class="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-3.5 rounded-2xl hover:bg-indigo-600 dark:hover:bg-indigo-500 dark:hover:text-white transition-all shadow-lg active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed">
                        <lucide-icon name="shopping-bag" class="w-6 h-6"></lucide-icon>
                    </button>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="products().length === 0" class="col-span-full py-32 text-center bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center">
            <lucide-icon name="shrub" class="w-20 h-20 text-slate-100 dark:text-slate-800 mb-8"></lucide-icon>
            <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-widest">{{ 'MARKETPLACE.LBL_NO_CROPS' | translate }}</h3>
            <p class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Check back later for fresh harvest from our verified farmers.</p>
        </div>
      </div>
    </div>
  `
})
export class ConsumerMarketplaceComponent implements OnInit {
    products = signal<any[]>([]);
    isCartOpen = signal(false);

    constructor(
        private productService: ProductService,
        public cartService: CartService
    ) { }

    ngOnInit() {
        // Load farmer products for marketplace (direct purchase from farmers)
        this.productService.getMarketProducts().subscribe({
            next: (data) => {
                // Filter out products that are marked as Sold (farmer products use isSold boolean)
                const available = (data || []).filter(p => !p.isSold);
                this.products.set(available);
            },
            error: (err) => console.error('Market load error', err)
        });
    }

    addToCart(product: any) {
        this.cartService.addToCart(product);
        this.isCartOpen.set(true);
    }

    getQualityClass(grade: string): string {
        if (!grade) return 'text-slate-600';
        if (grade.includes('A')) return 'text-emerald-600';
        if (grade.includes('B')) return 'text-yellow-600';
        return 'text-orange-600';
    }
}
